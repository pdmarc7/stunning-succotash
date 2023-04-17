# Use the official Python image as the base image
FROM python:3.9

# Allow statements and log messages to immediately appear in the Knative logs
ENV PYTHONUNBUFFERED True

ENV GOOGLE_APPLICATION_CREDENTIALS="marcello-349916-693990f1bdfa.json"

# Copy local code to the container image.
ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . ./

# Copy the requirements.txt file
COPY requirements.txt ./

# Install the dependencies
RUN pip install -r requirements.txt
RUN pip install gunicorn


# Start the application
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 app:app
