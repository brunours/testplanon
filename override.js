(function () {
    const rowColor = "#597FCD"; // Visible blue
    const maxGadgets = 5;

    function createCustomGadget(index) {
        const gadget = document.createElement("div");
        gadget.className = "grid-stack-item pss_block pss_blocktype_details pss_blockname_iframe";
        gadget.setAttribute("gs-x", index); // Position in row
        gadget.setAttribute("gs-y", 0); // First row
        gadget.setAttribute("gs-width", 1);
        gadget.setAttribute("gs-height", 1);
        gadget.style.backgroundColor = rowColor;

        const content = document.createElement("div");
        content.className = "grid-stack-item-content";
        content.style.color = "#fff";
        content.style.display = "flex";
        content.style.alignItems = "center";
        content.style.justifyContent = "center";
        content.style.height = "100%";
        content.style.fontWeight = "bold";
        content.innerText = `Custom ${index + 1}`;

        gadget.appendChild(content);
        return gadget;
    }

    function insertCustomRow() {
        const grid = document.querySelector("#portalgrid > div");
        if (!grid) {
            console.warn("⚠️ Grid container not found.");
            return;
        }

        for (let i = 0; i < maxGadgets; i++) {
            const gadget = createCustomGadget(i);
            grid.insertBefore(gadget, grid.firstChild); // Add at the top
        }

        console.log("✅ Custom top row added.");
    }

    // Retry logic to ensure DOM is ready
    const interval = setInterval(() => {
        const grid = document.querySelector("#portalgrid > div");
        if (grid) {
            clearInterval(interval);
            insertCustomRow();
        }
    }, 500);
})();
