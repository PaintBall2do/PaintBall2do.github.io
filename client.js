const socket = new WebSocket("ws://localhost:3000");
const messageArea = document.getElementById("messageArea");
const textbox = document.getElementById("textbox");

textbox.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && textbox.value.trim() !== "") {
    socket.send(textbox.value);
    textbox.value = "";
  }
});

socket.onmessage = (event) => {
  const message = document.createElement("div");
  message.textContent = event.data;
  messageArea.appendChild(message);
};
