const AWS = require('aws-sdk');
const fs = require('fs');

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const sagemakerRuntime = new AWS.SageMakerRuntime();

exports.transcribe = async (req, res) => {
  try {
    const audioFile = req.file;
    if (!audioFile) {
      return res.status(400).json({ error: 'No audio file provided' });
    }

    // Read the file content
    const fileContent = fs.readFileSync(audioFile.path);

    // Prepare the input for the SageMaker endpoint
    const params = {
      EndpointName: process.env.ASR_ENDPOINT_NAME,
      ContentType: 'audio/wav',
      Body: fileContent
    };

    // Invoke the SageMaker endpoint
    const response = await sagemakerRuntime.invokeEndpoint(params).promise();

    // Parse the response
    const transcription = JSON.parse(response.Body.toString());

    // Delete the temporary file
    fs.unlinkSync(audioFile.path);

    res.json({ transcription });
  } catch (error) {
    console.error('Error in ASR:', error);
    res.status(500).json({ error: 'An error occurred during transcription' });
  }
};
