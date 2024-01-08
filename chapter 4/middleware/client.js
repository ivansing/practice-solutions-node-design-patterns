import zmq from "zeromq";
import { ZmqMiddlewareManager } from "./zmqMiddlewareManager.js";
import { jsonMiddleware } from "./jsonMiddleware.js";
import { zlibMiddleware } from "./zlibMiddleware.js";

async function main() {
  const socket = new zmq.Request();
  await socket.bind("tcp://127.0.0.1:3001");

  const zmqm = new ZmqMiddlewareManager(socket);
  zmqm.use(zlibMiddleware());
  zmqm.use(jsonMiddleware());
  zmqm.use({
    inbound(message) {
      console.log("Echoed back", message);
      return message;
    },
  });

  setInterval(() => {
    zmqm
      .send(JSON.stringify({ action: "ping", echo: Date.now() }))
      .catch((err) => console.error(err));
  }, 1000);

  console.log("Client listening on port 3001");
}

main();
