# Use Python base image
FROM python:3.10-slim

# Set work directory
WORKDIR /app

# Install Python dependencies
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# Copy project files to container
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Start the backend server
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]