const router = require('express').Router();
let User = require('../models/newuser.model');
const mongodb = require("mongodb").MongoClient;
const fastcsv = require("fast-csv");
const fs = require("fs");
const ws = fs.createWriteStream("younus_gorest_api.csv");


let url = process.env.ATLAS_URI;

router.route('/').get((req, res) => {
  User.find()
    .then(newuser => res.json(newuser))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const status = req.body.status;
  const gender = req.body.gender;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newUser = new User({
    username,
    email,
    status,
    gender,
    duration,
    date,
  });

  newUser.save()
  .then(() => res.json('User added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  newUser.findById(req.params.id)
    .then(newuser => res.json(newuser))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  newUser.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  newUser.findById(req.params.id)
    .then(exercise => {
      newuser.username = req.body.username;
      newuser.email = req.body.email;
      newuser.status = req.body.status;
      newuser.gender = req.body.gender;
      newuser.duration = Number(req.body.duration);
      newuser.date = Date.parse(req.body.date);

      newuser.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//to export all the collections as CSV
router.route('/exportdata').post((req, res) => {
mongodb.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) throw err;

    client
      .db("gorest")
      .collection("apitest")
      .find({})
      .toArray((err, data) => {
        if (err) throw err;

        console.log(data);
        fastcsv
          .write(data, { headers: true })
          .on("finish", function() {
            console.log("Write to younus_gorest_api.csv successfully!");
          })
          .pipe(ws);

        client.close();
      });
  }
);
});

module.exports = router;