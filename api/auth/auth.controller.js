
exports.login = (req, res) => {
    res.json(req.session);
};

exports.getTest = (req, res) => {
    res.json(req.user);
};