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

function check() {
    if (document.getElementById("useRegex").checked) {
        document.getElementById("min").disabled = false;
        document.getElementById("max").disabled = false;
        document.getElementById("step").disabled = false;
        document.getElementById("isAddLeadingZero").disabled = false;
        document.getElementById("AllUrls").style.visibility = "visible";
        document.getElementById("showURLs").style.visibility = "visible";
    } else {
        document.getElementById("min").disabled = true;
        document.getElementById("max").disabled = true;
        document.getElementById("step").disabled = true;
        document.getElementById("isAddLeadingZero").disabled = true;
        document.getElementById("AllUrls").style.visibility = "hidden";
        document.getElementById("showURLs").style.visibility = "hidden";
    }
}

function checkAddLeadingZero() {
    if (document.getElementById("isAddLeadingZero").checked) {
        document.getElementById("numberWidth").disabled = false;
    } else {
        document.getElementById("numberWidth").disabled = true;
    }
}

function showErrorMessage(message) {
    var imgarea = document.getElementById("imgarea");
    var spans = document.createElement("span");
    var text = document.createTextNode(message);
    spans.style = "color: red;";
    spans.appendChild(text);
    imgarea.appendChild(spans);
}

function addLeadingZeros(str, width) {
    if (str.length < width) {
        str = "0".repeat(width - str.length) + str;
    }
    return str;
}
