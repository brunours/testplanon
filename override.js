window.onload = function () {
    console.log("✅ Planon Override JS loaded");

    const topRowBgColor = "#e8f4ff";
    const iframeId = "workspaceframe";

    const interval = setInterval(() => {
        const iframe = document.getElementById(iframeId);
        if (!iframe) return console.log("⏳ Waiting for iframe...");

        let iframeDoc;
        try {
            iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        } catch (e) {
            return console.warn("❌ Cross-origin access blocked");
        }

        if (!iframeDoc?.body) return console.log("⏳ Waiting for iframe content...");

        const grid = iframeDoc.querySelector("div.grid-stack");
        if (!grid) return console.log("⏳ Waiting for grid-stack...");

        clearInterval(interval);
        console.log("✅ Grid found, injecting custom row");

        const topRow = iframeDoc.createElement("div");
        topRow.style.display = "grid";
        topRow.style.gridTemplateColumns = "repeat(5, 1fr)";
        topRow.style.gap = "12px";
        topRow.style.backgroundColor = topRowBgColor;
        topRow.style.padding = "12px";
        topRow.style.borderRadius = "8px";
        topRow.style.marginBottom = "20px";

        for (let i = 1; i <= 5; i++) {
            const gadget = iframeDoc.createElement("div");
            gadget.style.background = "white";
            gadget.style.border = "1px solid #ccc";
            gadget.style.borderRadius = "6px";
            gadget.style.padding = "10px";
            gadget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
            gadget.style.height = "100px";
            gadget.innerHTML = `<strong>Gadget ${i}</strong><br><span>Custom content</span>`;
            topRow.appendChild(gadget);
        }

        grid.parentNode.insertBefore(topRow, grid);
        console.log("✅ Custom gadget row injected");
    }, 1000);
};
