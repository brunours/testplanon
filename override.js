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
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: nowrap;
      overflow-x: auto;
      background-color: ${bgColor};
      padding: 1rem;
      margin-bottom: 1rem;
      border-radius: 0.5rem;
      gap: 1rem;
    `;

    iframeSources.forEach((src, index) => {
      const container = document.createElement("div");
      container.style = `
        flex: 1 1 calc(20% - 0.8rem);
        min-width: 150px;
        height: 120px;
        background: white;
        border-radius: 0.25rem;
        overflow: hidden;
        display: flex;
        align-items: stretch;
      `;

      const iframe = document.createElement("iframe");
      iframe.src = src;
      iframe.width = "100%";
      iframe.height = "100%";
      iframe.style.border = "none";
      iframe.title = `KPI ${index + 1}`;
      iframe.className = "pn-gadget";

      container.appendChild(iframe);
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
    console.log("✅ Responsive justified top row with evenly distributed iframes added.");
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
