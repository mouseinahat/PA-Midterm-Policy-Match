const sourceData = await fetch("./data/position-sources.json").then((res) => res.json());

document.querySelector("#lastUpdated").textContent = sourceData.last_updated;
document.querySelector("#disclaimer").textContent = sourceData.disclaimer;

function sourceLinks(sources) {
  return sources.map((source) => `
    <li>
      <a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.label}</a>
      <span class="source-type">${source.type}</span>
    </li>
  `).join("");
}

function renderCandidate(name, data) {
  const positions = data.positions.map((position) => `
    <article class="source-position">
      <div class="source-position-head">
        <div>
          <h3>${position.axis}</h3>
          <p class="muted">${position.summary}</p>
        </div>
        <div class="source-score">
          <span>Score</span>
          <strong>${position.score}</strong>
        </div>
      </div>
      <div class="confidence">Confidence: ${position.confidence}</div>
      <ul class="source-list">
        ${sourceLinks(position.sources)}
      </ul>
    </article>
  `).join("");

  const gaps = data.needs_more_sources.map((axis) => `<span>${axis}</span>`).join("");

  return `
    <section class="card">
      <div class="candidate-source-header">
        <p class="eyebrow">${data.party} · ${data.race}</p>
        <h2>${name}</h2>
        <p class="muted">${data.overall_note}</p>
      </div>

      <div class="source-positions">
        ${positions}
      </div>

      <div class="source-gaps">
        <h3>Needs stronger sourcing</h3>
        <p class="muted">These axes should not be treated as final until more direct evidence is added.</p>
        <div>${gaps}</div>
      </div>
    </section>
  `;
}

document.querySelector("#candidateSources").innerHTML = Object.entries(sourceData.candidates)
  .map(([name, data]) => renderCandidate(name, data))
  .join("");
