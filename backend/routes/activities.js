const router = require('express').Router();
let Activity = require('../models/activity.model');
const auth = require('../auth');

router.route('/').get((req, res) => {
    Activity.find()
        .then(activities => res.json(activities))
        .catch(error => res.status(400).json('Error: ' + error));
});

router.route('/addactivity').all(auth).post((req, res) => {
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

router.route('/list').all(auth).get((req, res) => {
    console.log(req);
    Activity.find({"username" : req.body.username})
        .then(activity => res.json(activity))
        .catch(error => res.status(400).json('Error: ' + error));
})

router.route('/getSingle').all(auth).get((req, res) => {
    Activity.findById(req.body.id)
        .then(activity => res.json(activity))
        .catch(error => res.status(400).json('Error: ' + error));
});

router.route('/delete').all(auth).delete((req, res) => {
    Activity.findByIdAndDelete(req.body.id)
        .then(() => res.json('Activity deleted.'))
        .catch(error => res.status(400).json('Error: ' + error));
});

router.route('/update').all(auth).post((req, res) => {
    Activity.findById(req.body.id)
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