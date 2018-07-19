const MessagesModel = require('./messages.model');

// const mongoose = require('mongoose');

exports.addNewMessage = (req, res) => {

    // mongoose.model("MessagesModel").create(req.body, (err, doc) => {
    //     res.send(doc);
    // });
    //

    MessagesModel.create(req.body, (err, doc) => {
        res.send(doc);
    });
};

exports.showMessages = (req, res) => {

    // mongoose.model("MessagesModel").findActiveMessages()

    MessagesModel
        .findActiveMessages()
        .exec( (err, docs) => {
            if(err) return res.status(400).send({error: err.message});

            console.log(docs);

            res.render('messages.twig', {docs});
        });
};