document.addEventListener("DOMContentLoaded", () => {
  const socket = io();
  let timer,
    date = new Date();

  socket.on("start", (time) => {
    date = new Date(new Date().getTime() + parseInt(time, 10));
    startTimer(date);
  });

  socket.on("increase", (time) => {
    date = new Date(date.getTime() + parseInt(time, 10));
    startTimer(date);
  });

  socket.on("decrease", (time) => {
    date = new Date(date.getTime() - parseInt(time, 10));
    startTimer(date);
  });

  function startTimer(date) {
    clearInterval(timer);
    countdown(date);
  }

  function countdown(dateEnd) {
    let hours, minutes, seconds;

    dateEnd = dateEnd.getTime();

    if (isNaN(dateEnd)) {
      return;
    }

    timer = setInterval(calculate, 1000);

    function calculate() {
      var dateStart = new Date();

      var timeRemaining = parseInt((dateEnd - dateStart.getTime()) / 1000);

      if (timeRemaining >= 0) {
        hours = parseInt(timeRemaining / 3600);
        timeRemaining = timeRemaining % 3600;
        minutes = parseInt(timeRemaining / 60);
        timeRemaining = timeRemaining % 60;
        seconds = parseInt(timeRemaining);

        document.getElementById("hours").innerHTML = ("0" + hours).slice(-2);
        document.getElementById("minutes").innerHTML = ("0" + minutes).slice(
          -2
        );
        document.getElementById("seconds").innerHTML = ("0" + seconds).slice(
          -2
        );
      } else {
        return;
      }
    }
  }
});
