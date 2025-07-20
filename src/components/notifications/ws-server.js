const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 4000 });

wss.on("connection", function connection(ws) {
  // Send a test notification every 5 seconds
  setInterval(() => {
    ws.send(
      JSON.stringify({
        id: Date.now().toString(),
        message: "Test Notification!",
        url: "https://example.com",
      }),
    );
  }, 5000);
});

console.log("WebSocket server running on ws://localhost:4000");
