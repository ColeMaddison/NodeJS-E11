const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessagesSchema = new Schema({
    username: {type: String},
    message: {type: String},
    show: {type: Date, expires: 0, index: -1},
    // addedAt: {type: Date, default: Date.now}
}, {
    timestamps: true,
    collection: "MessagesCollection"
});

MessagesSchema.statics = {
    findActiveMessages: function () {
        return this.find({show: {$gte: new Date()}})
    }
};

MessagesSchema.pre('save', function () {
    if(this.isNew) {
        this.show = new Date(new Date().getTime() + this.show * 1000);
    }
});

module.exports = mongoose.model("MessagesModel", MessagesSchema);