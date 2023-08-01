const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const createUser = async (req, res) => {
    const body = req.body;
    console.log(body);
    if (Object.keys(req.body).length === 0){
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

const retreiveUsers = async (req, res) => {
    console.log("On retreiving users route");
    await User.find({}).then((value)=> {
        console.log(value);
        res.json(value);
    }).then((e) => {
        res.status(400).json(`message: ${error.message}`);
    });

}

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
    }).then((e) => {
        res.status(400).json(`message: $(e.message)`);
    });

}

const signUp = (req, res) => {
    const body = req.body;
    console.log(body);
    if (Object.keys(body).length === 0){
        res.status(400).json("message: you didnt provide any data");
    } else {
        bcrypt.hash(body.password, 10, async function(err, hash){
            if(err){
                console.log("Some thing we wrong");
                res.status(400).json("message: error");
            } else {
                const userInfo = new User({
                    name: body.name,
                    email: body.email,
                    password: hash,
                }).then((e) => {
                    res.status(400).json("message: ${e.message}");
                });
                await userInfo.save().then((value) => {
                    console.log(value);
                    res.json(value);
                });
            }
        });
    }
}

const logIn = async (req, res) => {
    const body = req.body;
    const {email, password} = body;
    console.log(body);
    if (Object.keys(body).length === 0) {
        res.status(400).json("message:no data provided");
    } else {
        await User.findOne({email}).then((value) => {
            console.log(value);
            console.log(err);
            bcrypt.compare(password, value.password, function (err, result){
                if (err){
                    res.status(400).json("message: something went wrong");
                } else {
                    console.log(result);
                    res.json(`Do passwords match, ${result}`);
                }
            });
        }).catch((e) => {
            res.status(400).json(`message: ${e.message}`);
        })
    }

}


module.exports = {createUser, retreiveUsers, retreiveSingleUser, signUp, logIn};