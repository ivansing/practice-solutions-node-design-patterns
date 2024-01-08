import zmq from 'zeromq';
import { ZmqMiddlewareManager } from './zmqMiddlewareManager.js';
import { jsonMiddleware } from './jsonMiddleware.js';
import { zlibMiddleware } from './zlibMiddleware.js';

async function main () {
    const socket = new zmq.Reply()
    socket.bind('tcp://127.0.0.1:3000')

    const zmqm = new ZmqMiddlewareManager(socket)
    zmqm.use(zlibMiddleware())
    zmqm.use(jsonMiddleware())
    zmqm.use({
        async inbound (message) {
            console.log('Received:', message)
            if (message.action === 'ping') {
                await this.send({ action: 'pong', echo: message.echo})
            }
            return message
        }
    })

    console.log('Server listening on port 3000')
}

main()