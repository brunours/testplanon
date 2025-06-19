(function () {
  const bgColor = "#597FCD";
  const rowId = "custom-top-row-outside";

  // Define up to 5 unique src values
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
    `;

    iframeSources.forEach((src, index) => {
      const container = document.createElement("div");
      container.style = `
        width: 400px;
        height: 100px;
        background: white;
        border-radius: 0.25rem;
        overflow: hidden;
        flex-shrink: 0;
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
    console.log("✅ Custom top row with multiple iframes added.");
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
