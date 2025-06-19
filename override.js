window.onload = function () {
    console.log("✅ Planon Override JS loaded");

    const topRowBgColor = "#e8f4ff";

    const interval = setInterval(() => {
        console.log("🔍 Searching for gadget grid...");
        const gadgetGrid = document.querySelector(".grid-stack-items.pss_block.pss_blocktype_details");
        if (gadgetGrid) {
            clearInterval(interval);
            console.log("✅ Gadget container found:", gadgetGrid);

            // Create new row
            const topRow = document.createElement("div");
            topRow.style.display = "grid";
            topRow.style.gridTemplateColumns = "repeat(5, 1fr)";
            topRow.style.gap = "12px";
            topRow.style.backgroundColor = topRowBgColor;
            topRow.style.padding = "12px";
            topRow.style.borderRadius = "8px";
            topRow.style.marginBottom = "20px";

            // Add 5 mock gadgets
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

            // Insert above the main grid
            gadgetGrid.parentNode.insertBefore(topRow, gadgetGrid);
            console.log("✅ Custom row injected");
        }
    }, 1000);
};
