const express = require('express');
const { ItemModel, CategoryModel } = require('../models/ItemModel');
const router = express.Router();


// Base route to get all items
router.get("/", async (request, response, next) => {
    try{
        // query database to find all item documents
        const items = await ItemModel.find({}).exec();

        response.json({
            // respond with each item
            result: items
        });
    } catch (error) {
        next(error);
    }
});


// Route to get all categories
router.get("/categories", async (request, response, next) => {
    try{
        const categories = await CategoryModel.find({}).exec();
        response.json({
            result: categories
        });
    } catch (error) {
        next(error);
    }
});


// Route to get a single item by ID
router.get("/:id", async (request, response, next) => {
    try {
        // include itemID in the search params
        const itemId = request.params.id;
        // query database to find matching item for the ID
        const item = await ItemModel.findById(itemId).exec();

        if (!item) {
            // return a 404 if no item with the ID exists
            return response.status(404).json({
                message: "Item not found"
            });
        }

        response.json({
            // respond with the matching item
            result: item
        });
    } catch (error) {
        next(error);
    }
});


// Route to get all items of a specific category
router.get("/categories/:categoryId", async (request, response, next) => {
    try{
        const categoryId = request.params.categoryId;
        const items = await ItemModel.find({ category: categoryId }).exec();

        if (items.length === 0) {
            return response.status(404).json({
                message: "There are currently no items in this category."
            });
        }

        response.json({
            result: items
        });
    } catch (error) {
        next(error);
    }
});


module.exports = router;
