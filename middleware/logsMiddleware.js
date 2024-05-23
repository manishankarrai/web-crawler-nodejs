const { logger  }  =  require('../services/loggerService');

const newRequest = (req, res, next) => {
    logger.info({
        message: 'Request received',
        ip: req.ip,
        method: req.method,
        url: req.url
    });
    next();
};



module.exports = {
    newRequest
}