(function () {
  const bgColor = "#597FCD";
  const row1Id = "custom-top-row-outside";
  const row2Id = "custom-second-row-outside"; 

  const iframeSources1 = [
    "/case/BP/UoSA_KPI_number_WOs_Late_vignette?IsRunInPortal=true&RenderMode=gadget&ColSpan=false&RowSpan=false",
    "/case/BP/UoSA_KPI_number_PPMs_Late_vignette?IsRunInPortal=true&RenderMode=gadget&ColSpan=false&RowSpan=false",
    "/case/BP/UoSA_KPI_Number_ContractorsOnSite_vignette?IsRunInPortal=true&RenderMode=gadget&ColSpan=false&RowSpan=false",
    "/case/BP/UoSA_KPI_Number_ContractorsOnSite_Late_vignette?IsRunInPortal=true&RenderMode=gadget&ColSpan=false&RowSpan=false"
  ];

  const iframeSources2 = [
    "/case/BP/UoSA_KPI_List_WOs_Late?IsRunInPortal=true&RenderMode=gadget&ColSpan=false&RowSpan=false",
    "/case/BP/UoSA_KPI_List_PPMs_Late?IsRunInPortal=true&RenderMode=gadget&ColSpan=false&RowSpan=false",
    "/case/BP/UoSA_KPI_List_ContractorsOnSite?IsRunInPortal=true&RenderMode=gadget&ColSpan=false&RowSpan=false",
    // Add more URLs as needed
  ];

  function modifyGridbodyTop() {
    const gridbody = document.querySelector("#gridbody");
    if (gridbody) {
      gridbody.style.top = "10px";
      console.log("✅ Gridbody top modified to 10px");
    } else {
      console.warn("❌ #gridbody not found.");
    }
  }  
  function createRow(rowId, sources, height) {
    const row = document.createElement("div");
    row.id = rowId;
    row.style = `
      display: flex;
      flex-direction: row;
      justify-content: ${rowId === row1Id ? 'center' : 'space-between'};
      flex-wrap: nowrap;
      overflow-x: auto;
      /* background-color: ${bgColor}; */
      padding: ${rowId === row1Id ? '1rem' : '0'};
      margin-bottom: ${rowId === row1Id ? '1rem' : '0'};
      border-radius: 0.5rem;
      gap: 1rem;
    `;

    sources.forEach((src, index) => {
      const container = document.createElement("div");

      if (rowId === row1Id) {
        container.style = `
          flex: 1 1 150px;
          min-width: 150px;
          max-width: 200px;
          height: ${height}px;
          background: white;
          border-radius: 0.25rem;
          overflow: hidden;
          display: flex;
          align-items: stretch;
        `;
      } else {
      container.style = `
        flex: 1 1 calc(20% - 0.8rem);
        min-width: 150px;
        height: ${height}px;
        background: white;
        border-radius: 0.25rem;
        overflow: hidden;
        display: flex;
        align-items: stretch;
      `;
      }

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

  function injectRows() {
    const portalGrid = document.querySelector("#portalgrid");
    if (!portalGrid) {
      console.warn("❌ #portalgrid not found.");
      return;
    }

    // Inject first row (120px)
    if (!document.querySelector(`#${row1Id}`)) {
      const row1 = createRow(row1Id, iframeSources1, 120);
      portalGrid.parentNode.insertBefore(row1, portalGrid);
      console.log("✅ First row (120px) added.");
    } else {
      console.log("ℹ️ First row already exists.");
    }

    // Inject second row (400px)
    if (!document.querySelector(`#${row2Id}`)) {
      const row2 = createRow(row2Id, iframeSources2, 400);
      portalGrid.parentNode.insertBefore(row2, portalGrid);
      console.log("✅ Second row (400px) added.");
    } else {
      console.log("ℹ️ Second row already exists.");
    }

    // Modify gridbody top position
    modifyGridbodyTop();
  }

  const interval = setInterval(() => {
    const portalGrid = document.querySelector("#portalgrid");
    if (portalGrid) {
      clearInterval(interval);
      injectRows();
    } else {
      console.log("⏳ Waiting for #portalgrid...");
    }
  }, 300);
})();

