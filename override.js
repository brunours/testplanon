console.log("🟢 Planon Override JS loaded");

(function waitForGrid() {
    const iframe = document.getElementById("workspaceFrame");
    if (!iframe || !iframe.contentDocument) {
        console.log("⏳ Waiting for workspaceFrame...");
        return setTimeout(waitForGrid, 500);
    }

    const gridRoot = iframe.contentDocument.querySelector("div.grid-stack");
    if (!gridRoot) {
        console.log("⏳ Waiting for grid-stack inside iframe...");
        return setTimeout(waitForGrid, 500);
    }

    console.log("✅ Grid found. Injecting new top row...");

    const rowBgColor = "#e0f7ff"; // Easily change this to update row background color

    const newRow = document.createElement("div");
    newRow.className = "grid-stack-item";
    newRow.style.cssText = `
        height: 350px;
        width: 100%;
        background-color: ${rowBgColor};
        margin-bottom: 10px;
    `;

    newRow.innerHTML = `
        <div class="grid-stack-item-content"
             style="display: flex; justify-content: space-around; align-items: center; height: 100%;">
            <div>🔧 Gadget 1</div>
            <div>📊 Gadget 2</div>
            <div>📁 Gadget 3</div>
            <div>💡 Gadget 4</div>
            <div>🛠 Gadget 5</div>
        </div>
    `;

    gridRoot.prepend(newRow);
})();
