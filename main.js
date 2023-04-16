function NewPage() {
    var list = document.getElementById("textarea").value.split("\n");

    // remove all images
    var imgarea = document.getElementById("imgarea");
    while (imgarea.firstChild) {
        imgarea.removeChild(imgarea.firstChild);
    }
    document.getElementById("showURLs").value = "";

    if (document.getElementById("useRegex").checked) {
        var min = parseInt(document.getElementById("min").value);
        var maxloop = parseInt(document.getElementById("max").value);
        var step = parseInt(document.getElementById("step").value);
        var isAddLeadingZero = document.getElementById("isAddLeadingZero").checked;
        var numberOfWidth = parseInt(document.getElementById("numberWidth").value);

        for (var j = min; j <= maxloop; j += step) {
            var replaceNumberString = j + "";
            if (isAddLeadingZero) {
                replaceNumberString = addLeadingZeros(replaceNumberString, numberOfWidth);
            }

            var oneUrl = list[0].replace("*", replaceNumberString);
            var imgs = document.createElement("img");
            imgs.src = oneUrl;
            imgs.alt = oneUrl;
            // add image url to textarea if loaded, then sort
            imgs.addEventListener("load", function () {
                var text = document.getElementById("showURLs").value;
                if (text) text += "\n";
                text += this.src;
                document.getElementById("showURLs").value = text.split("\n").sort().join("\n");
            });
            // remove element if image load failed
            imgs.addEventListener("error", function () {
                this.remove();
            });
            imgarea.appendChild(imgs);
        }
    } else {
        for (var i = 0; i <= list.length - 1; i++) {
            var imgs = document.createElement("img");
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
