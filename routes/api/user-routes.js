const router = require('express').Router();
const res = require('express/lib/response');
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

router.put('/:id', ({ params, body }, res) => {
    User.findOneAndUpdate( 
        { _id: params.id },
        body,
        { new: true }
    )
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No User found with this id!'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
});

router.delete('/:id', ({ params }, res) => {
    User.findOneAndDelete({ _id: params.id })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!'});
            return;
        }
        res.json(dbUserData)
    })
    .catch(err => res.status(400).json(err));
});

router.post('/:userId/friends/:friendId', ({ params }, res) => {
    User.findOneAndUpdate(
        { _id: params.userId },
        { $addToSet: { friends: params.friendId } },
        { new: true }
    )
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.json(err))
});

module.exports = router;