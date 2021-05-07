const express = require('express');
const cors = require('cors');
const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
let User = require('../models/user.model');
let UserActivities = require('../models/useractivity.model');
const auth = require('../auth');
require('dotenv').config();

const app = express();
const token = process.env.TOKEN_SECRET;

app.use(cors());

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(error => res.status(400).json('Error: ' + error));
});

router.route('/signup').post((req, res) => {
    const username = req.body.user.username;
    const nakedPassword = req.body.user.password;
    const salt = bcrypt.genSaltSync(10);

    //.then(() => res.json('User added!'))

    bcrypt.hash(nakedPassword, salt).then(password => {
        const newUser = new User({username, password});
        
        newUser.save()
        .then(user => {
            jwt.sign(
                { id: user.id },
                token,
                { expiresIn: '1h'},
                (err, jwtToken) => {
                    if (err) throw err;
                    res.json({
                        jwtToken,
                        user: {
                            id: user._id,
                            username: user.username
                        }
                    })
                }
            )
        })
        .catch(error => res.status(400).json('Eror: ' + error));
    })
    .catch(err => console.log('Error: ' + err));
    
});

router.route('/login').post((req, res) => {
    const { username, password } = req.body.user;    
    const query = { "username": username };
    
    User.findOne({"username": username})
        .then(user => {
            let id = user._id;
            bcrypt.compare(password, user.password, function(err, response) {
                if (err) {
                    res.status(400).json('Error1: ' + err);
                }
                if (response) {
                    const payload = { id, username };
                    jwt.sign(
                        payload, 
                        token, 
                        { expiresIn: '1h' },
                        (err, jwtToken) => {
                            if (err) throw err;
                            res.json({
                                jwtToken,
                                user: {
                                    id: user.id,
                                    username: user.username,
                                },
                                logged_in: true
                            })
                        }
                    );
                }
                else {
                    return res.status(401).json({ msg: 'Unauthorized' });
                    // return res.json({message: 'Passwords do not match'});
                }
            });
        })
        .catch(error => {
            res.status(400).json(error)
        });
})

router.route('/useractivities').all(auth).get((req, res) => {
    UserActivities.findOne({"username" : req.user.username})
        .then(userActivity => res.json(userActivity.activities))
        .catch(error => res.status(400).json('Error: ' + error));
})

router.route('/useractivities').post((req, res) => {
    const username = req.body.username;
    console.log(username);
    console.log(req.body);
    const activity = req.body.activity;
    console.log(activity);
    const newUserActivity = new UserActivities({username});

    newUserActivity.save()
        .then(userActivity => {
            UserActivities.updateOne(
                { "username": username }, 
                { $push: {"activities": activity}}
            )
            .then(res.json({ msg: "User activity added!" }))
            .catch(error => res.status(400).json('Error: Could not add activity to list of activities' + error));
        })
        .catch(error => res.status(400).json('Error: ' + error));
})

router.route('/useractivities').all(auth).patch((req, res) => {
    const username = req.user.username;
    const activity = req.body.params.activity;
    console.log(username);
    console.log("entering patch");
    console.log(activity);
    UserActivities.updateOne(
        { "username": username }, 
        { $push: {"activities": activity}}
    )
    .then(res.json({ msg: "User activity added!" }))
    .catch(error => res.status(400).json('Error: Could not add activity to list of activities' + error));
})

router.route('/useractivitiesdel').delete((req, res) => {
    const username = req.body.username;
    UserActivities.updateOne(
        { "username": username },
        { $pop: {"activities": -1 }}
    )
    .then(res.json({ msg: "last activity removed"}))
    .catch(error => res.status(400).json('Error: could not remove last activity'));
})

router.route('/user').all(auth).get((req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => {
            res.json(user)
        });
});

module.exports = router;