import WebSocket, {WebSocketServer} from "ws";
import ConnectionCounter from '../domain/ConnectionCounter'

const connectionCounter = ConnectionCounter.getInstance()
const wss = new WebSocketServer({ port : 9000 });
const wsConnectionSet : Set<WebSocket> = new Set();

wss.on('connection', function connection(ws, req) {
    wsConnectionSet.add(ws)
    connectionCounter.incr()
    console.log(`Server connection is success: ${connectionCounter.connectionCount}`)

    if (connectionCounter.connectionCount >= 20_000) {
        wsConnectionSet.forEach(()=> ws.send("I'm from server"))
        console.log(`connection size : ${wsConnectionSet.size}`)
    }
})


