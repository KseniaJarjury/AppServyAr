
const flashMiddleware = (req, res, next) => {
    res.locals.messages = req.flash();
    next();
};

const flashHelpersMiddleware = (req, res, next) => {
    res.locals.old = (key) => {
        for (let d of res.locals.messages?.oldData ?? []) {
            if (d[key]) {
                return d[key];
            }
        }
    }
    res.locals.errors = (key) => {
        for (let d of res.locals.messages?.errors ?? []) {
            if (d[key]) {
                return d[key];
            }
        }
    }
    next();
};

module.exports = {
    flashMiddleware,
    flashHelpersMiddleware,
};
