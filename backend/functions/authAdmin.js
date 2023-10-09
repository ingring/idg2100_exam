function authAdmin(req, res, next) {
    if(req.user.role === 'Admin') {
        next();
    }
    else res.sendStatus(403);
    
}

module.exports = authAdmin