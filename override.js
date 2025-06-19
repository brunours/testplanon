(function () {
  const TOP_ROW_GADGET_COUNT = 5;
  const TOP_ROW_COLOR = "#597FCD";
  const CHECK_INTERVAL = 500;
  const MAX_ATTEMPTS = 20;
  let attempts = 0;

  function log(msg) {
    console.log(`🟦 Planon Override: ${msg}`);
  }

  function styleTopRow(gadgetDivs) {
    gadgetDivs.slice(0, TOP_ROW_GADGET_COUNT).forEach((div, index) => {
      div.style.backgroundColor = TOP_ROW_COLOR;
      div.setAttribute("gs-x", index);      // column 0–4
      div.setAttribute("gs-y", "0");        // top row
      div.setAttribute("gs-width", "1");    // span 1 column
      div.setAttribute("gs-height", "1");   // default height
    });
    log("✅ Top row layout and color applied.");
  }

  function tryInject() {
    const iframe = document.getElementById("workspaceFrame");
    if (!iframe) return log("❌ Workspace iframe not found.");

    const doc = iframe.contentDocument || iframe.contentWindow.document;
    if (!doc) return log("❌ Cannot access iframe contentDocument.");

    const grid = doc.querySelector(".grid-stack");
    if (!grid) return log("❌ Grid container not yet available.");

    const gadgetDivs = Array.from(grid.children).filter(div =>
      div.classList.contains("grid-stack-item")
    );

    if (gadgetDivs.length < TOP_ROW_GADGET_COUNT) {
      log(`⏳ Found ${gadgetDivs.length} gadgets, waiting for at least ${TOP_ROW_GADGET_COUNT}...`);
      return false;
    }

    styleTopRow(gadgetDivs);
    return true;
  }

  function waitForGridAndInject() {
    const interval = setInterval(() => {
      attempts++;
      if (tryInject() || attempts >= MAX_ATTEMPTS) {
        clearInterval(interval);
        if (attempts >= MAX_ATTEMPTS) log("⛔ Max attempts reached. Stopping.");
      }
    }, CHECK_INTERVAL);
  }

  // Wait for outer document to be ready before starting
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", waitForGridAndInject);
  } else {
    waitForGridAndInject();
  }
})();
