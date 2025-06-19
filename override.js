(function () {
  const TOP_ROW_GADGET_COUNT = 5;
  const TOP_ROW_COLOR = "#597FCD";
  const CHECK_INTERVAL = 500;
  const MAX_ATTEMPTS = 30;
  let attempts = 0;

  function log(msg) {
    console.log(`🟦 Planon Override: ${msg}`);
  }

  function styleTopRow(gadgetDivs) {
    gadgetDivs.slice(0, TOP_ROW_GADGET_COUNT).forEach((div, index) => {
      div.style.backgroundColor = TOP_ROW_COLOR;
      div.setAttribute("gs-x", index.toString());
      div.setAttribute("gs-y", "0");
      div.setAttribute("gs-width", "1");
      div.setAttribute("gs-height", "1");
    });
    log("✅ Top row layout and style applied.");
  }

  function tryInject() {
    const iframe = document.querySelector("iframe#workspaceFrame");
    if (!iframe) {
      log("❌ Workspace iframe not found.");
      return false;
    }

    let doc;
    try {
      doc = iframe.contentDocument || iframe.contentWindow.document;
    } catch (e) {
      log("❌ Cannot access iframe contentDocument.");
      return false;
    }

    if (!doc) {
      log("❌ Workspace iframe document not ready.");
      return false;
    }

    const grid = doc.querySelector(".grid-stack");
    if (!grid) {
      log("❌ Grid not yet available.");
      return false;
    }

    const gadgetDivs = Array.from(grid.children).filter(div =>
      div.classList.contains("grid-stack-item")
    );

    if (gadgetDivs.length < TOP_ROW_GADGET_COUNT) {
      log(`⏳ Only ${gadgetDivs.length} gadgets found; waiting for at least ${TOP_ROW_GADGET_COUNT}.`);
      return false;
    }

    styleTopRow(gadgetDivs);
    return true;
  }

  function waitForIframeAndInject() {
    const interval = setInterval(() => {
      attempts++;
      if (tryInject() || attempts >= MAX_ATTEMPTS) {
        clearInterval(interval);
        if (attempts >= MAX_ATTEMPTS) log("⛔ Max attempts reached. Stopping.");
      }
    }, CHECK_INTERVAL);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", waitForIframeAndInject);
  } else {
    waitForIframeAndInject();
  }
})();
