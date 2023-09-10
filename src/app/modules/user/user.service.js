const userModel = require('./user.model')
const baseController = require('../../_helpers/base');
const baseCtrl = new baseController();

class userService {

    getAll = async () =>{
        let allUsers = await userModel.find().select("-password");
        return allUsers
    }

    create = async (userData) =>{
        let userCreated = baseCtrl.insert(userModel, userData)
        return userCreated
    }

}

module.exports = userService;