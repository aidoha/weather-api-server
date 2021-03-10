console.log('====== Client side js');

const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  fetch(
    `http://localhost:3000/weather?address=${encodeURIComponent(
      searchInput.value
    )}`
  )
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        messageOne.textContent = res.error;
      } else {
        messageOne.textContent = res.location;
        messageTwo.textContent = res.forecast;
      }
    })
    .catch((err) => console.error(err));
});
