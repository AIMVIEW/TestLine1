// api/webhook.js

export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).send("Webhook online");
  }

  if (req.method === "POST") {
    console.log("POST received:", req.body);
    return res.status(200).send("OK");
  }

  return res.status(405).send("Method not allowed");
}
