window.onload = function () {
    console.log("✅ Planon Override JS loaded");

    const topRowBgColor = "#e8f4ff";

    const interval = setInterval(() => {
        console.log("🔄 Interval running...");

        const allDivs = document.querySelectorAll("div");
        console.log("📦 Total <div> count:", allDivs.length);

        const matching = [...allDivs].filter(el =>
            el.className?.includes("grid-stack-items") &&
            el.className?.includes("pss_block") &&
            el.className?.includes("pss_blocktype_details")
        );

        console.log("🔍 Matching divs found:", matching.length);
        if (matching.length > 0) {
            clearInterval(interval);
            const gadgetGrid = matching[0];
            console.log("✅ Found target grid:", gadgetGrid);

            // Create top row
            const topRow = document.createElement("div");
            topRow.style.display = "grid";
            topRow.style.gridTemplateColumns = "repeat(5, 1fr)";
            topRow.style.gap = "12px";
            topRow.style.backgroundColor = topRowBgColor;
            topRow.style.padding = "12px";
            topRow.style.borderRadius = "8px";
            topRow.style.marginBottom = "20px";

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

            gadgetGrid.parentNode.insertBefore(topRow, gadgetGrid);
            console.log("✅ Custom row inserted above gadget grid");
        }
    }, 1000);
};
