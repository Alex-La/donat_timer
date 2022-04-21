document.addEventListener("DOMContentLoaded", () => {
  const socket = io();
  let date = new Date();
  const timerObject = { timer: undefined };

  socket.on("lastSessionTime", (lastDate) => {
    date = new Date(lastDate);
    startTimer(date, timerObject);
  });

  socket.on("start", (time) => {
    date = new Date(new Date().getTime() + parseInt(time, 10));
    startTimer(date, timerObject);
  });

  socket.on("increase", (time) => {
    date = new Date(date.getTime() + parseInt(time, 10));
    startTimer(date, timerObject);
  });

  socket.on("decrease", (time) => {
    date = new Date(date.getTime() - parseInt(time, 10));
    startTimer(date, timerObject);
  });

  window.onbeforeunload = () => {
    socket.emit("disconnection", date);
  };
});

function startTimer(date, timerObject) {
  clearInterval(timerObject.timer);
  countdown(date, timerObject);
}

//Timer logic
function countdown(dateEnd, timerObject) {
  hours, minutes, seconds;

  dateEnd = dateEnd.getTime();

  if (isNaN(dateEnd)) {
    return;
  }

  timerObject.timer = setInterval(calculate, 1000);

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
      document.getElementById("minutes").innerHTML = ("0" + minutes).slice(-2);
      document.getElementById("seconds").innerHTML = ("0" + seconds).slice(-2);
    } else {
      return;
    }
  }
}
