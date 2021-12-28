
# Websocket-Test

## close() vs terminate()

#### close
`close()` is a frame of websocket including handshake. \
Finishing handshake, the websocket is gracefully closed. \
**Otherwise, it potentially could keep socket for additional 30 seconds.**

#### terminate
Forcibly destroys the connection without closing frames or fin packets exchange \
And does it instantly without any timeout.


#### ws/lib/websocket.js
```javascript
const closeTimeout = 30 * 1000;
// ...

// Specify a timeout for the closing handshake to complete.
this._closeTimer = setTimeout(
    this._socket.destroy.bind(this._socket),
    closeTimeout
);
```

### Conclusion
You should remove all listeners manually when close event occurs like bellow

```typescript
ws.on('close', (code, reason)=>{
    ws.removeAllListeners('message');
    ws.removeAllListeners('open');
});
```


## 🔗 Reference
- [How to terminate a websocket connection - stackoverflow](https://stackoverflow.com/questions/41074052/how-to-terminate-a-websocket-connection)
- [Do event listeners to be removed manually when closing websocket connection - stackoverflow](https://stackoverflow.com/questions/59007871/do-event-listeners-have-to-be-removed-manually-when-closing-websocket-connection)
