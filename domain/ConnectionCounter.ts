
export default class ConnectionCounter {
  private connectionCount: number = 0
  private static instance: ConnectionCounter

  private constructor() {}

  public static getInstance(): ConnectionCounter {
    if (!ConnectionCounter.instance) {
      ConnectionCounter.instance = new ConnectionCounter()
    }
    return ConnectionCounter.instance
  }

  public incr(): void {
    this.connectionCount++
  }

  public decr() {
    this.connectionCount--
  }
}
