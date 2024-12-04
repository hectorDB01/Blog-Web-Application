function success(data = null) {
    return {
        status: 'success',
        data: data,
    };
}

function fail(message, data = null) {
    if (data) {
        return {
            status: 'fail',
            message,
            data,
        };
    }
    return {
        status: 'fail',
        message,
    };
}

function error(message, data = null) {
    if (data) {
        return {
            status: 'error',
            message,
            data,
        };
    } else {
        return {
            status: 'error',
            message,
        }
    }
}

module.exports = {
    success,
    fail,
    error,
};