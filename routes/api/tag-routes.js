const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
    // find all tags
  // be sure to include its associated Product data
  try {
    var data = await Tag.findAll({
      include: [
        {model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id']}
      ]
    })
    if(!data) {
      res.status(400).json({message: 'No product found!!'})
      return;
    }
    res.status(200).json(data)
  }
  catch {
    res.status(400).json(data)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  let id = req.params.id;
  try {
    var data = await Tag.findByPk(id, {
      include: {model: Product}
    });
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

//create
router.post('/', async (req, res) => {
  // create a new tag
  let body = req.body;
  try {
    let respond = await Tag.create(body);
    res.status(200).json({message: 'Created!!'})
  }
  catch (err) {
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  let body = req.body;
  let id = req.params.id;
  try {
    let respond = await Tag.update(body, {
      where: {id: id}
    })
    if(respond[0] === 0) {
      res.status(400).json({message: ' Update Failed!!!'});
      return;
    }
    res.status(200).json({message: 'Updated!!!!!'})
  }
  catch (err) {
    res.status(400).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  let id = req.params.id;
  try {
    let respond = await Tag.destroy({
      where: {id: id}
    })
    if(!respond) {
      res.status(402).json({message: ' Delete Failed!!!'})
      return;
    }
    res.status(200).json({message: ' Deleted!'})
  }
  catch (err) {
    res.status(401).json(err)
  }
});

module.exports = router;
