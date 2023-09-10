const baseController = require("./base");
const baseCtrl = new baseController();
const mime = require("mime");
const config = require("./config");
const moment = require("moment");

class uploadImage {
  constructor() {}

  /*--------upload_base64_format_image------------------------*/
  //2. checks if input dataString is a valid base64Image, if yes then returns data and type as resposne object
  isValidBase64File = async (dataString) => {
    let resObj;
    try {
      const base64Data = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (base64Data.length != 3) {
        resObj = {
          statusCode: 400,
          success: false,
          error: {
            message: "Please provide a valid base64 file",
            errorDetails: {},
          },
        };
        return resObj;
      }

      resObj = {
        statusCode: 200,
        success: true,
        result: {
          message: "It is a valid base64 file",
          data: {
            type: base64Data[1],
            imageData: new Buffer.from(base64Data[2], "base64"),
          },
        },
      };

      return resObj;
    } catch (err) {
      resObj = {
        statusCode: 500,
        success: false,
        error: {
          message: config.globalErrMsg,
          errorDetails: err.stack,
        },
      };
      return resObj;
    }
  };

  //1. upload image function
  uploadImageBase64Middleware = async (req) => {
    let resObj;
    try {
      //validating & decoding base64 file
      let decodedImage = await this.isValidBase64File(req.body.image);

      if (!decodedImage.success) {
        return decodedImage;
      }

      //list of allowed image type
      const allowedMimes = [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/gif",
      ];

      //validating allowed file(image) type
      if (allowedMimes.indexOf(decodedImage.result.data.type) < 0) {
        resObj = {
          statusCode: 400,
          success: false,
          error: {
            message:
              "Invalid file-type found, only 'jpg', 'jpeg', 'png' and 'gif' is allowed",
            errorDetails: {},
          },
        };
        return resObj;
      }

      //fetching file(image) extension from the base64 file
      const fileExtension = mime.getExtension(decodedImage.result.data.type);

      //creating imageFile Name
      let date = moment(new Date()).format("YYYY-MM-DD_HH:mm:ss");
      let fileName = date + "." + fileExtension;

      //path where all the files(images) will be uploaded
      let isFileUploaded = await baseCtrl.uploadFile(
        config.uploadFilePath,
        fileName,
        decodedImage.result.data.imageData,
        config.fileEncodingMethod
      );
      if (!isFileUploaded.success) {
        resObj = isFileUploaded;
        resObj.error.message = config.globalErrMsg;
        return resObj;
      }
      let uploadedFileUrl =
        `${req.protocol}://${req.get("host")}/assets/uploaded-files/images/` +
        fileName;
      return {
        statusCode: 200,
        success: true,
        result: {
          message: "Image uploaded successfully",
          data: {
            imageUrl: uploadedFileUrl,
          },
        },
      };
    } catch (err) {
      resObj = {
        statusCode: 500,
        success: false,
        error: {
          message: config.globalErrMsg,
          errorDetails: err.stack,
        },
      };
      return resObj;
    }
  };
  /*--------------------------------*/
}

module.exports = uploadImage;
