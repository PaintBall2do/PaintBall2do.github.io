const userIdElement = document.getElementById("user-id");

async function fetchLatestUserID() {
    try {
        // Replace this URL with the actual API endpoint that provides the most recent Roblox user ID
        const response = await fetch("https://api.roblox.com/latest-user-id");
        const data = await response.json();
        if (data && data.userId) {
            userIdElement.textContent = `User ID: ${data.userId}`;
        } else {
            userIdElement.textContent = "Unable to fetch data.";
        }
    } catch (error) {
        console.error("Error fetching the latest user ID:", error);
        userIdElement.textContent = "Error fetching data.";
    }
}

// Fetch data every 10 seconds
setInterval(fetchLatestUserID, 10000);
fetchLatestUserID();
