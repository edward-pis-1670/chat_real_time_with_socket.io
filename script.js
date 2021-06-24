const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const messageContainer = document.getElementById("message-container");
const socket = io("http://localhost:4000");

const myname = prompt("What is your myname?");
appendMessage("You joined");
socket.emit("new-user", myname);

socket.on("chat-message", (data) => {
  appendMessage(`${data.myname}: ${data.message}`);
});

socket.on("user-connected", (myname) => {
  appendMessage(`${myname} connected`);
});

socket.on("user-disconnected", (myname) => {
  appendMessage(`${myname} disconnected`);
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You:${message}`);
  socket.emit("send-chat-message", message);
  messageInput.value = "";
});

function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerHTML = message;
  messageContainer.append(messageElement);
}
