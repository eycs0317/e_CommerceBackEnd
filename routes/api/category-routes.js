const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    var data = await Category.findAll({
      associated: ['id', 'category_name'],
      include: {model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id']}
    })
    if(!data) {
      res.status(404).json({message: 'No Category found!!'})
      return;
    }
    res.status(200).json(data)
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  var id = req.params.id;
  try {
    var data = await Category.findOne({
      where: {id: id},
      attributes: ['id', 'category_name'],
      include: {model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id']}
    })
    if(!data) {
      res.status(404).json({message: 'No data found!!'})
      return;
    }
    res.status(200).json(data);
  }
  catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', async (req, res) => {

    try {
      var respond = await Category.create(req.body)
      if (!respond) {
        res.status(400).json({message: 'Error!!'})
      }
      res.status(200).json(respond)
    }
    catch {
      res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
  let id = req.params.id;
  let body = req.body;
  try {
    let respond = await Category.update(body, {
      where: {id: id}
    })
    //respond [0] / [1]
    if(respond[0] === 0) {
      res.status(400).json({message: ' Update Failed!!!'})
      return;
    }
    res.status(200).json({message: ' Updated!!!'})
  }
  catch (err){
    res.status(400).json(err)
  }
});


router.delete('/:id', async (req, res) => {
  let id = req.params.id;
  try {
    let respond = await Category.destroy({
      where: {id: id}
    })
    if(!respond) {
      res.status(400).json({message: ' Delete Failed!!!'})
      return;
    }
    res.status(200).json({message: ' Deleted!'})
  }
  catch (err) {
    res.status(400).json(err)
  }
});

module.exports = router;
