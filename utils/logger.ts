import winston from 'winston';

const errLogger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    // required customizing bellow metaData
    defaultMeta: {
        exchange_url: '',
        // ex : scrapBot, tradingBot
        type: ''
    },
    transports: new winston.transports.File({ filename: 'error.log', level: 'error' }),

});

export {
    errLogger
}