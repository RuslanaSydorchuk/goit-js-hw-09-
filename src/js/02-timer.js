import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

let selectedDate;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);

      selectedDate = selectedDates[0];

      if (selectedDate < options.defaultDate) {
        startBtn.disabled = true;
        Notiflix.Notify.failure("Please choose a date in the future");
        } else {
        startBtn.disabled = false;
        }
  },
};

flatpickr("#datetime-picker", options);


startBtn.addEventListener('click', handleStartCountdown);

function handleStartCountdown(e) {
    let timeLeft = selectedDate - options.defaultDate;

    showTimeLeft(timeLeft);

    const countdown = setInterval(() => {
        timeLeft -= 1000;
        showTimeLeft(timeLeft);

        if (timeLeft < 1000) {
          clearInterval(countdown);
        }
    }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;


  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

function showTimeLeft(timeLeft) {
    const daysLeft = convertMs(timeLeft).days;
    const hoursLeft = convertMs(timeLeft).hours;
    const minutesLeft = convertMs(timeLeft).minutes;
    const secondsLeft = convertMs(timeLeft).seconds;

    days.textContent = addLeadingZero(daysLeft);
    hours.textContent = addLeadingZero(hoursLeft);
    minutes.textContent = addLeadingZero(minutesLeft);
    seconds.textContent = addLeadingZero(secondsLeft);
}
