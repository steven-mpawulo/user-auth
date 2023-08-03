const User = require('../models/userModel');
const bcrypt = require('bcrypt');
// create user without password hashing
const createUser = async (req, res) => {
    const body = req.body;
    console.log(body);
    if (Object.keys(req.body).length === 0) {
        console.log(body.content);
        res.status(403).end();
    } else {
        const UserInfo = new User({
            name: body.name,
            email: body.email,
        });

        await UserInfo.save().then((value) => {
            console.log(value);
            console.log("User information saved");
            res.json(value);
        }).catch((e) => {
            console.log(e);

            res.status(400).json(e.message);
        });


    }
    console.log("On create user route");
};

// fetch all users from database
const retreiveUsers = async (req, res) => {
    console.log("On retreiving users route");
    await User.find({}).then((value) => {
        console.log(value);
        res.json(value);
    }).catch((e) => {
        res.status(400).json(`message: ${error.message}`);
    });

}

// fetch single user from database
const retreiveSingleUser = async (req, res) => {
    const id = req.params.id;
    //  method 1
    //  await User.find({_id: id}).exec().then((value) => {
    //     console.log(value);
    //     res.json(value);

    //  });

    //  method 2
    await User.findById(id).exec().then((value) => {
        console.log(value);
        res.json(value);
    }).catch((e) => {
        res.status(400).json(`message: $(e.message)`);
    });

}

// create user with password hashing 
const signUp = (req, res) => {
    const body = req.body;
    console.log(body);
    if (Object.keys(body).length === 0) {
        res.status(400).json("message: you didnt provide any data");
    } else {
        bcrypt.hash(body.password, 10, async function (err, hash) {
            if (err) {
                console.log("Some thing we wrong");
                res.status(400).json("message: error");
            } else {
                const userInfo = new User({
                    name: body.name,
                    email: body.email,
                    password: hash,
                })
                await userInfo.save().then((value) => {
                    console.log(value);
                    res.json(value);
                }).catch((e) => {
                    res.status(400).json("message: ${e.message}");
                });
            }
        });
    }
}

// verify user credentials and login 
const logIn = async (req, res) => {
    const body = req.body;
    const { email, password } = body;
    console.log(body);
    if (Object.keys(body).length === 0) {
        res.status(400).json("message:no data provided");
    } else {
        await User.findOne({ email }).then((value) => {
            console.log(value);
            bcrypt.compare(password, value.password, function (err, result) {
                if (err) {
                    res.status(400).json("message: something went wrong");
                } else {
                    console.log(result);
                    res.json(`Do passwords match, ${result}`);
                }
            });
        }).catch((e) => {
            console.log(e);
            res.status(400).json("message: user not found");
        })
    }

}
// update single user information in database
const updateUserInfo = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const { name, email } = body;
    if (id !== null && Object.keys(body).length !== 0) {
        if (name) {
            await User.findOneAndUpdate({ _id: id }, { name: name }, {
                new: true
            }).then((value) => {
                console.log(value);
                res.status(201).json(value)
            }).catch((e) => {
                console.log(e.message);
                res.status(400).json({ "message": e.message })
            });
        } else if (email) {
            await User.findOneAndUpdate({ _id: id }, { email: email }, {
                new: true
            }).then((value) => {
                console.log(value);
                res.status(201).json(value);
            }).catch((e) => {
                console.log(e.message);
                res.status(400).json({ "message": e.message })
            });
        } else {
            res.status(400).json({"message": "please provide data to update"});
        }


    } else {
        res.status(400).json({
            "message": "Please provide data"
        })
    }

}

// delete single user from database
const deleteUser = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    if (id !== null) {
        await User.findByIdAndDelete(id).then((value) => {
            console.log(value);
            if (value) {
                res.status(201).json(value);
            } else {
                res.status(400).json({
                    message: "no record found"
                })
            }

        }).catch((e) => {
            console.log(e.message);
            res.status(400).json({
                "message": e.message
            });
        });
    } else {
        res.status(400).json({
            message: "something went wrong"
        })
    }


}


module.exports = { createUser, retreiveUsers, retreiveSingleUser, signUp, logIn, deleteUser, updateUserInfo };