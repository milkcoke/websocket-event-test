
export default class ConnectionCounter {

  private _connectionCount: number = 0
  private static instance: ConnectionCounter

  private constructor() {}

  public static getInstance(): ConnectionCounter {
    if (!ConnectionCounter.instance) {
      ConnectionCounter.instance = new ConnectionCounter()
    }
    return ConnectionCounter.instance
  }

  public incr(): void {
    this._connectionCount++
  }

  public decr() {
    this._connectionCount--
  }

  get connectionCount(): number {
    return this._connectionCount
  }
}
