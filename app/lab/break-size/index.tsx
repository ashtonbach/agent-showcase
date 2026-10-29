"use client";

import { useState } from "react";

type Row = [string, string, string, string];

const PLAN_ROWS: Row[] = [
  ["Tier 1", "$5 / month", "Feature 1 included", "Support level 1"],
  ["Tier 2", "$10 / month", "Feature 2 included", "Support level 2"],
  ["Tier 3", "$15 / month", "Feature 3 included", "Support level 3"],
  ["Tier 4", "$20 / month", "Feature 4 included", "Support level 4"],
  ["Tier 5", "$25 / month", "Feature 5 included", "Support level 5"],
  ["Tier 6", "$30 / month", "Feature 6 included", "Support level 6"],
  ["Tier 7", "$35 / month", "Feature 7 included", "Support level 7"],
  ["Tier 8", "$40 / month", "Feature 8 included", "Support level 8"],
  ["Tier 9", "$45 / month", "Feature 9 included", "Support level 9"],
  ["Tier 10", "$50 / month", "Feature 10 included", "Support level 10"],
  ["Tier 11", "$55 / month", "Feature 11 included", "Support level 11"],
  ["Tier 12", "$60 / month", "Feature 12 included", "Support level 12"],
  ["Tier 13", "$65 / month", "Feature 13 included", "Support level 13"],
  ["Tier 14", "$70 / month", "Feature 14 included", "Support level 14"],
  ["Tier 15", "$75 / month", "Feature 15 included", "Support level 15"],
  ["Tier 16", "$80 / month", "Feature 16 included", "Support level 16"],
  ["Tier 17", "$85 / month", "Feature 17 included", "Support level 17"],
  ["Tier 18", "$90 / month", "Feature 18 included", "Support level 18"],
  ["Tier 19", "$95 / month", "Feature 19 included", "Support level 19"],
  ["Tier 20", "$100 / month", "Feature 20 included", "Support level 20"],
  ["Tier 21", "$105 / month", "Feature 21 included", "Support level 21"],
  ["Tier 22", "$110 / month", "Feature 22 included", "Support level 22"],
  ["Tier 23", "$115 / month", "Feature 23 included", "Support level 23"],
  ["Tier 24", "$120 / month", "Feature 24 included", "Support level 24"],
  ["Tier 25", "$125 / month", "Feature 25 included", "Support level 25"],
  ["Tier 26", "$130 / month", "Feature 26 included", "Support level 26"],
  ["Tier 27", "$135 / month", "Feature 27 included", "Support level 27"],
  ["Tier 28", "$140 / month", "Feature 28 included", "Support level 28"],
  ["Tier 29", "$145 / month", "Feature 29 included", "Support level 29"],
  ["Tier 30", "$150 / month", "Feature 30 included", "Support level 30"],
  ["Tier 31", "$155 / month", "Feature 31 included", "Support level 31"],
  ["Tier 32", "$160 / month", "Feature 32 included", "Support level 32"],
  ["Tier 33", "$165 / month", "Feature 33 included", "Support level 33"],
  ["Tier 34", "$170 / month", "Feature 34 included", "Support level 34"],
  ["Tier 35", "$175 / month", "Feature 35 included", "Support level 35"],
  ["Tier 36", "$180 / month", "Feature 36 included", "Support level 36"],
  ["Tier 37", "$185 / month", "Feature 37 included", "Support level 37"],
  ["Tier 38", "$190 / month", "Feature 38 included", "Support level 38"],
  ["Tier 39", "$195 / month", "Feature 39 included", "Support level 39"],
  ["Tier 40", "$200 / month", "Feature 40 included", "Support level 40"],
  ["Tier 41", "$205 / month", "Feature 41 included", "Support level 41"],
  ["Tier 42", "$210 / month", "Feature 42 included", "Support level 42"],
  ["Tier 43", "$215 / month", "Feature 43 included", "Support level 43"],
  ["Tier 44", "$220 / month", "Feature 44 included", "Support level 44"],
  ["Tier 45", "$225 / month", "Feature 45 included", "Support level 45"],
  ["Tier 46", "$230 / month", "Feature 46 included", "Support level 46"],
  ["Tier 47", "$235 / month", "Feature 47 included", "Support level 47"],
  ["Tier 48", "$240 / month", "Feature 48 included", "Support level 48"],
  ["Tier 49", "$245 / month", "Feature 49 included", "Support level 49"],
  ["Tier 50", "$250 / month", "Feature 50 included", "Support level 50"],
  ["Tier 51", "$255 / month", "Feature 51 included", "Support level 51"],
  ["Tier 52", "$260 / month", "Feature 52 included", "Support level 52"],
  ["Tier 53", "$265 / month", "Feature 53 included", "Support level 53"],
  ["Tier 54", "$270 / month", "Feature 54 included", "Support level 54"],
  ["Tier 55", "$275 / month", "Feature 55 included", "Support level 55"],
  ["Tier 56", "$280 / month", "Feature 56 included", "Support level 56"],
  ["Tier 57", "$285 / month", "Feature 57 included", "Support level 57"],
  ["Tier 58", "$290 / month", "Feature 58 included", "Support level 58"],
  ["Tier 59", "$295 / month", "Feature 59 included", "Support level 59"],
  ["Tier 60", "$300 / month", "Feature 60 included", "Support level 60"],
  ["Tier 61", "$305 / month", "Feature 61 included", "Support level 61"],
  ["Tier 62", "$310 / month", "Feature 62 included", "Support level 62"],
  ["Tier 63", "$315 / month", "Feature 63 included", "Support level 63"],
  ["Tier 64", "$320 / month", "Feature 64 included", "Support level 64"],
  ["Tier 65", "$325 / month", "Feature 65 included", "Support level 65"],
  ["Tier 66", "$330 / month", "Feature 66 included", "Support level 66"],
  ["Tier 67", "$335 / month", "Feature 67 included", "Support level 67"],
  ["Tier 68", "$340 / month", "Feature 68 included", "Support level 68"],
  ["Tier 69", "$345 / month", "Feature 69 included", "Support level 69"],
  ["Tier 70", "$350 / month", "Feature 70 included", "Support level 70"],
  ["Tier 71", "$355 / month", "Feature 71 included", "Support level 71"],
  ["Tier 72", "$360 / month", "Feature 72 included", "Support level 72"],
  ["Tier 73", "$365 / month", "Feature 73 included", "Support level 73"],
  ["Tier 74", "$370 / month", "Feature 74 included", "Support level 74"],
  ["Tier 75", "$375 / month", "Feature 75 included", "Support level 75"],
  ["Tier 76", "$380 / month", "Feature 76 included", "Support level 76"],
  ["Tier 77", "$385 / month", "Feature 77 included", "Support level 77"],
  ["Tier 78", "$390 / month", "Feature 78 included", "Support level 78"],
  ["Tier 79", "$395 / month", "Feature 79 included", "Support level 79"],
  ["Tier 80", "$400 / month", "Feature 80 included", "Support level 80"],
  ["Tier 81", "$405 / month", "Feature 81 included", "Support level 81"],
  ["Tier 82", "$410 / month", "Feature 82 included", "Support level 82"],
  ["Tier 83", "$415 / month", "Feature 83 included", "Support level 83"],
  ["Tier 84", "$420 / month", "Feature 84 included", "Support level 84"],
  ["Tier 85", "$425 / month", "Feature 85 included", "Support level 85"],
  ["Tier 86", "$430 / month", "Feature 86 included", "Support level 86"],
  ["Tier 87", "$435 / month", "Feature 87 included", "Support level 87"],
  ["Tier 88", "$440 / month", "Feature 88 included", "Support level 88"],
  ["Tier 89", "$445 / month", "Feature 89 included", "Support level 89"],
  ["Tier 90", "$450 / month", "Feature 90 included", "Support level 90"],
  ["Tier 91", "$455 / month", "Feature 91 included", "Support level 91"],
  ["Tier 92", "$460 / month", "Feature 92 included", "Support level 92"],
  ["Tier 93", "$465 / month", "Feature 93 included", "Support level 93"],
  ["Tier 94", "$470 / month", "Feature 94 included", "Support level 94"],
  ["Tier 95", "$475 / month", "Feature 95 included", "Support level 95"],
  ["Tier 96", "$480 / month", "Feature 96 included", "Support level 96"],
  ["Tier 97", "$485 / month", "Feature 97 included", "Support level 97"],
  ["Tier 98", "$490 / month", "Feature 98 included", "Support level 98"],
  ["Tier 99", "$495 / month", "Feature 99 included", "Support level 99"],
  ["Tier 100", "$500 / month", "Feature 100 included", "Support level 100"],
  ["Tier 101", "$505 / month", "Feature 101 included", "Support level 101"],
  ["Tier 102", "$510 / month", "Feature 102 included", "Support level 102"],
  ["Tier 103", "$515 / month", "Feature 103 included", "Support level 103"],
  ["Tier 104", "$520 / month", "Feature 104 included", "Support level 104"],
  ["Tier 105", "$525 / month", "Feature 105 included", "Support level 105"],
  ["Tier 106", "$530 / month", "Feature 106 included", "Support level 106"],
  ["Tier 107", "$535 / month", "Feature 107 included", "Support level 107"],
  ["Tier 108", "$540 / month", "Feature 108 included", "Support level 108"],
  ["Tier 109", "$545 / month", "Feature 109 included", "Support level 109"],
  ["Tier 110", "$550 / month", "Feature 110 included", "Support level 110"],
  ["Tier 111", "$555 / month", "Feature 111 included", "Support level 111"],
  ["Tier 112", "$560 / month", "Feature 112 included", "Support level 112"],
  ["Tier 113", "$565 / month", "Feature 113 included", "Support level 113"],
  ["Tier 114", "$570 / month", "Feature 114 included", "Support level 114"],
  ["Tier 115", "$575 / month", "Feature 115 included", "Support level 115"],
  ["Tier 116", "$580 / month", "Feature 116 included", "Support level 116"],
  ["Tier 117", "$585 / month", "Feature 117 included", "Support level 117"],
  ["Tier 118", "$590 / month", "Feature 118 included", "Support level 118"],
  ["Tier 119", "$595 / month", "Feature 119 included", "Support level 119"],
  ["Tier 120", "$600 / month", "Feature 120 included", "Support level 120"],
  ["Tier 121", "$605 / month", "Feature 121 included", "Support level 121"],
  ["Tier 122", "$610 / month", "Feature 122 included", "Support level 122"],
  ["Tier 123", "$615 / month", "Feature 123 included", "Support level 123"],
  ["Tier 124", "$620 / month", "Feature 124 included", "Support level 124"],
  ["Tier 125", "$625 / month", "Feature 125 included", "Support level 125"],
  ["Tier 126", "$630 / month", "Feature 126 included", "Support level 126"],
  ["Tier 127", "$635 / month", "Feature 127 included", "Support level 127"],
  ["Tier 128", "$640 / month", "Feature 128 included", "Support level 128"],
  ["Tier 129", "$645 / month", "Feature 129 included", "Support level 129"],
  ["Tier 130", "$650 / month", "Feature 130 included", "Support level 130"],
  ["Tier 131", "$655 / month", "Feature 131 included", "Support level 131"],
  ["Tier 132", "$660 / month", "Feature 132 included", "Support level 132"],
  ["Tier 133", "$665 / month", "Feature 133 included", "Support level 133"],
  ["Tier 134", "$670 / month", "Feature 134 included", "Support level 134"],
  ["Tier 135", "$675 / month", "Feature 135 included", "Support level 135"],
  ["Tier 136", "$680 / month", "Feature 136 included", "Support level 136"],
  ["Tier 137", "$685 / month", "Feature 137 included", "Support level 137"],
  ["Tier 138", "$690 / month", "Feature 138 included", "Support level 138"],
  ["Tier 139", "$695 / month", "Feature 139 included", "Support level 139"],
  ["Tier 140", "$700 / month", "Feature 140 included", "Support level 140"],
  ["Tier 141", "$705 / month", "Feature 141 included", "Support level 141"],
  ["Tier 142", "$710 / month", "Feature 142 included", "Support level 142"],
  ["Tier 143", "$715 / month", "Feature 143 included", "Support level 143"],
  ["Tier 144", "$720 / month", "Feature 144 included", "Support level 144"],
  ["Tier 145", "$725 / month", "Feature 145 included", "Support level 145"],
  ["Tier 146", "$730 / month", "Feature 146 included", "Support level 146"],
  ["Tier 147", "$735 / month", "Feature 147 included", "Support level 147"],
  ["Tier 148", "$740 / month", "Feature 148 included", "Support level 148"],
  ["Tier 149", "$745 / month", "Feature 149 included", "Support level 149"],
  ["Tier 150", "$750 / month", "Feature 150 included", "Support level 150"],
  ["Tier 151", "$755 / month", "Feature 151 included", "Support level 151"],
  ["Tier 152", "$760 / month", "Feature 152 included", "Support level 152"],
  ["Tier 153", "$765 / month", "Feature 153 included", "Support level 153"],
  ["Tier 154", "$770 / month", "Feature 154 included", "Support level 154"],
  ["Tier 155", "$775 / month", "Feature 155 included", "Support level 155"],
  ["Tier 156", "$780 / month", "Feature 156 included", "Support level 156"],
  ["Tier 157", "$785 / month", "Feature 157 included", "Support level 157"],
  ["Tier 158", "$790 / month", "Feature 158 included", "Support level 158"],
  ["Tier 159", "$795 / month", "Feature 159 included", "Support level 159"],
  ["Tier 160", "$800 / month", "Feature 160 included", "Support level 160"],
];

