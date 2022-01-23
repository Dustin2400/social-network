const router = require('express').Router();
const { process_params } = require('express/lib/router');
const { Thought } = require('../../models');

router.get('/', (req, res) => {
    Thought.find({})
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
        res.statusCode(400).json(err);
    });
});

router.get('/:id', ({ params }, res) => {
    Thought.findOne({ _id: params.id })
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!'});
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.post('/', ({ body }, res) => {
    Thought.create(body)
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
        res.status(400).json(err);
    });
});

router.put('/:id', ({ params, body }, res) => {
    Thought.findOneAndUpdate(
        { _id: params.id },
        body,
        { new: true }
    )
    .then(dbThoughtData => {
        if(!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with that id!'});
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
});

router.delete('/:id', ({ params }, res) => {
    Thought.findOneAndDelete({ _id: params.id })
    .then(dbThoughtData => {
        if(!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!'});
            return;
        }
        res.json(dbThoughtData)
    })
    .catch(err => res.status(400).json(err));
});

router.post('/:thoughtId/reactions', ({ params, body }, res) => {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: {reactions: body } },
        { new: true }
    )
    .then(dbThoughtData => {
        if(!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(dbThoughtData)
    })
    .catch(err => res.json(err));
});

router.delete('/:thoughtId/reactions/:reactionId', ({ params }, res) => {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
    )
    .then(dbThoughtData => {
        if(!dbThoughtData) {
            res.status(404).json({ message: 'No Thought found with this id!'});
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
});


module.exports = router;