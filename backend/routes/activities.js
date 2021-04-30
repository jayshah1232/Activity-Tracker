const router = require('express').Router();
let Activity = require('../models/activity.model');

router.route('/').get((req, res) => {
    Activity.find()
        .then(activities => res.json(activities))
        .catch(error => res.status(400).json('Error: ' + error));
});

router.route('/addactivity').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newActivity = new Activity({
        username,
        description,
        duration,
        date,
    });

    newActivity.save()
        .then(() => res.json('Activity added!'))
        .catch(error => res.status(400).json('Eror: ' + error));
});

router.route('/:id').get((req, res) => {
    Activity.findById(req.params.id)
        .then(activity => res.json(activity))
        .catch(error => res.status(400).json('Error: ' + error));
});

router.route('/:id').delete((req, res) => {
    Activity.findByIdAndDelete(req.params.id)
        .then(() => res.json('Activity deleted.'))
        .catch(error => res.status(400).json('Error: ' + error));
});

router.route('/update/:id').post((req, res) => {
    Activity.findById(req.params.id)
        .then(activity => {
            activity.username = req.body.username;
            activity.description = req.body.description;
            activity.duration = Number(req.body.duration);
            activity.date = Date(req.body.date);

            activity.save()
                .then(() => res.json('Activity updated!'))
                .catch(error => res.status(400).json('Error: ' + error));
        })
        .catch(error => res.status(400).json('Error: ' + error));
});

module.exports = router;