(function () {
  const bgColor = "#597FCD";
  const MAX_ATTEMPTS = 20;
  let attempt = 0;

  function insertTopRow(grid) {
    const existing = grid.querySelector(".custom-top-row");
    if (existing) return; // Avoid duplicates

    const newRow = document.createElement("div");
    newRow.className = "grid-stack-item custom-top-row";
    newRow.style = `
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      gap: 10px;
      background-color: ${bgColor};
      padding: 16px;
      margin-bottom: 16px;
      border-radius: 8px;
      flex-wrap: nowrap;
    `;

    for (let i = 1; i <= 5; i++) {
      const gadget = document.createElement("div");
      gadget.textContent = `Custom Gadget ${i}`;
      gadget.style = `
        flex: 1;
        background: white;
        border: 1px solid #ccc;
        border-radius: 4px;
        text-align: center;
        padding: 16px;
      `;
      newRow.appendChild(gadget);
    }

    grid.prepend(newRow);
    console.log("✅ Top row added to grid.");
  }

  function tryInject(documentContext) {
    const grid = documentContext.querySelector("#portalgrid > div");
    if (grid) {
      insertTopRow(grid);
      return true;
    }
    return false;
  }

  function startInjection() {
    const interval = setInterval(() => {
      attempt++;
      console.log(`⏳ Attempt ${attempt}: Looking for grid...`);

      // Case 1: We're inside iframe already
      if (tryInject(document)) {
        clearInterval(interval);
        return;
      }

      // Case 2: Look into iframe from top
      const iframe = document.querySelector("iframe#workspaceFrame");
      if (iframe && iframe.contentDocument) {
        if (tryInject(iframe.contentDocument)) {
          clearInterval(interval);
          return;
        }
      }

      if (attempt >= MAX_ATTEMPTS) {
        console.warn("❌ Failed to inject top row after max attempts.");
        clearInterval(interval);
      }
    }, 500);
  }

  startInjection();
})();
