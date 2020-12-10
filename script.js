let colors = document.querySelectorAll(".input-color-value");
let incrementValues = document.querySelectorAll(".input-increment-value");
let startStopButton = document.querySelector(".start-stop-button")
let resetButton = document.querySelector(".reset-button")
let preview = document.querySelector(".preview-element") 
let isActive = false;

function toggleButton() {
    isActive === true ? startStopButton.textContent = "stop" : startStopButton.textContent = "start";
}

function incrementColors() {
    for(let i = 0; i < colors.length; i++) {
        Number(colors[i].value) + Number(incrementValues[i].value) <= 255 ? colors[i].value = Number(colors[i].value) + Number(incrementValues[i].value) : colors[i].value = 255;  
    }
}

startStopButton.addEventListener("click", () => {
    isActive = !isActive;
    toggleButton();
    preview.style.backgroundColor = `rgb(${colors[0].value}, ${colors[1].value}, ${colors[2].value})`;


    let interval = setInterval(function() {
        if (isActive === false || (colors[0].value === 255 && colors[1].value === 255 && colors[2].value === 255)) {
            clearInterval(interval)
        } 
        
        incrementColors();
        preview.style.backgroundColor = `rgb(${colors[0].value}, ${colors[1].value}, ${colors[2].value})`;
    }, 25)
})

resetButton.addEventListener("click", () => {
    colors.forEach(element => element.value = 0)
    preview.style.backgroundColor = `rgb(${colors[0].value}, ${colors[1].value}, ${colors[2].value})`;
})