const CSS = `
.lab-break-size { width: min(960px, 100%); margin: 8px auto 56px; }
.lab-break-size .lab-wrap {
  border: 1px solid rgba(176,203,188,0.28);
  border-radius: 16px;
  padding: 24px;
  overflow-x: auto;
}
.lab-break-size table { width: 100%; border-collapse: collapse; min-width: 560px; }
.lab-break-size th, .lab-break-size td {
  text-align: left;
  padding: 8px 10px;
  border-bottom: 1px solid rgba(176,203,188,0.18);
  color: #E8EEE9;
  font-family: var(--sans);
  font-size: 14px;
  white-space: nowrap;
}
.lab-break-size th {
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 500;
  color: var(--sage);
  font-size: 12px;
}
.lab-break-size .lab-count {
  font-family: var(--sans);
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--sage);
  font-size: 12px;
  margin: 0 0 16px;
}
.lab-break-size .lab-note { color: #E8EEE9; margin: 16px 0 0; font-size: 14px; }
`;

export default function BreakSize() {
  const [visibleCount, setVisibleCount] = useState(40);

  function showMore() {
    setVisibleCount((n) => Math.min(n + 40, PLAN_ROWS.length));
  }

  const rows = PLAN_ROWS.slice(0, visibleCount);

  return (
    <section className="lab-break-size" data-lab="break-size" aria-labelledby="break-size-title">
      <style>{CSS}</style>
      <h2 id="break-size-title">Every plan we offer</h2>
      <p className="lab-count">{PLAN_ROWS.length} tiers, {rows.length} shown</p>
      <div className="lab-wrap">
        <table>
          <thead>
            <tr>
              <th>Plan</th>
              <th>Price</th>
              <th>Feature</th>
              <th>Support</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]}>
                <td>{row[0]}</td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
                <td>{row[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {visibleCount < PLAN_ROWS.length ? (
        <button type="button" className="lab-count" onClick={showMore} style={{ cursor: "pointer", background: "none", border: "1px solid rgba(176,203,188,0.28)", borderRadius: 8, padding: "8px 14px", marginTop: 16 }}>
          Show more plans
        </button>
      ) : null}
      <p className="lab-note">Example data: all 160 plan rows above are placeholder tiers for this demo, not real pricing.</p>
    </section>
  );
}
