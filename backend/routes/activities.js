const router = require('express').Router();
let Activity = require('../models/activity.model');
const auth = require('../auth');

router.route('/').get((req, res) => {
    Activity.find()
        .then(activities => res.json(activities))
        .catch(error => res.status(400).json('Error: ' + error));
});

router.route('/addactivity').all(auth).post((req, res) => {
    const username = req.user.username;
    const description = req.body.params.description;
    const duration = Number(req.body.params.duration);
    const goalTime = Number(req.body.params.goalTime);
    const date = Date.parse(req.body.params.date);

    const newActivity = new Activity({
        username,
        description,
        duration,
        goalTime,
        date,
    });

    newActivity.save()
        .then(() => res.json('Activity added!'))
        .catch(error => res.status(400).json('Eror: ' + error));
});

router.route('/list').all(auth).get((req, res) => {
    let today = new Date();
    today.setUTCHours(0,0,0,0);
    Activity.find({"username" : req.user.username, "date" : today})
        .then(activity => {
            res.json(activity);
            console.log(activity);
        })
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
            activity.goalTime = Number(req.body.goalTime);
            activity.date = Date(req.body.date);

            activity.save()
                .then(() => res.json('Activity updated!'))
                .catch(error => res.status(400).json('Error: ' + error));
        })
        .catch(error => res.status(400).json('Error: ' + error));
});

module.exports = router;