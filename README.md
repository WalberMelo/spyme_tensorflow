# SpyMe

The SpyMe is a web application that utilizes a webcam to detect objects, focusing specifically on identifying people through a machine learning model. It triggers notifications when a person is detected in the video feed.

![Project Image](/Users/walbermelo/Desktop/TensorFlowJS/smart_webcam/Project.png)

## Features

- **Real-time Object Detection:** Utilizes a webcam to perform object detection in real-time using a pre-trained machine learning model (COCO-SSD).
- **Server Communication:** Sends HTTP requests to a server when a person is detected in the video feed.
- **Email Notifications:** Upon receiving a detection signal, the server sends an email notification to alert users of the person's presence.
- **Throttle Mechanism:** Implements a cooldown period of 10 minutes between consecutive email notifications to prevent excessive emails.

## How It Works

1. **Webcam Activation:** Users activate the webcam through the web interface.
2. **Object Detection:** The machine learning model continuously analyzes the video feed, detecting objects, and specifically looking for people.
3. **Server Interaction:** When a person is identified, the application sends an HTTP request to a server indicating the detection.
4. **Email Alert:** The server, upon receiving the signal, sends an email notification to inform users of the detected person's presence.
5. **Cooldown Period:** To prevent spamming notifications, a 10-minute cooldown is enforced between successive email alerts for continuous detections.

## Setup Instructions

1. Clone this repository.
2. Install dependencies by running `npm install`.
3. Configure environmental variables for the server and email service (if using).
4. Run the application using `npm start`.

## Requirements

- Supported browsers with access to webcam functionality.
- Node.js installed for running the application.

## Technologies Used

- TensorFlow.js for object detection.
- Express.js for the server.
- Nodemailer for sending email notifications.
