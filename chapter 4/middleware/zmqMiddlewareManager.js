export class ZmqMiddlewareManager {
  constructor(socket) {
    this.socket = socket;
    this.inboundMiddleware = [];
    this.outboundMiddleware = [];
    this.sendPromise = Promise.resolve() // Initiliaze qith resolved promise

    
        this.handleIncomingMessages().catch((err) => console.error(err));
     
  }

  async handleIncomingMessages() {
    for await (const [message] of this.socket) {
      await this.executeMiddleware(this.inboundMiddleware, message).catch(
        (err) => {
          console.error("Error while processing message", err);
        }
      );
    }
  }

  async send (message) {
    this.sendPromise = this.sendPromise.then(async () => {
        const finalMessage = await this.executeMiddleware( 
            this.outboundMiddleware,
            message
        )
        await this.socket.send(finalMessage)
    })
    return this.sendPromise
  }

  use (middleware) {
    if (middleware.inbound) {
        this.inboundMiddleware.push(middleware.inbound)
    }
    if (middleware.outbound) {
        this.outboundMiddleware.unshift(middleware.outbound)
    }
  }

  async executeMiddleware (middlewares, initialMessage) {
    let message = initialMessage 
    for await (const middlewareFunc of middlewares) {
        message = await middlewareFunc.call(message)
    }
    return message
  }
}
