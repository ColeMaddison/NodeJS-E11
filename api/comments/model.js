const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.commentSchema = new Schema({
    commentId: {type: String},
    userId: {type: String},
    username: {type: String, required: true},
    commentText: {type: String}
}, {
    timestamps: true,
    collection: "commentCollection"
});

// module.exports = mongoose.model("commentModel", commentSchema);