const { body, validationResult } = require('express-validator');

const validateUrl = [
    
    body('url').notEmpty().withMessage('URL is required').isURL().withMessage('URL is not valid'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateUrlBody = (req, res, next) => {
    const allowedFields = ['url']; 

    const extraFields = Object.keys(req.body).filter(field => !allowedFields.includes(field));
    if (extraFields.length > 0) {
         return res.status(400).json({ errors: [{ msg: `Unexpected fields: ${extraFields.join(', ')}` }] });
    }
    next();
};


module.exports = { validateUrlBody , validateUrl };
