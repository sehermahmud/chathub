const router = require('express').Router();
let Seher = require('../modal/seher');

router.route('/').get((req, res) => {
  Seher.find()
    .then((seher) => res.json(seher))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const seher = req.body.seher;

  const newSeher = new Seher({
    seher,
  });

  newSeher
    .save()
    .then(() => res.json('Seher added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Seher.findById(req.params.id)
    .then((seher) => res.json(seher))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Seher.findByIdAndDelete(req.params.id)
    .then(() => res.json('Seher deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
