const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

const CategoryModel = mongoose.model('Category', categorySchema);


const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true 
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    }
});


const customisationSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ["milk", "sugar", "size", "extra"],
        equired: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        default: 0,
        required: true,
    }
})


const ItemModel = mongoose.model("Item", itemSchema);
const CustomisationModel = mongoose.model("Customisation", customisationSchema);

module.exports = {
    ItemModel,
    CustomisationModel,
    CategoryModel
}