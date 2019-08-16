// const weddingDate = new Date('2020-08-22T16:00:00').getTime();

// const startCountdown = () => {
//     setTimeout(countdown, 0);
// }

// const countdown = () => {
//     console.log("Countdown started");
//     const $days = document.getElementById('timer-days');
//     const $hours = document.getElementById('timer-hours');
//     const $minutes = document.getElementById('timer-minutes');
//     const $seconds = document.getElementById('timer-seconds');

//     let remaining = 1;
//     while(remaining != 0){
//         setTimeout(()=>{
//             // TODO Set the correct values in the fields
//             remaining = weddingDate - new Date().getTime();
//             $days.innerText = Math.floor(remaining / (1000 * 60 * 60 * 24));
//             console.log("tic toc")
//         }, 1000);
//     }
// }