import WebSocket, {WebSocketServer} from "ws";

const wss = new WebSocketServer({ port : 9000 });

let clientNumber = 0;

const clientIdSet : Set<string> = new Set<string>();
const clientWsSet : Set<WebSocket> = new Set<WebSocket>();

wss.on('connection', function connection(ws, req) {
    const clientId = 'client ' + ++clientNumber;
    console.log('new client is connected, client id : %s', clientId);

    clientWsSet.add(ws);
    clientIdSet.add(clientId);

    if (clientNumber === 10) {
        console.log('client set is done!');

        // CASE I. 전체 다 연결 해제
        clientWsSet.forEach(wsConn=>{
            wsConn.close(1000, 'close all connections from server!');
        });
        clientWsSet.clear();

        // CASE II. 마지막 놈 하나만 연결 해제.
        // ws.close(1000, 'close all connections from server!');
        // clientWsSet.clear();

    }

    ws.on('message', function message(data) {
        console.log('received from the client: %s %s', clientId, data);
    });

});