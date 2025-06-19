window.onload = function () {
    console.log("Planon Override JS executed");

    // Configurable background color
    const topRowBgColor = "#e8f4ff";  // Change this to your preferred color

    // Wait for DOM content and gadgets container to load
    const interval = setInterval(() => {
        const mainGrid = document.querySelector('[class*="grid-container"]');
        if (mainGrid) {
            clearInterval(interval);

            // Create top row wrapper
            const topRow = document.createElement("div");
            topRow.style.display = "grid";
            topRow.style.gridTemplateColumns = "repeat(5, 1fr)";
            topRow.style.gap = "12px";
            topRow.style.margin = "0 0 20px 0";
            topRow.style.backgroundColor = topRowBgColor;
            topRow.style.padding = "12px";
            topRow.style.borderRadius = "8px";

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

            // Insert new row at top of main gadget area
            mainGrid.parentNode.insertBefore(topRow, mainGrid);
        }
    }, 500);
};

