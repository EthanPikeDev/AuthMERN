const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//Item model

const Item = require('../../models/Item');

// @route GET api/cars
// @desc get All items
// @access Public

router.get('/', (req, res) => {
    Item.find()
    .sort({date: -1 })
    .then(items => res.json(items))
    
});

// @route POST api/cars
// @desc Create a item
// @access 

router.post('/', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        date: req.body.date
           });

    newItem.save().then(item => res.json(item));

});

// @route DELETE api/cars
// @desc DELETE a item
// @access Private

router.delete('/:id', auth, (req, res) => {
    Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({successs: true})))
    .catch(err => res.status(404).json({successs: flase}));
 });





           

    




module.exports = router;