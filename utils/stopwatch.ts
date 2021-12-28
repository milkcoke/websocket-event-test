export function waitSeconds(seconds: number) {
    const endMilliSeconds = Date.now() + seconds * 1000;
    let currentMilliSeconds = Date.now();

    while (currentMilliSeconds < endMilliSeconds) {
        currentMilliSeconds = Date.now();
    }
}