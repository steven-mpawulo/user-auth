const User = require('../models/userModel');
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
        });
        

    }
    console.log("On create user route");
};

const retreiveUsers = async (req, res) => {
    console.log("On retreiving users route");
    await User.find({}).then((value)=> {
        console.log(value);
        res.json(value);
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
    });

}


module.exports = {createUser, retreiveUsers, retreiveSingleUser};