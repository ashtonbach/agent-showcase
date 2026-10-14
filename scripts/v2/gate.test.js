#!/usr/bin/env node
// Test that gate.js correctly fails for violations and that failures block merge
const { execFileSync, execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const assert = require("assert");

const testDir = path.join(__dirname, "..", "..", "test-workspace");
const gateScript = path.join(__dirname, "gate.js");

// Helper to run git commands in test workspace
function git(...args) {
  return execFileSync("git", args, { cwd: testDir, encoding: "utf8" });
}

// Helper to run gate.js and return exit code
function runGate(slug, base = "base", head = "HEAD") {
  try {
    execFileSync("node", [gateScript, slug, base, head], { 
      cwd: testDir,
      stdio: "pipe",
      encoding: "utf8"
    });
    return 0;
  } catch (e) {
    return e.status || 1;
  }
}

// Setup test workspace
function setupTestWorkspace() {
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true, force: true });
  }
  
  fs.mkdirSync(testDir, { recursive: true });
  
  // Initialize git repo
  git("init");
  git("config", "user.name", "Test");
  git("config", "user.email", "test@example.com");
  
  // Create minimal structure
  fs.mkdirSync(path.join(testDir, "app", "lab"), { recursive: true });
  fs.mkdirSync(path.join(testDir, "public", "lab"), { recursive: true });
  
  // Create menu.json with test feature
  const menu = { features: [{ slug: "test-feature" }] };
  fs.writeFileSync(
    path.join(testDir, "app", "lab", "menu.json"),
    JSON.stringify(menu, null, 2)
  );
  
  // Create page.tsx
  fs.writeFileSync(
    path.join(testDir, "app", "page.tsx"),
    'export default function Page() { return <div>{/* lab:slot */}</div>; }'
  );
  
  // Create current.json
  fs.writeFileSync(
    path.join(testDir, "app", "lab", "current.json"),
    '{"slug":"test-feature"}'
  );
  
  // Commit base
  git("add", ".");
  git("commit", "-m", "base");
  git("branch", "base");
}

// Test cases
const tests = {
  "PASS: valid feature addition"() {
    setupTestWorkspace();
    
    // Create valid feature
    const featureDir = path.join(testDir, "app", "lab", "test-feature");
    fs.mkdirSync(featureDir, { recursive: true });
    fs.writeFileSync(path.join(featureDir, "index.tsx"), 'export default function() { return <div>Test</div>; }');
    
    // Update page.tsx to import feature
    fs.writeFileSync(
      path.join(testDir, "app", "page.tsx"),
      'import Lab from "./lab/test-feature";\nexport default function Page() { return <div><Lab /> {/* lab:slot */}</div>; }'
    );
    
    git("add", ".");
    git("commit", "-m", "add test feature");
    
    const exitCode = runGate("test-feature", "base", "HEAD");
    assert.strictEqual(exitCode, 0, "Valid feature should pass gate");
  },

  "FAIL: file outside allowlist"() {
    setupTestWorkspace();
    
    const featureDir = path.join(testDir, "app", "lab", "test-feature");
    fs.mkdirSync(featureDir, { recursive: true });
    fs.writeFileSync(path.join(featureDir, "index.tsx"), 'export default function() { return <div>Test</div>; }');
    
    // Add file outside allowlist
    fs.writeFileSync(path.join(testDir, "app", "forbidden.tsx"), 'export default function() {}');
    
    fs.writeFileSync(
      path.join(testDir, "app", "page.tsx"),
      'import Lab from "./lab/test-feature";\nexport default function Page() { return <div><Lab /> {/* lab:slot */}</div>; }'
    );
    
    git("add", ".");
    git("commit", "-m", "add forbidden file");
    
    const exitCode = runGate("test-feature", "base", "HEAD");
    assert.strictEqual(exitCode, 1, "File outside allowlist should fail gate");
  },

  "FAIL: size cap exceeded"() {
    setupTestWorkspace();
    
    const featureDir = path.join(testDir, "app", "lab", "test-feature");
    fs.mkdirSync(featureDir, { recursive: true });
    
    // Generate large file exceeding 150 line limit
    const largeFile = Array(200).fill('export const x = 1;').join('\n');
    fs.writeFileSync(path.join(featureDir, "index.tsx"), largeFile);
    
    fs.writeFileSync(
      path.join(testDir, "app", "page.tsx"),
      'import Lab from "./lab/test-feature";\nexport default function Page() { return <div><Lab /> {/* lab:slot */}</div>; }'
    );
    
    git("add", ".");
    git("commit", "-m", "add large feature");
    
    const exitCode = runGate("test-feature", "base", "HEAD");
    assert.strictEqual(exitCode, 1, "Size cap exceeded should fail gate");
  },

  "FAIL: banned call (fetch)"() {
    setupTestWorkspace();
    
    const featureDir = path.join(testDir, "app", "lab", "test-feature");
    fs.mkdirSync(featureDir, { recursive: true });
    fs.writeFileSync(
      path.join(featureDir, "index.tsx"),
      'export default function() { fetch("https://api.example.com"); return <div>Test</div>; }'
    );
    
    fs.writeFileSync(
      path.join(testDir, "app", "page.tsx"),
      'import Lab from "./lab/test-feature";\nexport default function Page() { return <div><Lab /> {/* lab:slot */}</div>; }'
    );
    
    git("add", ".");
    git("commit", "-m", "add feature with banned call");
    
    const exitCode = runGate("test-feature", "base", "HEAD");
    assert.strictEqual(exitCode, 1, "Banned call should fail gate");
  },

  "FAIL: package.json change"() {
    setupTestWorkspace();
    
    const featureDir = path.join(testDir, "app", "lab", "test-feature");
    fs.mkdirSync(featureDir, { recursive: true });
    fs.writeFileSync(path.join(featureDir, "index.tsx"), 'export default function() { return <div>Test</div>; }');
    
    // Add package.json change
    fs.writeFileSync(
      path.join(testDir, "package.json"),
      '{"name":"test","dependencies":{"new-package":"1.0.0"}}'
    );
    
    fs.writeFileSync(
      path.join(testDir, "app", "page.tsx"),
      'import Lab from "./lab/test-feature";\nexport default function Page() { return <div><Lab /> {/* lab:slot */}</div>; }'
    );
    
    git("add", ".");
    git("commit", "-m", "add feature with package change");
    
    const exitCode = runGate("test-feature", "base", "HEAD");
    assert.strictEqual(exitCode, 1, "Package.json change should fail gate");
  },
};

// Run tests
console.log("Running gate.js tests...\n");
let passed = 0;
let failed = 0;

for (const [name, test] of Object.entries(tests)) {
  try {
    test();
    console.log(`✓ ${name}`);
    passed++;
  } catch (e) {
    console.log(`✗ ${name}`);
    console.log(`  ${e.message}`);
    failed++;
  }
}

// Cleanup
if (fs.existsSync(testDir)) {
  fs.rmSync(testDir, { recursive: true, force: true });
}

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
