(function () {
  const bgColor = "#597FCD";
  const topRowId = "custom-top-row";
  const iframeSrc = "/case/BP/UoSA_KPI_number_Heating?IsRunInPortal=true&RenderMode=gadget&ColSpan=false&RowSpan=false";

  function createTopRowWithIframes(src) {
    const wrapper = document.createElement("div");
    wrapper.id = topRowId;
    wrapper.style = `
      display: flex;
      justify-content: space-between;
      background-color: ${bgColor};
      padding: 1rem;
      margin-bottom: 1rem;
      border-radius: 0.5rem;
      flex-wrap: nowrap;
      gap: 1rem;
    `;

    for (let i = 1; i <= 5; i++) {
      const container = document.createElement("div");
      container.style = `
        flex: 1;
        background: white;
        border-radius: 0.25rem;
        overflow: hidden;
        min-width: 180px;
        height: 336px;
      `;

      const iframe = document.createElement("iframe");
      iframe.src = src;
      iframe.width = "100%";
      iframe.height = "100%";
      iframe.style.border = "none";
      iframe.title = `KPI - WO/PPM Heating ${i}`;
      iframe.className = "pn-gadget";

      container.appendChild(iframe);
      wrapper.appendChild(container);
    }

    return wrapper;
  }

  function injectTopRow() {
    const grid = document.querySelector("#portalgrid > div");
    if (!grid) {
      console.warn("❌ Grid container not found.");
      return;
    }

    if (document.querySelector(`#${topRowId}`)) {
      console.log("ℹ️ Top row already exists.");
      return;
    }

    const topRow = createTopRowWithIframes(iframeSrc);
    grid.prepend(topRow);
    console.log("✅ Top row with KPI gadgets added.");
  }

  const interval = setInterval(() => {
    const grid = document.querySelector("#portalgrid > div");
    if (grid) {
      clearInterval(interval);
      injectTopRow();
    } else {
      console.log("⏳ Waiting for #portalgrid > div...");
    }
  }, 300);
})();
