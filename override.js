(function () {
  const bgColor = "#e0f7fa"; // Easily changeable background

  function createTopRow() {
    const grid = document.querySelector("#portalgrid > div");
    if (!grid) {
      console.warn("❌ Grid container not found.");
      return;
    }

    const newRow = document.createElement("div");
    newRow.className = "grid-stack-item custom-top-row";
    newRow.style = `
      display: flex;
      justify-content: space-between;
      background-color: ${bgColor};
      padding: 1rem;
      margin-bottom: 1rem;
      border-radius: 0.5rem;
    `;

    for (let i = 1; i <= 5; i++) {
      const gadget = document.createElement("div");
      gadget.style = `
        flex: 1;
        margin: 0 0.5rem;
        padding: 1rem;
        background: white;
        border: 1px solid #ccc;
        border-radius: 0.25rem;
        text-align: center;
      `;
      gadget.textContent = `Custom Gadget ${i}`;
      newRow.appendChild(gadget);
    }

    grid.prepend(newRow);
    console.log("✅ Custom top row added.");
  }

  // Wait for grid to load
  const interval = setInterval(() => {
    const grid = document.querySelector("#portalgrid > div");
    if (grid) {
      clearInterval(interval);
      createTopRow();
    } else {
      console.log("⏳ Waiting for #portalgrid > div...");
    }
  }, 300);
})();
