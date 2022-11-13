const User = require('../model/User');

//create users
exports.createUser = async (req, res) => {
try {
    let user = await req.body;
    let created = await User.create(user);
    if (!created) 
        return res.status(400).json({
            success: false,
            message: "User creation failed."
        })
    return res.status(201).json({
        success: true,
        message: "User successfully created.",
        user: created
    })
}
catch (error) {
    res.status(500).json({
        success: false,
        message: "Internal Server Error.",
        error: error.message
    });  
}
};

//get all users
exports.getAllUsers = async (req, res) => {
    try {
        let users = await User.find();
        if(users.length === 0) 
            return res.status(404).json({
                success: false,
                message:"No User found.",
            })
        res.status(200).json({
            success: true,
            message: "All Users!",
            users,
            count: users.length
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

//get a single user
exports.getUser = async (req, res) => {
    try {
        let id = { _id: req.params.id};
        let user = await User.findOne(id);
        if (!user) 
            return res.status(404).json({
                success: false,
                message: "User not found."
             })
        res.status(200).json({
            success: true,
            message: "User found.", 
            user,
        });
    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error.",
            error: error.message
        })
    }
}

//update users
exports.updateUser = async (req, res) => {
    try {
        let id = { _id: req.params.id};
        let user = await req.body;
        let update = await User.findOneAndUpdate(id, user, {new: true});

        if (!update)
            return res.status(400).json ({
                success: false,
                message: "User not updated.",
            });
        return res.status(200).json({
            success: true,
            message: "User has been successfully updated.", 
            user: update,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error.",
            error: error.message
        })
    }
}

//delete users
exports.deleteUser = async (req, res) => {
    try {
        let id = {_id: req.params.id}
        let deleted = await User.findOneAndRemove(id);
        if (!deleted)
            return res.status(400).json ({
                success: false,
                message: "Failed to delete user.",
            });
        return res.status(400).json ({
            success: true,
            message: "User has been successfully deleted."
        })
    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error.",
            error: error.message
        })
    }
}