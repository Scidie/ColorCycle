let colors = document.querySelectorAll(".input-color-value");
let incrementValues = document.querySelectorAll(".input-increment-value");
let startStopButton = document.querySelector(".start-stop-button")
let resetButton = document.querySelector(".reset-button")
let preview = document.querySelector(".preview-element") 

let isActive = false;
let length = colors.length;

function createArrayFromInputs() {
    let array = []
    for (let i = 0; i < length; i++) {
        array[i] = colors[i].value;
    }
    return array;
}

function incrementArray(array) {
    let incrementedArray = [];
    for (let i = 0; i < length; i++) {
        if ((Number(array[i]) + Number(incrementValues[i].value)) <= 255) {
            incrementedArray.push(Number(array[i]) + Number(incrementValues[i].value))
        } else if ((Number(array[i]) + Number(incrementValues[i].value)) >= 255) {
            incrementedArray.push(255)
        } 
    }
    return incrementedArray;
}

function formatToCss(array) {
    return `rgb(${array[0]}, ${array[1]}, ${array[2]})`;
}

function updateInputs(array) {
    for (let i = 0; i < length; i++) {
        colors[i].value = array[i];
    }
}

function resetAll() {
    for (let i = 0; i < length; i++) {
        colors[i].value = 0;
        incrementValues[i].value = 1;
    }
}

function limitReached(array) {
    if(array[0] === 255 && array[1] === 255 && array[2] === 255) {
        return true;
    } else return false;
}

function toggleButton() {
    if(isActive === true) {
        startStopButton.textContent = "stop";
    } else {
        startStopButton.textContent = "start";
    }
}

startStopButton.addEventListener("click", () => {
    isActive = !isActive;
    toggleButton();
    let arrayOfColors = createArrayFromInputs();
    preview.style.backgroundColor = formatToCss(arrayOfColors);

    let interval = setInterval(function() {
        if (isActive === false || limitReached(arrayOfColors) === true) {
            clearInterval(interval)
        } 

        arrayOfColors = incrementArray(arrayOfColors);
        updateInputs(arrayOfColors);
        preview.style.backgroundColor = formatToCss(arrayOfColors);
    }, 25)
})

resetButton.addEventListener("click", () => {
    resetAll()
    let arrayOfColors = createArrayFromInputs();
    preview.style.backgroundColor = formatToCss(arrayOfColors);
})


