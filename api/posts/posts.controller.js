const postsModel = require('./posts.model');
const userModel = require('../auth/users.model');

// const mongoose = require('mongoose');

exports.addNewpost = (req, res) => {
    userModel.model.findById(req.user._id, (err, data) => {
        if(err){
            return res.send(err);
        } else {
            postsModel
                .create({
                    post: req.body.post,
                    username: data.nickname,
                    show: req.body.show
                },
                (err, data) => {
                    if(err){
                        return res.send(err)
                    } else {
                        return res.send(data)
                    }
                });
        }

    })
};

exports.showposts = (req, res) => {
    postsModel
        .findActiveposts()
        .exec( (err, docs) => {
            if(err) return res.status(400).send({error: err.message});
            res.render('posts.twig', {docs});
        });
};

