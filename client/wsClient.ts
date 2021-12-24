import WebSocket from "ws";

const clientWsConnSet : Set<WebSocket> = new Set<WebSocket>();

function waitSeconds(seconds: number) {
    const endMilliSeconds = Date.now() + seconds * 1000;
    let currentMilliSeconds = Date.now();

    while (currentMilliSeconds < endMilliSeconds) {
        currentMilliSeconds = Date.now();
    }
}

function addListenersToWsConn(ws: WebSocket) {
    clientWsConnSet.add(ws);

    const clientNumber = clientWsConnSet.size;

    if (clientNumber > 10) return;

    // client 는 connection 이 아니라 open.
    ws.on('open', ()=>{
        console.log('client Number ', clientNumber, 'is connected!');
        waitSeconds(1);
        addListenersToWsConn(new WebSocket('ws://localhost:9000'));
    });

    // 기대하는 바는 딱 하나만 끊어지기 (10번)
    ws.on('close', (code, reason)=>{
        console.log('client Number ', clientNumber, 'is closed!');
        clientWsConnSet.forEach(clientWsConn=>clientWsConn.removeAllListeners('close'));
    })
}

addListenersToWsConn(new WebSocket('ws://localhost:9000'));
// setTimeout(
//     ()=>addListenersToWsConn(new WebSocket('ws://localhost:9000')),
//     1000);

