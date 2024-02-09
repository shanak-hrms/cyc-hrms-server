const {s3}=require("../services/awsConfig")
const {generateRandomID}=require("../services/randomId")


const bucketName = 'your-bucket-name';
const key = 'hr_induction_document.pdf';

exports.downloadSalesInduction = async (req, res) => {
  try {
    const getObjectParams = {
        Bucket: bucketName,
        Key: imageName,
      };
      const getCommand = new GetObjectCommand(getObjectParams);
      signedUrl = await getSignedUrl(s3, getCommand, { expiresIn: 3600 });
    res.redirect(signedUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.uploadSalesInduction = async (req, res) => {
  try {
    const file = req.file;  
    const {fileDescription,fileName}=req.body
    let fileUrl
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    if (file) {
      const randomID = generateRandomID();
      fileUrl = randomID + file.originalname;
      const params = {
        Bucket: bucketName,
        Key: fileUrl,
        Body: image.buffer,
        ContentType: image.mimetype,
      };

      const command = new PutObjectCommand(params);
      await s3.send(command);
    }

    const inductionObj={
      fileName,fileDescription,fileUrl
    }
    const uploadHRInductionFile=new HRInduction(inductionObj)
    if(!uploadHRInductionFile){
      throw new Error()
    }

    res.status(200).json({ message: 'HR induction document uploaded successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};