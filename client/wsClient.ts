import WebSocket from "ws";
import ConnectionCounter from '../domain/ConnectionCounter'
import {sleep} from '../utils/sleep'

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
        // console.dir(msg.toString())
    });
}


(async ()=>{
  for (let i = 0; i < 20_000; i++) {
    await sleep(4)
    main()
  }

})()
