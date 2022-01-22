const router = require('express').Router();
const { User } = require('../../models');

router.get('/', (req, res) => {
    User.find({})
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        res.status(400).json(err);
    });
});

router.get('/:id', ({ params }, res) => {
    User.findOne({ _id: params.id })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        } 
        res.json(dbUserData);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.post('/', ({ body }, res) => {
    User.create(body)
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        res.status(400).json(err);
    });
});

module.exports = router;