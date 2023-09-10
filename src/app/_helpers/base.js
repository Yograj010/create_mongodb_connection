const fs = require('fs');

class baseController {
  constructor() {}

  /*-------inserts_new_record_in_collection_of_mongoDb------*/
  insert = async (model, data)=> {
    let createdData = await model.create(data);
    return createdData;
  }

  /*---Fetches_all_data_from_a_specific_collection_of_mongoDb---*/
  getAllRecords = async (model) => {
    let allrecords = model.find();
    return allrecords;
  }

  /*------Uploads_file to_'uploadPath'------*/
  uploadFile = async (uploadPath, fileName, file, encoding_method) => {
    try{
      //This Will create a directory at the 'uploadPath' if directory is not present
      if(!fs.existsSync(uploadPath)){
        fs.mkdirSync(uploadPath, {recursive: true});
      }
      //This will upload provided 'file' at the 'uploadedPath' with 'fileName'
      fs.writeFileSync(uploadPath + fileName, file, encoding_method);
      return {success: true}
    }catch(err){
      return {
        statusCode: 500,
        success:false,
        error: {
          errorDetails: err.stack
        }
      }
    }
  }

  /*--------returns_success_response--------*/
  successResponse = async (res, data = {}) => {
    let response = {
      statusCode: 200,
      success: true,
      error: null,
      result: data,
    };
    return res.status(response.statusCode).json(response);
  };

  /*--------returns_error_response--------*/
  errorResponse = async (res, status, error = null) => {
    let response = {
      statusCode: status,
      success: false,
      error: error,
      result: {},
    };
    return res.status(response.statusCode).json(response);
  };
  
}

module.exports = baseController;
