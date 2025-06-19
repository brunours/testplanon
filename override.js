window.onload = function () {
    console.log("✅ Planon Override JS loaded");

    const topRowBgColor = "#e8f4ff";

    const interval = setInterval(() => {
        console.log("🔄 Searching for #workspaceframe...");

        const iframe = document.querySelector("iframe#workspaceframe");
        if (!iframe) return console.log("❌ iframe not yet in DOM");

        let iframeDoc = null;
        try {
            iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        } catch (e) {
            console.warn("❌ Access to iframe blocked (cross-origin)");
            clearInterval(interval);
            return;
        }

        if (!iframeDoc || !iframeDoc.body) return console.log("⏳ iframe content not ready");

        const grid = iframeDoc.querySelector("div.grid-stack");
        if (!grid) return console.log("⏳ grid-stack not found in iframe");

        clearInterval(interval);
        console.log("✅ Injecting custom row into iframe");

        // Build top row
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
        console.log("✅ Custom row injected above gadget grid");
    }, 1000);
};
