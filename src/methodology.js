const [candidates, axisMeta] = await Promise.all([
  fetch("./data/candidates.json").then((res) => res.json()),
  fetch("./data/axis-meta.json").then((res) => res.json())
]);

function renderAxisTable() {
  const rows = Object.entries(axisMeta).map(([axis, meta]) => `
    <tr>
      <td><strong>${meta.name}</strong><br><span class="muted">${axis}</span></td>
      <td>${meta.left}</td>
      <td>${meta.right}</td>
      <td>${meta.explain}</td>
    </tr>
  `).join("");

  document.querySelector("#axisTable").innerHTML = `
    <div class="table-wrap">
      <table>
        <thead><tr><th>Axis</th><th>-2 side</th><th>+2 side</th><th>Description</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function renderCandidateTable() {
  const axes = Object.keys(axisMeta);
  const header = axes.map((axis) => `<th>${axisMeta[axis].name}</th>`).join("");
  const rows = Object.entries(candidates).map(([name, data]) => `
    <tr>
      <td><strong>${name}</strong><br><span class="muted">${data.party}</span></td>
      ${axes.map((axis) => `<td>${data.vector[axis]}</td>`).join("")}
    </tr>
  `).join("");

  document.querySelector("#candidateTable").innerHTML = `
    <div class="table-wrap">
      <table>
        <thead><tr><th>Candidate</th>${header}</tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

renderAxisTable();
renderCandidateTable();
