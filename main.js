function NewPage() {
    const list = document.getElementById("textarea").value.split("\n");
    const useRegex = document.getElementById("useRegex").checked;
    const imgarea = document.getElementById("imgarea");
    const showURLs = document.getElementById("showURLs");

    // remove all images and clear showURLs
    imgarea.innerHTML = "";
    showURLs.value = "";

    if (useRegex) {
        const min = parseInt(document.getElementById("min").value);
        const maxloop = parseInt(document.getElementById("max").value);
        const step = parseInt(document.getElementById("step").value);
        const isAddLeadingZero = document.getElementById("isAddLeadingZero").checked;
        const numberOfWidth = parseInt(document.getElementById("numberWidth").value);

        for (let j = min; j <= maxloop; j += step) {
            let replaceNumberString = j + "";
            if (isAddLeadingZero) {
                replaceNumberString = addLeadingZeros(replaceNumberString, numberOfWidth);
            }

            const oneUrl = list[0].replace("*", replaceNumberString);
            let imgs = document.createElement("img");
            imgs.src = oneUrl;
            imgs.alt = oneUrl;
            // add image url to textarea if loaded, then sort
            imgs.addEventListener("load", function () {
                let text = showURLs.value;
                if (text) text += "\n";
                text += this.src;
                showURLs.value = text.split("\n").sort().join("\n");
            });
            // remove element if image load failed
            imgs.addEventListener("error", function () {
                this.remove();
            });
            imgarea.appendChild(imgs);
        }
    } else {
        for (let i = 0; i < list.length; i++) {
            let imgs = document.createElement("img");
            imgs.src = list[i];
            imgs.alt = list[i];
            // remove element if image load failed
            imgs.addEventListener("error", function () {
                this.remove();
                showErrorMessage("Image failed load.");
            });
            imgarea.appendChild(imgs);
        }
    }
}

function enableElement(elementId, isEnabled) {
    document.getElementById(elementId).disabled = !isEnabled;
}

function showElement(elementId, isVisible) {
    document.getElementById(elementId).style.visibility = isVisible ? "visible" : "hidden";
}

function check() {
    const useRegex = document.getElementById("useRegex").checked;
    enableElement("min", useRegex);
    enableElement("max", useRegex);
    enableElement("step", useRegex);
    enableElement("isAddLeadingZero", useRegex);
    showElement("AllUrls", useRegex);
    showElement("showURLs", useRegex);
}

function checkAddLeadingZero() {
    const isAddLeadingZero = document.getElementById("isAddLeadingZero");
    const numberWidth = document.getElementById("numberWidth");
    numberWidth.disabled = !isAddLeadingZero.checked;
}

function showErrorMessage(message) {
    const imgarea = document.getElementById("imgarea");
    const errorText = document.createElement("span");
    errorText.style.color = "red";
    errorText.textContent = message;
    imgarea.appendChild(errorText);
}

function addLeadingZeros(str, width) {
    const zerosToAdd = width - str.length;
    return zerosToAdd > 0 ? "0".repeat(zerosToAdd) + str : str;
}
