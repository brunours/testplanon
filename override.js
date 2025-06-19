window.onload = function () {
    console.log("✅ Planon Override JS loaded");

    const topRowBgColor = "#e8f4ff";
    //const iframeId = "frame-BP_CP_Homepage_SYS_BBG_PortalPage_BB_iframe5"; // adjust if needed
    const iframeId = "workspaceframe";

    const interval = setInterval(() => {
        const iframe = document.getElementById(iframeId);
        if (!iframe) {
            console.log("⏳ Waiting for iframe...");
            return;
        }

        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!iframeDoc || !iframeDoc.body) {
            console.log("⏳ Waiting for iframe content...");
            return;
        }

        clearInterval(interval);
        console.log("✅ Iframe and content found");

        // Inject into iframe body or specific wrapper
        const target = iframeDoc.body;

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

        target.insertBefore(topRow, target.firstChild);
        console.log("✅ Custom row injected into iframe");
    }, 1000);
};
