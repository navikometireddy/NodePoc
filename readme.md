Node POC : Getting top page views from Google analytics API

prerequiste :

Set up a new project in the Google Cloud Console:

- Go to the Google Cloud Console (https://console.cloud.google.com).
- Create a new project or select an existing project.
- Enable the Google Analytics API for your project.
- Create credentials (OAuth 2.0 client ID) for your project, and note down the client ID and client secret.

Set up your Node.js project:

- Create a new directory for your project.
- Initialize a new Node.js project with npm init and follow the prompts.
- Install necessary dependencies by running npm install express googleapis.
- Set up the Express server and Google Analytics API client:

Create an app.js file in your project directory.
Import the required modules:
const express = require('express');
const { google } = require('googleapis');

Steps to Run the project:
npm start

Create a project in GCP console and create service account and save credentials as json file
![Alt text](images/ga7.png)

Subscribe GA API
![Alt text](images/ga6.png)


adding service account in google analtics 
![Alt text](images/ga8.png)

Real time google analytics overview
![Alt text](images/ga1.png)

Created account proprty and view
![Alt text](images/ga2.png)

View id and settings
![Alt text](images/ga3.png)

creating Tag and publishing tag
![Alt text](images/ga4.png)

Pusging data to google analytics
![Alt text](images/ga5.png)

