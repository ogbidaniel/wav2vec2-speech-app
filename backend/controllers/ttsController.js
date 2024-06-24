const AWS = require('aws-sdk');

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const sagemakerRuntime = new AWS.SageMakerRuntime();

exports.synthesize = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'No text provided' });
    }

    // Prepare the input for the SageMaker endpoint
    const params = {
      EndpointName: process.env.TTS_ENDPOINT_NAME,
      ContentType: 'application/json',
      Body: JSON.stringify({ text })
    };

    // Invoke the SageMaker endpoint
    const response = await sagemakerRuntime.invokeEndpoint(params).promise();

    // Parse the response and send the audio data
    const audioBuffer = Buffer.from(response.Body);
    res.set('Content-Type', 'audio/wav');
    res.send(audioBuffer);
  } catch (error) {
    console.error('Error in TTS:', error);
    res.status(500).json({ error: 'An error occurred during speech synthesis' });
  }
};
