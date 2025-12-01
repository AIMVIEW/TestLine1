import https from "https";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).send("LINE webhook online");
  }

  const TOKEN = process.env.LINE_ACCESS_TOKEN;

  const event = req.body.events?.[0];

  if (!event) {
    return res.status(200).send("No event");
  }

  if (event.type === "message") {
    const dataString = JSON.stringify({
      replyToken: event.replyToken,
      messages: [
        { type: "text", text: "Hello, user" },
        { type: "text", text: "May I help you?" },
      ],
    });

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + TOKEN,
    };

    const options = {
      hostname: "api.line.me",
      path: "/v2/bot/message/reply",
      method: "POST",
      headers,
    };

    const request = https.request(options, (r) => {
      r.on("data", (d) => console.log("LINE API:", d.toString()));
    });

    request.on("error", (err) => console.error("ERROR:", err));
    request.write(dataString);
    request.end();
  }

  res.status(200).send("OK");
}