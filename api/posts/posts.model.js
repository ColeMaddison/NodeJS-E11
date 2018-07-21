const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postsSchema = new Schema({
    username: {type: String},
    post: {type: String},
    show: {type: Date, expires: 0, index: -1},
    title: {type: String},
    text: {type: String},
    addedBy: {type: Schema.ObjectId, ref: "UsersModel"},
    display: {type: Boolean, default: true},
    tags: [{type: String}],
    comments: [{type: Schema.ObjectId, ref: "CommentsModel"}]

    // addedAt: {type: Date, default: Date.now}
}, {
    timestamps: true,
    collection: "postsCollection"
});

postsSchema.statics = {
    findActiveposts: function () {
        return this.find({show: {$gte: new Date()}})
    }
};

postsSchema.pre('save', function () {
    if(this.isNew) {
        this.show = new Date(new Date().getTime() + this.show * 1000);
    }
});

module.exports = mongoose.model("postsModel", postsSchema);