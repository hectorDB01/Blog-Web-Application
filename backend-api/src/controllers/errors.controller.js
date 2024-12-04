const APIError = require('../utils/api-error');
const JSend = require('../utils/jsend');

const methodNotAllowed = (req, res, next) => {
    if (req.route) {
        const httpMethods = Object.keys(req.route.methods)
            .filter((method) => method !== '_all')
            .map((method) => method.toUpperCase());
        return next(
            new APIError(405, 'Method Not Allowed', {
                Allow: httpMethods.join(', '),
            })
        );
    }
    return next();
}

const resourceNotFound = (req, res, next) => {
    // Handler for unknown URL path.
    // Call next() to pass to the error handling function.
    return next(new APIError(404, 'Resource not found'));
}

const handleError = (error, req, res, next) => {
    // The centralized error handling function.
    // In any route handler, calling next(error)
    // will pass to this error handling function.
    if (res.headersSent) {
        return next(error);
    }
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    return res
        .status(statusCode)
        .set(error.headers || {})
        .json(
            statusCode >= 500 ? JSend.error(message) : JSend.fail(message)
        );

}
module.exports = {
    methodNotAllowed,
    resourceNotFound,
    handleError,
};