const winston = require('winston');
const { combine, timestamp, json } = winston.format;
require('dotenv').config();


const errorFilter = winston.format((info, opts) => {
    return info.level === 'error' ? info : false;
  });
  
  const infoFilter = winston.format((info, opts) => {
    return info.level === 'info' ? info : false;
  });
  const warningFilter = winston.format((info, opts) => {
    return info.level === 'warning' ? info : false;
  });
  
const logger = winston.createLogger({

    level: process.env.LOG_LEVEL || 'info', 
    format: combine(timestamp({
        format: 'YYYY-MM-DD hh:mm:ss.SSS A', 
      }), json()),
    transports: [
        new winston.transports.Console(), 
        new winston.transports.File({
            filename: './logs/combined.log',
          }),
          new winston.transports.File({
            filename: './logs/error.log',
            level: 'error',
            format: combine(errorFilter(), timestamp(), json()),
          }),
          new winston.transports.File({
            filename: './logs/info.log',
            level: 'info',
            format: combine(infoFilter(), timestamp(), json()),
          }),
          new winston.transports.File({
            filename: './logs/warning.log',
            level: 'warning',
            format: combine(warningFilter(), timestamp(), json()),
          }),
    ]
});



module.exports = { logger } ;
