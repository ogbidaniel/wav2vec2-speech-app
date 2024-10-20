import boto3

def transcribe_audio(audio_data):
    client = boto3.client('runtime.sagemaker')
    response = client.invoke_endpoint(
        EndpointName='your-endpoint-name',
        ContentType='audio/wav',
        Body=audio_data
    )
    result = response['Body'].read()
    return result.decode('utf-8')