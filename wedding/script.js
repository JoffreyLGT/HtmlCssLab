const startCountdown = () => {
  const $days = document.getElementById("timer-days");
  const $hours = document.getElementById("timer-hours");
  const $minutes = document.getElementById("timer-minutes");
  const $seconds = document.getElementById("timer-seconds");

  const weddingDate = new Date("2020-08-22T16:00:00").getTime();
  const timeRemaining = weddingDate - new Date().getTime();
  let days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  let hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  setInterval(() => {
    if (seconds > 0) {
      seconds--;
    } else if (minutes > 0) {
      seconds = 59;
      minutes--;
    } else if (hours > 0) {
      seconds = 59;
      minutes = 59;
      hours--;
    } else if (days > 0) {
      seconds = 59;
      minutes = 59;
      hours = 23;
      days--;
    }

    $days.innerText = days.toString().padStart(3, "0");
    $hours.innerText = hours.toString().padStart(2, "0");
    $minutes.innerText = minutes.toString().padStart(2, "0");
    $seconds.innerText = seconds.toString().padStart(2, "0");
  }, 1000);
};