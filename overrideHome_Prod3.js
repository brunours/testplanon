/**
 * Planon Dashboard Custom KPI Row Injection Script
 * 
 * This script dynamically injects two custom rows of KPI gadgets above the main 
 * portal grid in Planon Cloud. It waits for the DOM to load, then creates:
 * - Row 1: Compact KPI vignettes (120px height) showing summary statistics
 * - Row 2: Detailed KPI lists (400px height) displaying full data tables
 * 
 * The script uses iframes to embed Planon reporting gadgets and adjusts the main
 * grid layout to accommodate the new rows.
 */

(function () {
  // ============================================================================
  // CONFIGURATION CONSTANTS
  // ============================================================================
  
  /** Background color for custom rows (currently commented out in styling) */
  const bgColor = "#597FCD";
  
  /** DOM ID for the first custom row containing compact KPI vignettes */
  const row1Id = "custom-top-row-outside";
  
  /** DOM ID for the second custom row containing detailed KPI lists */
  const row2Id = "custom-second-row-outside"; 

  /**
   * URLs for Row 1: Compact KPI vignettes (summary metrics)
   * These display high-level statistics:
   * - Number of late Work Orders
   * - Number of late PPMs (Planned Preventive Maintenance)
   * - Number of contractors currently on site
   * - Number of contractors on site who are late
   */
  const iframeSources1 = [
    "/case/BP/UoSA_KPI_number_WOs_Late_vignette?IsRunInPortal=true&RenderMode=gadget&ColSpan=false&RowSpan=false",
    "/case/BP/UoSA_KPI_number_PPMs_Late_vignette?IsRunInPortal=true&RenderMode=gadget&ColSpan=false&RowSpan=false",
    "/case/BP/UoSA_KPI_Number_ContractorsOnSite_vignette?IsRunInPortal=true&RenderMode=gadget&ColSpan=false&RowSpan=false",
    "/case/BP/UoSA_KPI_Number_ContractorsOnSite_Late_vignette?IsRunInPortal=true&RenderMode=gadget&ColSpan=false&RowSpan=false"
  ];

  /**
   * URLs for Row 2: Detailed KPI lists (full data tables)
   * These display detailed lists with complete information:
   * - List view of all late Work Orders
   * - List view of all late PPMs
   * - List view of all contractors currently on site
   */
  const iframeSources2 = [
    "/case/BP/UoSA_KPI_List_WOs_Late?IsRunInPortal=true&RenderMode=gadget&ColSpan=false&RowSpan=false",
    "/case/BP/UoSA_KPI_List_PPMs_Late?IsRunInPortal=true&RenderMode=gadget&ColSpan=false&RowSpan=false",
    "/case/BP/UoSA_KPI_List_ContractorsOnSite?IsRunInPortal=true&RenderMode=gadget&ColSpan=false&RowSpan=false",
    // Add more URLs as needed
  ];

  // ============================================================================
  // LAYOUT ADJUSTMENT FUNCTIONS
  // ============================================================================

  /**
   * Modifies the main portal gridbody to make room for custom rows above it.
   * Pushes the grid down by 10px and adjusts its height accordingly.
   * 
   * @returns {void}
   */
  function modifyGridbodyTop() {
    const gridbody = document.querySelector("#gridbody");
    if (gridbody) {
      // Move the main grid down to accommodate custom rows
      gridbody.style.top = "10px";
      // Reduce height by the same amount to maintain full viewport coverage
      gridbody.style.height = "calc(100% - 10px)";
      console.log("✅ Gridbody top modified to 10px");
    } else {
      console.warn("❌ #gridbody not found.");
    }
  }  
  
  /**
   * Creates a custom row containing multiple iframe-based KPI gadgets.
   * Applies responsive flexbox layout with different sizing for compact vs. wide gadgets.
   * 
   * @param {string} rowId - Unique identifier for the row element
   * @param {string[]} sources - Array of iframe source URLs for KPI gadgets
   * @param {number} height - Height in pixels for all iframes in this row
   * @returns {HTMLDivElement} The constructed row element with embedded iframes
   */
  function createRow(rowId, sources, height) {
    // Create the row container element
    const row = document.createElement("div");
    row.id = rowId;
    
    // Apply flexbox styling for responsive layout
    // Row 1 uses centered alignment (for compact vignettes)
    // Row 2 uses space-between alignment (for wider list views)
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

    // Create an iframe container for each KPI gadget URL
    sources.forEach((src, index) => {
      const container = document.createElement("div");

      // Apply different sizing rules based on which row this is
      if (rowId === row1Id) {
        // Row 1: Compact vignettes with fixed width range (150-200px)
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
        // Row 2: Wider containers for data tables (20% width each, min 150px)
        // Allows for more horizontal space to display tabular data
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

      // Create the iframe element that will load the KPI gadget
      const iframe = document.createElement("iframe");
      iframe.src = src;
      iframe.width = "100%";
      iframe.height = "100%";
      iframe.style.border = "none";
      iframe.title = `KPI ${index + 1}`;
      iframe.className = "pn-gadget"; // Planon-specific class for styling consistency

      // Nest iframe inside container, then add container to row
      container.appendChild(iframe);
      row.appendChild(container);
    });

    return row;
  }

  // ============================================================================
  // INJECTION LOGIC
  // ============================================================================

  /**
   * Injects the custom KPI rows into the DOM above the main portal grid.
   * 
   * Process:
   * 1. Locates the #portalgrid element
   * 2. Checks if rows already exist (prevents duplicate injection)
   * 3. Creates and inserts both rows with their respective heights
   * 4. Modifies the main gridbody positioning to accommodate new rows
   * 
   * @returns {void}
   */
  function injectRows() {
    const portalGrid = document.querySelector("#portalgrid");
    if (!portalGrid) {
      console.warn("❌ #portalgrid not found.");
      return;
    }

    // Inject first row (120px height) - Compact KPI vignettes
    if (!document.querySelector(`#${row1Id}`)) {
      const row1 = createRow(row1Id, iframeSources1, 120);
      // Insert before the portal grid (makes it appear above)
      portalGrid.parentNode.insertBefore(row1, portalGrid);
      console.log("✅ First row (120px) added.");
    } else {
      console.log("ℹ️ First row already exists.");
    }

    // Inject second row (400px height) - Detailed KPI lists
    if (!document.querySelector(`#${row2Id}`)) {
      const row2 = createRow(row2Id, iframeSources2, 400);
      // Insert before the portal grid (makes it appear above)
      portalGrid.parentNode.insertBefore(row2, portalGrid);
      console.log("✅ Second row (400px) added.");
    } else {
      console.log("ℹ️ Second row already exists.");
    }

    // Adjust the main portal grid layout to accommodate the new rows
    modifyGridbodyTop();
  }

  // ============================================================================
  // INITIALIZATION - DOM POLLING
  // ============================================================================

  /**
   * Poll for the #portalgrid element to become available in the DOM.
   * Once found, inject the custom KPI rows and stop polling.
   * 
   * This approach ensures the script works regardless of when it executes
   * relative to the page's DOM loading lifecycle.
   * 
   * Checks every 300ms until the target element is present.
   */
  const interval = setInterval(() => {
    const portalGrid = document.querySelector("#portalgrid");
    if (portalGrid) {
      clearInterval(interval); // Stop polling
      injectRows(); // Execute the row injection
    } else {
      console.log("⏳ Waiting for #portalgrid...");
    }
  }, 300); // Check every 300 milliseconds
})();
