import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const delayEl = document.querySelector('[name="delay"]');
const stepEl = document.querySelector('[name="step"]');
const amountEl = document.querySelector('[name="amount"]');

form.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
    return Promise.resolve({
      position: position,
      delay: delay,
    });
  } else {
    // Reject
    return Promise.reject({
      position: position,
      delay: delay,
    });
  }
}

function onFormSubmit(e) {
  e.preventDefault();

  const DELAY = Number(delayEl.value);
  const INTERVAL = Number(stepEl.value);
  const AMOUNT = Number(amountEl.value);

  let position = 0;
  let delay = DELAY;

  setTimeout(() => {
    const intervalId = setInterval(() => {
      position += 1;
      
        
      createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      })
      
      delay += INTERVAL;
      
        if (position === AMOUNT) {
          clearInterval(intervalId);
        }
      
    }, INTERVAL);
  }, DELAY);
}