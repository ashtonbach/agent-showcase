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

// Helper to run gate.js and return exit code and output
function runGate(slug, base = "base", head = "HEAD") {
  try {
    const output = execFileSync("node", [gateScript, slug, base, head], { 
      cwd: testDir,
      stdio: "pipe",
      encoding: "utf8"
    });
    return { exitCode: 0, output };
  } catch (e) {
    return { exitCode: e.status || 1, output: e.stdout || e.stderr || "" };
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
    
    const result = runGate("test-feature", "base", "HEAD");
    assert.strictEqual(result.exitCode, 1, "File outside allowlist should fail gate");
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
    
    const result = runGate("test-feature", "base", "HEAD");
    assert.strictEqual(result.exitCode, 1, "Size cap exceeded should fail gate");
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
    
    const result = runGate("test-feature", "base", "HEAD");
    assert.strictEqual(result.exitCode, 1, "Banned call should fail gate");
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
    
    const result = runGate("test-feature", "base", "HEAD");
    assert.strictEqual(result.exitCode, 1, "Package.json change should fail gate");
  },

  "PASS: custom typed-request slug in its own folder"() {
    setupTestWorkspace();
    fs.writeFileSync(path.join(testDir, "app", "page.tsx"), 'export default function Page() {\n  return (\n    <div>\n      {/* lab:slot */}\n    </div>\n  );\n}\n');
    git("commit", "-qam", "multi-line base"); git("branch", "-f", "base");
    const d = path.join(testDir, "app", "lab", "custom-1792280000");
    fs.mkdirSync(d, { recursive: true });
    fs.writeFileSync(path.join(d, "index.tsx"), 'export default function() { return <section><h2>Hi</h2></section>; }');
    fs.writeFileSync(path.join(testDir, "app", "page.tsx"), 'import Lab from "./lab/custom-1792280000";\nexport default function Page() {\n  return (\n    <div>\n      <Lab /> {/* lab:slot */}\n    </div>\n  );\n}\n');
    fs.writeFileSync(path.join(testDir, "app", "lab", "current.json"), '{"slug":"custom-1792280000"}');
    git("add", "."); git("commit", "-m", "custom");
    const result = runGate("custom-1792280000", "base", "HEAD");
    assert.strictEqual(result.exitCode, 0, "custom slug in its own folder should pass: " + result.output);
  },

  "FAIL: custom slug adding artwork"() {
    setupTestWorkspace();
    const d = path.join(testDir, "app", "lab", "custom-1792280000");
    fs.mkdirSync(d, { recursive: true });
    fs.writeFileSync(path.join(d, "index.tsx"), 'export default function() { return <section><h2>Hi</h2></section>; }');
    fs.mkdirSync(path.join(testDir, "public", "lab", "custom-1792280000"), { recursive: true });
    fs.writeFileSync(path.join(testDir, "public", "lab", "custom-1792280000", "a.svg"), '<svg></svg>');
    fs.writeFileSync(path.join(testDir, "app", "page.tsx"), 'import Lab from "./lab/custom-1792280000";\nexport default function Page() { return <div><Lab /> {/* lab:slot */}</div>; }');
    fs.writeFileSync(path.join(testDir, "app", "lab", "current.json"), '{"slug":"custom-1792280000"}');
    git("add", "."); git("commit", "-m", "custom art");
    assert.strictEqual(runGate("custom-1792280000", "base", "HEAD").exitCode, 1, "custom run may not add artwork");
  },

  "PASS: normal run removes a leftover Extra import and render"() {
    setupTestWorkspace();
    const pg = (extra) => 'import Lab from "./lab/test-feature";\n' + (extra ? 'import Extra from "./lab/custom-1792280000";\n' : '') + 'export default function Page() {\n  return (\n    <div>\n' + (extra ? '      <Extra />\n' : '') + '      <Lab /> {/* lab:slot */}\n    </div>\n  );\n}\n';
    fs.mkdirSync(path.join(testDir, "app", "lab", "test-feature"), { recursive: true });
    fs.writeFileSync(path.join(testDir, "app", "lab", "test-feature", "index.tsx"), 'export default function() { return <section>Old</section>; }');
    fs.writeFileSync(path.join(testDir, "app", "page.tsx"), pg(true)); git("add", "."); git("commit", "-qm", "main with extra"); git("branch", "-f", "base");
    fs.writeFileSync(path.join(testDir, "app", "lab", "test-feature", "index.tsx"), 'export default function() { return <section>New</section>; }');
    fs.writeFileSync(path.join(testDir, "app", "page.tsx"), pg(false)); git("add", "."); git("commit", "-qm", "drop extra");
    const r = runGate("test-feature", "base", "HEAD"); assert.strictEqual(r.exitCode, 0, "removing a leftover Extra should pass: " + r.output);
  },

  "FAIL: normal run adds an Extra"() {
    setupTestWorkspace();
    fs.mkdirSync(path.join(testDir, "app", "lab", "test-feature"), { recursive: true });
    fs.writeFileSync(path.join(testDir, "app", "lab", "test-feature", "index.tsx"), 'export default function() { return <section>T</section>; }');
    fs.writeFileSync(path.join(testDir, "app", "page.tsx"), 'import Lab from "./lab/test-feature";\nimport Extra from "./lab/custom-1792280000";\nexport default function Page() { return <div><Extra />\n<Lab /> {/* lab:slot */}</div>; }');
    git("add", "."); git("commit", "-qm", "add extra");
    assert.strictEqual(runGate("test-feature", "base", "HEAD").exitCode, 1, "a normal run may not add an Extra");
  },

  "FAIL: normal run removes Extra and changes another page.tsx line"() {
    setupTestWorkspace();
    fs.mkdirSync(path.join(testDir, "app", "lab", "test-feature"), { recursive: true });
    fs.writeFileSync(path.join(testDir, "app", "lab", "test-feature", "index.tsx"), 'export default function() { return <section>T</section>; }');
    fs.writeFileSync(path.join(testDir, "app", "page.tsx"), 'import Lab from "./lab/test-feature";\nimport Extra from "./lab/custom-1792280000";\nexport default function Page() {\n  return (\n    <div>\n      <Extra />\n      <Lab /> {/* lab:slot */}\n    </div>\n  );\n}\n');
    git("add", "."); git("commit", "-qm", "main with extra"); git("branch", "-f", "base");
    fs.writeFileSync(path.join(testDir, "app", "page.tsx"), 'import Lab from "./lab/test-feature";\nexport default function Page() {\n  return (\n    <main>\n      <Lab /> {/* lab:slot */}\n    </main>\n  );\n}\n');
    git("add", "."); git("commit", "-qm", "drop extra + other change");
    assert.strictEqual(runGate("test-feature", "base", "HEAD").exitCode, 1, "other page.tsx lines still may not change");
  },

  "PASS: next run deletes a leftover custom-<ts> folder"() {
    setupTestWorkspace();
    const old = path.join(testDir, "app", "lab", "custom-1792280000");
    fs.mkdirSync(old, { recursive: true });
    fs.writeFileSync(path.join(old, "index.tsx"), 'export default function() { return <section>Old</section>; }');
    fs.writeFileSync(path.join(testDir, "app", "page.tsx"), 'export default function Page() {\n  return (\n    <div>\n      {/* lab:slot */}\n    </div>\n  );\n}\n');
    git("add", "."); git("commit", "-m", "leftover custom"); git("branch", "-f", "base");
    fs.rmSync(old, { recursive: true, force: true });
    const d = path.join(testDir, "app", "lab", "test-feature");
    fs.mkdirSync(d, { recursive: true });
    fs.writeFileSync(path.join(d, "index.tsx"), 'export default function() { return <div>Test</div>; }');
    fs.writeFileSync(path.join(testDir, "app", "page.tsx"), 'import Lab from "./lab/test-feature";\nexport default function Page() {\n  return (\n    <div>\n      <Lab /> {/* lab:slot */}\n    </div>\n  );\n}\n');
    git("add", "-A"); git("commit", "-m", "next run");
    const result = runGate("test-feature", "base", "HEAD");
    assert.strictEqual(result.exitCode, 0, "deleting a leftover custom-<ts> folder should pass: " + result.output);
  },

  "FAIL: deleting a non-custom unlisted folder (custom-abc, custom-123)"() {
    for (const bad of ["custom-abc", "custom-123"]) {
      setupTestWorkspace();
      const old = path.join(testDir, "app", "lab", bad);
      fs.mkdirSync(old, { recursive: true });
      fs.writeFileSync(path.join(old, "index.tsx"), 'export default function() { return <section>Old</section>; }');
      git("add", "."); git("commit", "-m", "leftover"); git("branch", "-f", "base");
      fs.rmSync(old, { recursive: true, force: true });
      const d = path.join(testDir, "app", "lab", "test-feature");
      fs.mkdirSync(d, { recursive: true });
      fs.writeFileSync(path.join(d, "index.tsx"), 'export default function() { return <div>Test</div>; }');
      fs.writeFileSync(path.join(testDir, "app", "page.tsx"), 'import Lab from "./lab/test-feature";\nexport default function Page() { return <div><Lab /> {/* lab:slot */}</div>; }');
      git("add", "-A"); git("commit", "-m", "next run");
      const result = runGate("test-feature", "base", "HEAD");
      assert.strictEqual(result.exitCode, 1, `deleting ${bad}/ must fail`);
      assert.match(result.output, /file outside allowlist: app\/lab\//, `${bad}: expected allowlist failure`);
    }
  },

  "FAIL: malformed custom slug"() {
    setupTestWorkspace();
    assert.strictEqual(runGate("custom-abc", "base", "HEAD").exitCode, 1, "custom-<non-digits> is unknown");
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
