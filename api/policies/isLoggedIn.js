module.exports = async function(req, res, next) {

    if(!req.headers || !req.headers.authorization) {
        return res.badRequest({err: 'Authorization header is missing'});
    }

    const token = req.headers.authorization;
    const decodedToken = await sails.helpers.jwtVerify(token);
    const user = await User.findOne({
        id: decodedToken.id
    });

    if(!user) {
        return next({err: 'unauthorized'});
    }

    req.user = user.id;
    next();

};