const express = require('express');
const userRoute = express.Router();


const {createUser, retreiveUsers, retreiveSingleUser, signUp} = require('../controllers/userController');


// add user to database
userRoute.post("/create", createUser);

// retreive users from database
userRoute.get("/users", retreiveUsers);

// retreive sigle user
userRoute.get("/users/:id", retreiveSingleUser);

// user signup
userRoute.post("/signup", signUp);
// user login
userRoute.post("/login", (req, res) =>{
    console.log("On login route");
});

module.exports = userRoute;


