const mongoose = require('mongoose')

const goalSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId, //type need to be ObjectId
            required: true, 
            ref:'User',
        },
        text:{ //text field object
            type: String, 
            required: [true, 'Please add a text value'],
        }
    }, 
    {
    timestamps: true, 
    }
)


module.exports = mongoose.model('Goal', goalSchema)