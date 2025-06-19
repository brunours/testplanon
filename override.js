(function () {
  const bgColor = "#597FCD";
  const rowId = "custom-top-row-outside";
  const iframeSrc = "/case/BP/UoSA_KPI_number_Heating?IsRunInPortal=true&RenderMode=gadget&ColSpan=false&RowSpan=false";

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
    `;

    const iframeContainer = document.createElement("div");
    iframeContainer.style = `
      width: 400px;
      height: 336px;
      background: white;
      border-radius: 0.25rem;
      overflow: hidden;
    `;

    const iframe = document.createElement("iframe");
    iframe.src = iframeSrc;
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.style.border = "none";
    iframe.title = "KPI - WO/PPM Heating";
    iframe.className = "pn-gadget";

    iframeContainer.appendChild(iframe);
    row.appendChild(iframeContainer);
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
    console.log("✅ Custom top row added outside portal grid.");
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
