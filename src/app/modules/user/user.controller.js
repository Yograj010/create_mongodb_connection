const bcrypt = require('bcrypt');
const baseCtrl = require("../../_helpers/base");
const config = require("../../_helpers/config");
const UserServices = require('./user.service');
const userService = new UserServices();
const uploadImage = require('../../_helpers/uploadBase64Image')
const uploadImg = new uploadImage();

class userController extends baseCtrl {
  constructor() {
    super();
  }

  getAllUsers = async (req, res) => {
    let resObj;
    try {
      let allUsers = await userService.getAll()

      if(allUsers.length < 1){
        resObj = {
          message: "NO users found",
          errorDetails: {},
        }
        return this.errorResponse(res, 400, resObj)
      }

      resObj = {
        message: "All users fetched successfully",
        data: allUsers
      };

      return this.successResponse(res, resObj);
    } catch (err) {
      // console.log("//debug:-catch- getAllUsers:- ", err);
      resObj = {
        message: config.globalErrMsg,
        errorDetails: err.stack,
      };

      return this.errorResponse(res, 500, resObj);
    }
  };

  createUser = async (req, res) =>{
    let resObj;
    try{

      const salt = bcrypt.genSaltSync(parseInt(config.saltRounds));
      const hash = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hash

      let isUserCreated = await userService.create(req.body);
      
      if(!isUserCreated){
        resObj = {
          message: "Something went wrong while creating user",
          errorDetails: {}
        }
        return this.errorResponse(res, 500, resObj)
      }

      resObj = {
        message: "User created successfully",
        data: isUserCreated
      }
      
      return this.successResponse(res, resObj)
    }catch(err){
      // console.log("//debug:-catch--createUser:-",err)
      resObj = {
        message: config.globalErrMsg,
        errorDetails: err.stack,
      }

      return this.errorResponse(res, 500, resObj)
    }
  }

  //In this api you need to provide base64 type data
  uploadImage = async (req, res) => {
    let resObj;
    try{
      let isImageUploaded = await uploadImg.uploadImageBase64Middleware(req, res)

      if(!isImageUploaded.success){
        return this.errorResponse(res, isImageUploaded.statusCode, isImageUploaded.error)
      }

      return this.successResponse(res, isImageUploaded.result)
    }catch(err){
      // console.log("//debug:-catch--createUser:-",err)
      resObj = {
        message: config.globalErrMsg,
        errorDetails: err.stack,
      }

      return this.errorResponse(res, 500, resObj)
    }
  }

}
module.exports = userController;
