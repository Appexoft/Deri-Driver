const { createLogger, format, transports, config } = require('winston');
const { combine, timestamp, json } = format;
 
const logger = createLogger({
    levels: config.syslog.levels,
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        json()
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/errors.log', level: 'error'})
    ]
 });

 const meliLogger = createLogger({
    levels: config.syslog.levels,
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        json()
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/meli.log', level: 'error'})
    ]
 });

module.exports = {
    logger,
    meliLogger
};