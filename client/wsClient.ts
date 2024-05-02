import WebSocket from "ws";
import ConnectionCounter from '../domain/ConnectionCounter'

const connectionCounter = ConnectionCounter.getInstance()

function main() {
   const ws = new WebSocket('ws://localhost:9000');

    // client 는 connection 이 아니라 open.
    ws.on('open', ()=>{
        connectionCounter.incr()
        console.log(`opened client connection: ${connectionCounter.connectionCount}`)
    });

    ws.on('close', (code, reason)=>{
        connectionCounter.decr()
        console.log(`closed client connection: ${connectionCounter.connectionCount}`)

        console.dir({
            code: code,
            reason: Buffer.from(reason).toString('utf-8'),
        })
    });

    ws.on('message', (msg)=>{
        console.dir(msg)
    });

    // 자신이 보낸 close 요청도 바로 close 이벤트를 트리거함.
    ws.on('close', (code, reason)=>{
        console.log('client close code : %d', code);
    });
}

main()
