// middleware are functions that execute during the request response cycle.

// response a json object with message and stack, in development mode
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500 //use ternary, if statusCode is what I set in the controller then use it, otherwise use 500

    res.status(statusCode)

    res.json({
        message: err.message, 
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
} 

module.exports = {
    errorHandler,
}