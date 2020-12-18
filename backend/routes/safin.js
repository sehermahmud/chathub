const router = require('express').Router();
let Safin = require('../modal/safin');

router.route('/').get((req, res) => {
  Safin.find()
    .then((safin) => res.json(safin))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const safin = req.body.safin;

  const newSafin = new Safin({
    safin,
  });

  newSafin
    .save()
    .then(() => res.json('Safin added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Safin.findById(req.params.id)
    .then((safin) => res.json(safin))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Safin.findByIdAndDelete(req.params.id)
    .then(() => res.json('Safin deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
