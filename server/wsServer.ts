import WebSocket, {WebSocketServer} from "ws";
import ConnectionCounter from '../domain/ConnectionCounter'

const connectionCounter = ConnectionCounter.getInstance()
const wss = new WebSocketServer({ port : 9000 });


wss.on('connection', function connection(ws, req) {
    connectionCounter.incr()
    console.log(`Server connection is success: ${connectionCounter.connectionCount}`)
})

