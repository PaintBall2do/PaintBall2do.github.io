const messageArea = document.getElementById("messageArea");
const textbox = document.getElementById("textbox");

// Fetch messages from the server when the page loads
fetch("/messages.json")
  .then(response => response.json())
  .then(data => {
    messageArea.innerHTML = ""; // Clear the area
    data.forEach(message => {
      const div = document.createElement("div");
      div.textContent = message;
      messageArea.appendChild(div);
    });
  });

// Send a new message when Enter is pressed
textbox.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && textbox.value.trim() !== "") {
    const newMessage = textbox.value;
    fetch("/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: newMessage })
    }).then(() => {
      location.reload(); // Refresh the page to load updated messages
    });
    textbox.value = "";
  }
});
