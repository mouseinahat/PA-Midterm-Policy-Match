const labelMap = {
  "-2": "Strongly disagree",
  "-1": "Disagree",
  "0": "Neutral",
  "1": "Agree",
  "2": "Strongly agree"
};

const [candidates, questions, axisMeta, zipMap, housePlaceholders] = await Promise.all([
  fetch("./data/candidates.json").then((res) => res.json()),
  fetch("./data/questions.json").then((res) => res.json()),
  fetch("./data/axis-meta.json").then((res) => res.json()),
  fetch("./data/sample-zip-to-district.json").then((res) => res.json()),
  fetch("./data/house-placeholders.json").then((res) => res.json())
]);

let lastScores = [];

function renderQuestions() {
  const box = document.querySelector("#questions");
  questions.forEach((question, index) => {
    const div = document.createElement("div");
    div.className = "question";

    const options = [-2, -1, 0, 1, 2].map((value) => `
      <label>
        <input type="radio" name="q${index}" value="${value}" ${value === 0 ? "checked" : ""} />
        ${labelMap[value]}
      </label>
    `).join("");

    div.innerHTML = `
      <div class="question-meta">${axisMeta[question.axis].name}</div>
      <div class="question-title">Q${index + 1}. ${question.text}</div>
      <div class="scale">${options}</div>
    `;
    box.appendChild(div);
  });
}

function checkDistrict() {
  const zip = document.querySelector("#zipInput").value.trim();
  const out = document.querySelector("#districtResult");
  const match = zipMap[zip];

  if (!/^\d{5}$/.test(zip)) {
    out.innerHTML = "Enter a valid 5-digit ZIP code.";
    return;
  }

  if (!match) {
    out.innerHTML = `ZIP ${zip} is not in the v0 sample map yet. Try 19104, 15213, 18101, 17101, 16501, or 18503.`;
    return;
  }

  const house = housePlaceholders[match.district] || {};
  out.innerHTML = `
    <strong>${match.city}</strong> → ${match.district}<br>
    ${house.status || "District detected"}: ${house.note || match.note}
  `;
}

function buildUserVector() {
  const user = {};
  const counts = {};
  questions.forEach((question, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    let value = Number(selected.value);
    if (question.reverse) value = value * -1;
    const axis = question.axis;
    user[axis] = (user[axis] || 0) + value;
    counts[axis] = (counts[axis] || 0) + 1;
  });
  Object.keys(user).forEach((axis) => user[axis] = user[axis] / counts[axis]);
  return user;
}

function similarityScore(userVector, candidateVector) {
  let distanceSum = 0;
  let axisCount = 0;
  Object.keys(candidateVector).forEach((axis) => {
    if (userVector[axis] === undefined) return;
    distanceSum += Math.abs(userVector[axis] - candidateVector[axis]) / 4;
    axisCount += 1;
  });
  return Math.max(0, Math.round((1 - distanceSum / axisCount) * 100));
}

function explainMatch(userVector, candidateVector) {
  const comparisons = Object.keys(candidateVector)
    .filter((axis) => userVector[axis] !== undefined)
    .map((axis) => ({
      axis,
      diff: Math.abs(userVector[axis] - candidateVector[axis])
    }))
    .sort((a, b) => a.diff - b.diff);

  return {
    aligned: comparisons.slice(0, 3).map((item) => axisMeta[item.axis].name),
    different: comparisons.slice(-3).reverse().map((item) => axisMeta[item.axis].name)
  };
}

function renderAxisProfile(userVector) {
  const axes = Object.entries(userVector)
    .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
    .slice(0, 6);

  return `
    <div class="axis-profile">
      <h3>Your strongest policy axes</h3>
      <div class="axis-grid">
        ${axes.map(([axis, value]) => {
          const meta = axisMeta[axis];
          const leftPercent = ((value + 2) / 4) * 100;
          const side = value > 0.35 ? meta.right : value < -0.35 ? meta.left : "Mixed / neutral";
          return `
            <div class="axis-item">
              <div class="axis-item-head">
                <span>${meta.name}</span>
                <span>${side}</span>
              </div>
              <div class="axis-track">
                <div class="axis-dot" style="left:${leftPercent}%"></div>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function calculate() {
  const userVector = buildUserVector();
  const scores = Object.entries(candidates)
    .map(([name, data]) => {
      const reason = explainMatch(userVector, data.vector);
      return {
        name,
        party: data.party,
        race: data.race,
        status: data.status,
        tagline: data.tagline,
        description: data.description,
        score: similarityScore(userVector, data.vector),
        reason
      };
    })
    .sort((a, b) => b.score - a.score);

  lastScores = scores;
  const top = scores[0];

  document.querySelector("#topSummary").innerHTML = `
    <div class="top-match">
      <h3>Closest governor match: ${top.name} · ${top.score}%</h3>
      <p>${top.party} · ${top.status}</p>
      <p>Closest issue areas: ${top.reason.aligned.join(", ")}</p>
    </div>
    ${renderAxisProfile(userVector)}
  `;

  document.querySelector("#results").innerHTML = scores.map((item) => `
    <article class="result-card">
      <div class="result-row">
        <div class="candidate">${item.name}</div>
        <div class="bar"><div class="fill" style="width:${item.score}%"></div></div>
        <div class="score">${item.score}%</div>
      </div>
      <p class="tagline">${item.party} · ${item.tagline}</p>
      <p class="muted">${item.description}</p>
      <div class="reason">
        <div><strong>Aligned:</strong> ${item.reason.aligned.map((x) => `<span>${x}</span>`).join("")}</div>
        <div><strong>Different:</strong> ${item.reason.different.map((x) => `<span>${x}</span>`).join("")}</div>
      </div>
    </article>
  `).join("");

  document.querySelector("#resultCard").classList.remove("hidden");
  window.scrollTo({ top: document.querySelector("#resultCard").offsetTop - 70, behavior: "smooth" });
}

async function shareResult() {
  const top = lastScores[0];
  const text = top ? `My PA 2026 governor policy match: ${top.name} (${top.score}%)` : "PA 2026 Policy Match";
  await navigator.clipboard.writeText(`${text}\n${location.href}`);
  alert("Share text copied.");
}

function resetQuiz() {
  document.querySelectorAll("input[type='radio'][value='0']").forEach((input) => input.checked = true);
  document.querySelector("#resultCard").classList.add("hidden");
  window.scrollTo({ top: document.querySelector("#quiz").offsetTop - 70, behavior: "smooth" });
}

renderQuestions();
document.querySelector("#zipBtn").addEventListener("click", checkDistrict);
document.querySelector("#submitBtn").addEventListener("click", calculate);
document.querySelector("#shareBtn").addEventListener("click", shareResult);
document.querySelector("#resetBtn").addEventListener("click", resetQuiz);
