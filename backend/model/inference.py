import logging  
import json  
import torch 

from transformers import Wav2Vec2ForCTC  # Import Wav2Vec2 model for CTC (Connectionist Temporal Classification)
from transformers import Wav2Vec2Processor  # Import Wav2Vec2 processor for preprocessing audio data

# Set up logging configuration
logger = logging.getLogger()
logger.setLevel(logging.INFO)  # Set logging level to INFO
logger.addHandler(logging.StreamHandler())  # Add a StreamHandler to output logs to the console

# Define the path to the pre-trained model
model_path = '/opt/ml/model'
logger.info("Libraries are loaded")  # Log that the libraries have been loaded

def model_fn(model_dir):  # Define the function to load the model for inference
    device = get_device()  # Get the device (CPU or GPU) to run the model on
    
    # Load the pre-trained Wav2Vec2 model and move it to the appropriate device
    model = Wav2Vec2ForCTC.from_pretrained(model_path).to(device) 
    logger.info("Model is loaded")  # Log that the model has been loaded
    
    return model  # Return the loaded model

def input_fn(json_request_data, content_type='application/json'):  # Define the function to process input data
    # Load and parse the input JSON data
    input_data = json.loads(json_request_data)
    logger.info("Input data is processed")  # Log that the input data has been processed

    return input_data  # Return the processed input data

def predict_fn(input_data, model):  # Define the function to run inference on the input data
    logger.info("Starting inference.")  # Log that inference is starting
    device = get_device()  # Get the device (CPU or GPU) to run the model on
    
    logger.info(input_data)  # Log the input data
    
    # Extract speech array and sampling rate from input data
    speech_array = input_data['speech_array']
    sampling_rate = input_data['sampling_rate']
    
    # Load the processor and process the input speech array
    processor = Wav2Vec2Processor.from_pretrained(model_path)   
    input_values = processor(speech_array, sampling_rate=sampling_rate, return_tensors="pt").input_values.to(device)
    
    with torch.no_grad():  # Disable gradient computation for inference
        logits = model(input_values).logits  # Get the model predictions (logits)
    pred_ids = torch.argmax(logits, dim=-1)  # Get the predicted token IDs
    transcript = processor.batch_decode(pred_ids)[0]  # Decode the predicted IDs to get the transcript

    return transcript  # Return the predicted transcript

def output_fn(transcript, accept='application/json'):  # Define the function to format the output
    return json.dumps(transcript), accept  # Return the transcript as a JSON response

def get_device():  # Define the function to get the device (CPU or GPU)
    device = 'cuda:0' if torch.cuda.is_available() else 'cpu'  # Check if GPU is available, otherwise use CPU
    return device  # Return the device