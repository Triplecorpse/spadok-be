module.exports = (req) => {
    let allowedOrigins = [
        "localhost:3000",
        "spadok.net"
    ]

    let realOrigin = req.headers.origin;

    let isConnectionAllowed = false;

    allowedOrigins.forEach((element) => {
        if (realOrigin.includes(element)) {
            isConnectionAllowed = true;
        }
    });

    return isConnectionAllowed;
};