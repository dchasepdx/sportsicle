const tokenService = require('./token-service');

//eslint-disable-next-line
module.exports = function getEnsureAuth() {

    return function ensureAuth(req, res, next) {
        const token = req.get('Authorization');
        if(!token) { 
            return next({ 
                code: 401,
                error: 'No Authorization Found'
            });
        }

        tokenService.verify(token)
            .then(payload => {
                req.user = payload;
                next();
            })
            .catch(() => {
                next({
                    code: 403,
                    error: 'Authorization Failed'
                });
            });
    };
};