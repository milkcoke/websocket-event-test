import WebSocket from "ws";
import {waitSeconds} from "../utils/stopwatch";

const clientWsConnSet : Set<WebSocket> = new Set<WebSocket>();

function addListenersToWsConn(ws: WebSocket) {

    const clientNumber = clientWsConnSet.size + 1;
    if (clientNumber > 10) return;

    clientWsConnSet.add(ws);

    // client 는 connection 이 아니라 open.
    ws.on('open', ()=>{
        console.log('client Number ', clientNumber, 'is connected!');
        waitSeconds(1);
        addListenersToWsConn(new WebSocket('ws://localhost:9000'));
    });

    // 기대하는 바는 딱 하나만 끊어지기 (10번)
    ws.on('close', (code, reason)=>{
        console.log('client Number ', clientNumber, 'is closed!');
        clientWsConnSet.delete(ws);

        for (const wsConn of clientWsConnSet) {
            // wsConn.removeAllListeners('close');
            // wsConn.removeAllListeners('message');
            wsConn.close(1000);
        }

        // waitSeconds(5);
        // addListenersToWsConn(new WebSocket('ws://localhost:9000'));
    });

    ws.on('message', (msg)=>{
        console.log('message from server : %s', msg);
    })
}

addListenersToWsConn(new WebSocket('ws://localhost:9000'));
// setTimeout(
//     ()=>addListenersToWsConn(new WebSocket('ws://localhost:9000')),
//     1000);

