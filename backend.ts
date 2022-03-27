//Database
import { rtdb } from "./init-db";
//Database
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

function listenPort() {
  app.listen(3000, () => {
    console.log("Escuchando puerto 3000");
  });
}

function getChatData() {
  app.get("/messages", (req, res) => {
    const chatRef = rtdb.ref("/chat/messages");

    chatRef.on("value", (snapshot) => {
      const value = snapshot.val();
      res.json({ messages: value });
      console.log(value);
    });
  });
}

function setMessages() {
  app.post("/messages", (req, res) => {
    console.log("BODY", req.body);
    const message = req.body;

    const chatRef = rtdb.ref("/chat/messages");
    chatRef.push(message).then(() => {
      res.json({ message: "setted" });
    });
  });
}

function main() {
  listenPort();
  getChatData();
  setMessages();
}
main();
