(function () {
  const topRowId = "custom-top-row-wrapper";
  const bgColor = "#597FCD";

  function insertTopRow() {
    // Prevent duplicates
    if (document.getElementById(topRowId)) {
      console.log("⏭️ Top row already present.");
      return;
    }

    // Find the main grid wrapper
    const portalGrid = document.querySelector("#portalgrid");
    if (!portalGrid) {
      console.warn("❌ #portalgrid not found.");
      return;
    }

    // Create a full-width wrapper
    const wrapper = document.createElement("div");
    wrapper.id = topRowId;
    wrapper.style = `
      width: 100%;
      background-color: ${bgColor};
      padding: 1rem;
      margin-bottom: 1rem;
      display: flex;
      justify-content: space-between;
      border-radius: 0.5rem;
      box-sizing: border-box;
      z-index: 999;
    `;

    // Add 5 dummy gadgets
    for (let i = 1; i <= 5; i++) {
      const gadget = document.createElement("div");
      gadget.style = `
        flex: 1;
        background: white;
        margin: 0 0.5rem;
        padding: 1rem;
        text-align: center;
        border-radius: 0.25rem;
        border: 1px solid #ccc;
        font-weight: bold;
      `;
      gadget.textContent = `Custom Gadget ${i}`;
      wrapper.appendChild(gadget);
    }

    // Insert above the main grid
    portalGrid.prepend(wrapper);
    console.log("✅ New top row added above portal grid.");
  }

  // Wait for DOM readiness
  const interval = setInterval(() => {
    const portalGrid = document.querySelector("#portalgrid");
    if (portalGrid) {
      clearInterval(interval);
      insertTopRow();
    } else {
      console.log("⏳ Waiting for #portalgrid...");
    }
  }, 300);
})();
