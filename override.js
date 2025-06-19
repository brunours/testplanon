window.onload = function () {
    console.log("Planon Override JS executed");

    const topRowBgColor = "#e8f4ff";

    const interval = setInterval(() => {
        const gadgetGrid = document.querySelector(".grid-stack-items.pss_block.pss_blocktype_details");
        if (gadgetGrid) {
            clearInterval(interval);
            console.log("Gadget container found. Injecting custom row...");

            // Create custom row
            const topRow = document.createElement("div");
            topRow.style.display = "grid";
            topRow.style.gridTemplateColumns = "repeat(5, 1fr)";
            topRow.style.gap = "12px";
            topRow.style.backgroundColor = topRowBgColor;
            topRow.style.padding = "12px";
            topRow.style.borderRadius = "8px";
            topRow.style.marginBottom = "20px";

            // Add mock gadgets
            for (let i = 1; i <= 5; i++) {
                const gadget = document.createElement("div");
                gadget.style.background = "white";
                gadget.style.border = "1px solid #ccc";
                gadget.style.borderRadius = "6px";
                gadget.style.padding = "10px";
                gadget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
                gadget.style.height = "100px";
                gadget.innerHTML = `<strong>Gadget ${i}</strong><br><span>Custom content</span>`;
                topRow.appendChild(gadget);
            }

            // Inject above the real gadget grid
            gadgetGrid.parentNode.insertBefore(topRow, gadgetGrid);
        }
    }, 500);
};
