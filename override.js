(function () {
  const bgColor = "#597FCD";
  const rowId = "custom-top-row-outside";

  const iframeSources = [
    "/case/BP/UoSA_KPI_number_Heating_vignette?IsRunInPortal=true&RenderMode=gadget&ColSpan=false&RowSpan=false",
    "/case/BP/UoSA_WO_TeamByMember_Electricians?IsRunInPortal=true&RenderMode=gadget&ColSpan=false&RowSpan=false",
    "/case/BP/UoSA_WO_TeamByMember_Joiners?IsRunInPortal=true&RenderMode=gadget&ColSpan=false&RowSpan=false",
    "/case/BP/UoSA_WO_TeamByMember_Maintenance?IsRunInPortal=true&RenderMode=gadget&ColSpan=false&RowSpan=false",
    "/case/BP/UoSA_WO_TeamByMember_Painters?IsRunInPortal=true&RenderMode=gadget&ColSpan=false&RowSpan=false"
  ];

  function createRow() {
    const row = document.createElement("div");
    row.id = rowId;
    row.style = `
      display: flex;
      justify-content: center;
      background-color: ${bgColor};
      padding: 1rem;
      margin-bottom: 1rem;
      border-radius: 0.5rem;
      flex-wrap: wrap;
      gap: 1rem;
      flex-direction: row;
    `;

    const containers = [];

    iframeSources.forEach((src, index) => {
      const container = document.createElement("div");
      container.classList.add("iframe-container");
      container.style = `
        width: 400px;
        min-height: 100px;
        background: white;
        border-radius: 0.25rem;
        overflow: hidden;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;
      `;

      const iframe = document.createElement("iframe");
      iframe.src = src;
      iframe.width = "100%";
      iframe.height = "100";
      iframe.style.border = "none";
      iframe.style.minHeight = "100px";
      iframe.title = `KPI ${index + 1}`;
      iframe.className = "pn-gadget";

      iframe.onload = () => {
        try {
          const estimatedHeight = iframe.contentWindow.document.body.scrollHeight;
          if (estimatedHeight > 100) {
            iframe.style.height = estimatedHeight + "px";
          }
        } catch (e) {
          // Likely due to cross-origin, fallback handled visually
        }
      };

      container.appendChild(iframe);
      containers.push(container);
      row.appendChild(container);
    });

    return row;
  }

  function injectRow() {
    if (document.querySelector(`#${rowId}`)) {
      console.log("ℹ️ Top row already exists.");
      return;
    }

    const portalGrid = document.querySelector("#portalgrid");
    if (!portalGrid) {
      console.warn("❌ #portalgrid not found.");
      return;
    }

    const row = createRow();
    portalGrid.parentNode.insertBefore(row, portalGrid);
    console.log("✅ Custom top row with responsive iframes added.");
  }

  const interval = setInterval(() => {
    const portalGrid = document.querySelector("#portalgrid");
    if (portalGrid) {
      clearInterval(interval);
      injectRow();
    } else {
      console.log("⏳ Waiting for #portalgrid...");
    }
  }, 300);
})();
