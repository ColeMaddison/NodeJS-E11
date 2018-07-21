const postsModel = require('./posts.model');

// const mongoose = require('mongoose');

exports.addNewpost = (req, res) => {

    // mongoose.model("postsModel").create(req.body, (err, doc) => {
    //     res.send(doc);
    // });
    //

    postsModel.create(req.body, (err, doc) => {
        res.send(doc);
    });
};

exports.showposts = (req, res) => {
    postsModel
            .findActiveposts()
            .exec( (err, docs) => {
                if(err) return res.status(400).send({error: err.message});
                res.render('posts.twig', {docs});
            });
    
};