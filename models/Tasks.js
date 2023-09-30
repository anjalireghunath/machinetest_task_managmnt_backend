const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String

})

const TaskModels = mongoose.model("users", TaskSchema)
module.exports = TaskModels  