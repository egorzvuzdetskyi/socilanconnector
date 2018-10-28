module.exports = function asyncMiddleware(handler) {
    return async (req, res, next) => {
        try {
            await handler(req, res);
        } catch (e) {
            console.log(e);
            res.status(500).json({
                errorMessage: "Something failed"
            });
        }
    };
};
