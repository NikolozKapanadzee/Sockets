const { default: mongoose } = require("mongoose");



const chatSchema = await mongoose.Schema({
    roomId: {
        type: String, required: true
    },
    userEmail: {
        type: String, required: true
    },
    message: {
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model("chat", chatSchema)