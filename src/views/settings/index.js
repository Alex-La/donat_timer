document.addEventListener("DOMContentLoaded", () => {
  const socket = io();

  const startBtn = document.getElementById("start");
  const increaseBtn = document.getElementById("increase_btn");
  const decreaseBtn = document.getElementById("decrease_btn");

  startBtn.onclick = () => {
    const time = document.getElementById("time").value;
    socket.emit("start", time);
  };

  increaseBtn.onclick = () => {
    const time = document.getElementById("increase").value;
    socket.emit("increase", time);
  };

  decreaseBtn.onclick = () => {
    const time = document.getElementById("decrease").value;
    socket.emit("decrease", time);
  };
});
