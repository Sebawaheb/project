function addElement() {
    // Get input values
    const elementType = document.getElementById("elementType").value || "div";
    const width = document.getElementById("width").value || "150px";
    const height = document.getElementById("height").value || "150px";
    const content = document.getElementById("content").value;
    const bgColor = document.getElementById("bgColor").value;
    const fontSize = document.getElementById("fontSize").value || "16px";
    const fontColor = document.getElementById("fontColor").value;

    // Create new element
    const newElement = document.createElement(elementType);

    // Set styles
    newElement.style.width = width;
    newElement.style.height = height;
    newElement.style.backgroundColor = bgColor;
    newElement.style.color = fontColor;
    newElement.style.fontSize = fontSize;
    newElement.style.display = "flex";
    newElement.style.alignItems = "center";
    newElement.style.justifyContent = "center";
    newElement.style.margin = "10px";
    newElement.style.borderRadius = "10px";
    newElement.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";

    // Set content
    newElement.innerText = content;

    // Add to display area
    document.getElementById("displayArea").appendChild(newElement);

    // Reset form
    resetForm();
}

function resetForm() {
    // Reset all input fields
    document.getElementById("elementType").value = "";
    document.getElementById("width").value = "";
    document.getElementById("height").value = "";
    document.getElementById("content").value = "";
    document.getElementById("fontSize").value = "";
}

function saveLayout() {
    // Simple alert for now
    alert("Layout saved successfully!");
}