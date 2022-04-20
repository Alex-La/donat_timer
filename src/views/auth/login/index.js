const login = document.getElementById("login");
const password = document.getElementById("password");
const alertNode = document.getElementById("alert");

login.onfocus = () => alertNode.remove();
password.onfocus = () => alertNode.remove();
