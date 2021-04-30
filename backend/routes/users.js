const express = require('express');
const cors = require('cors');
const router = require('express').Router();
const bcrypt = require('bcryptjs')
let User = require('../models/user.model');

const app = express();

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

    bcrypt.hash(nakedPassword, salt).then(password => {
        const newUser = new User({username, password});
        
        newUser.save()
        .then(() => res.json('User added!'))
        .catch(error => res.status(400).json('Eror: ' + error));
    })
    .catch(err => console.log('Error: ' + err));
    
});

router.route('/login').post((req, res) => {
    const query = { "username": req.body.user.username }
    
    User.findOne(query)
        .then(result => {
            bcrypt.compare(req.body.user.password, result.password, function(err, response) {
                if (err) {
                    res.status(400).json('Error1: ' + err);
                }
                if (response) {
                    res.json(result);
                }
                else {
                    return res.json({message: 'Passwords do not match'});
                }
            });
        })
        .catch(error => res.status(400).json('Username not found'));
})

module.exports = router;