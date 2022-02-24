const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// find all categories
router.get('/', (req, res) => {
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock']
      }
    ]
  }).then(dbCategoryData => {
    res.json(dbCategoryData);
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock']
      }
    ]
  }).then(dbCategoryData => {
    res.json(dbCategoryData);
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  }).then(dbCategoryData => {
    res.json(dbCategoryData);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      where: {
        id: req.params.id
      }
    },
    {
      category_name: req.body.category_name
    }
  ).then(dbCategoryData => {
    res.json(dbCategoryData);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy(
    {
      where: {
        id: req.params.id
      }
    }
  ).then(dbCategoryData => {
    res.json(dbCategoryData);
  })
});

module.exports = router;
