const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    // _id: false,
    //     Id: {
    //     type: Number,
    //     unique: true,
    //     index: true,
    //     required: true
    // },
    name:{
        type: String,
        required: true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
  
})

module.exports = mongoose.model('Product', productSchema)