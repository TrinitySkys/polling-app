module.exports.requireAuth = (req, res, next) => {
    if (!req.session || !req.session.userId) {
        console.error('❌ Unauthorized access attempt');
        return res.redirect('/polling-app/login');
    }
    next();
};
