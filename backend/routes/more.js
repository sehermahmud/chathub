const router = require('express').Router();
let More = require('../modal/more');

router.route('/').get((req, res) => {
  More.find()
    .then((more) => res.json(more))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const more = req.body.more;

  const newMore = new More({
    more,
  });

  newMore
    .save()
    .then(() => res.json('More added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  More.findById(req.params.id)
    .then((more) => res.json(more))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  More.findByIdAndDelete(req.params.id)
    .then(() => res.json('More deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
