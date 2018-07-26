
exports.login = (req, res) => {
    res.json(req.session);

    req.app.locals.io.emit("user", req.user.id || req.user._id);

};

exports.getTest = (req, res) => {
    res.json(req.user);
};


const UsersModel = require('./users.model').model;

exports.registerNewUser = (req, res) => {
    UsersModel.create(req.body, (err, result) => {
        if(err) {
            if(err.code === 11000) {
                return res.status(400).send({message: "email already registered"});
            }
            return res.status(400).send({message: err.message});
        }

        res.send(result);
    });
};