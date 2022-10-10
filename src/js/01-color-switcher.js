const body = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

let colorSwitcher;

startBtn.addEventListener('click', startColorSwitch);
stopBtn.addEventListener('click', stopColorSwitch);


function startColorSwitch(e) {
    colorSwitcher = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    e.target.disabled = true;
    stopBtn.disabled = false;
}

function stopColorSwitch(e) {
    clearInterval(colorSwitcher);
    e.target.disabled = true;
    startBtn.disabled = false;
}