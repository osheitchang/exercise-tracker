const router = require("express").Router();
let User = require("../models/User");

router.get("/", (req, res, next) => {
  User.find()
    .then((users) => 
      res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

router.post("/add", (req, res, next) => {
  const username = req.body.username;
  console.log(username);
  const newUser = new User({ username });

  newUser
    .save()
    .then((results) =>{
        console.log("RESULTS", results)
        res.json("User addded!")
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
