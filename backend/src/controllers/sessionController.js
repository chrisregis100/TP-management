

// verifier si l'utilisateur est authentifié
exports.verifyUser = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ message: 'Utilisateur non authentifié' });
    }
};


