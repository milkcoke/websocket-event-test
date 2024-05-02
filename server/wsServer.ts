import WebSocket, {WebSocketServer} from "ws";
import {waitSeconds} from "../utils/stopwatch";
import {errLogger} from "../utils/logger";

const wss = new WebSocketServer({ port : 9000 });

let clientNumber = 0;

const clientIdSet : Set<string> = new Set<string>();

wss.on('connection', function connection(ws, req) {
    const clientId = 'client ' + ++clientNumber;
    console.log('new client is connected, client id : %s', clientId);

    clientIdSet.add(clientId);

    if (wss.clients.size === 10) {
        console.log('client set is done!');


        // CASE I. 전체 다 연결 해제
        wss.clients.forEach(wsConn=>{
            wsConn.close(1000, 'close all connections from server!');
        });
        // clientWsSet.clear();

        // CASE II. 마지막 놈 하나만 연결 해제.
        // ws.close(1000, 'close all connections from server!');

        // 반드시 모든 이벤트 리스너를 수동으로 제거해줘야함.
        // 더해진 리스너들은 엘리먼트에 남아있다 지워지기 전까지 수동으로, 모던 브라우저 내에서

        // wss.clients.forEach(wsConn=>wsConn.send('msgggggg'));
        // wss.clients.forEach(wsConn=>wsConn.close(1000, 'server normal finish'));

        // wss.clients.clear();
        // waitSeconds(3);

        // 메시지 보내기만하고 close 는 클라이언트에서 한다면?
        wss.clients.forEach(client=>{
            switch (client.readyState) {
                case WebSocket.CONNECTING:
                    console.log('client state : CONNECTING');
                    break;
                case WebSocket.OPEN:
                    console.log('client state : OPEN');
                    break;
                case WebSocket.CLOSING:
                    console.log('client state : CLOSING');
                    break;
                case WebSocket.CLOSED:
                    console.log('client state : CLOSED');
                    break;
                default:
                    console.log('client state : ?????');
                    break;
            }
        });
    }

    ws.on('message', function message(data) {
        console.log('received from the client: %s %s', clientId, data);
    });

    // client 가 비로소 'close' 를 보내거나
    // server 가 close 를 보내야만함.
    ws.on('close', (code, reason)=>{
        errLogger.error({
            eventName: 'close',
            code: code,
            reason: Buffer.from(reason).toString('utf-8'),
            timestamp: new Date()
        });

        switch (ws.readyState) {
            case WebSocket.CONNECTING:
                console.log('client state : CONNECTING');
                break;
            case WebSocket.OPEN:
                console.log('client state : OPEN');
                break;
            case WebSocket.CLOSING:
                console.log('client state : CLOSING');
                break;
            case WebSocket.CLOSED:
                console.log('client state : CLOSED');
                break;
            default:
                console.log('client state : ?????');
                break;
        }
        console.log('closed from the client : %d', code);
        console.log('client number : %d', wss.clients.size);
    })
});


wss.on('close', function close() {
    console.log('closed from the client!');
});

