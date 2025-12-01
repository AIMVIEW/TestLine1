export default function handler(req, res) {
  if (req.method === "POST") {
    const TOKEN = process.env.LINE_ACCESS_TOKEN;

    if (req.body.events?.[0]?.type === "message") {
      const https = require("https");

      const dataString = JSON.stringify({
        replyToken: req.body.events[0].replyToken,
        messages: [
          { type: "text", text: "Hello, user" },
          { type: "text", text: "May I help you?" },
        ],
      });

      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + TOKEN,
      };

      const webhookOptions = {
        hostname: "api.line.me",
        path: "/v2/bot/message/reply",
        method: "POST",
        headers: headers,
      };

      const request = https.request(webhookOptions, (r) => {
        r.on("data", (d) => console.log("LINE API:", d.toString()));
      });

      request.on("error", (err) => console.error("Error:", err));

      request.write(dataString);
      request.end();
    }

    res.status(200).send("OK");
  } else {
    res.status(200).send("LINE Webhook running");
  }
}