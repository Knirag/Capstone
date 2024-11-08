## Local Government Mobile App ##
This application is designed to facilitate communication between local government leaders and their constituents. The app allows leaders to manage their constituents, send notifications, and view important analytics.

## Table of Contents ##
Features
Installation
Usage
File Structure
Demo
Deployed Version
License
Acknowledgements

## Features ##
User authentication (login/signup)
Manage constituent information
Send notifications to constituents
View analytics related to constituents
Event scheduling with calendar view
Push notifications for important updates
Feedback and support system

## Installation ##
Follow these steps to install and run the application locally:

Clone the repository:
git clone https://github.com/Knirag/Capstone
cd capstone

** For web review **
cd web
cd Admin-Portal
npm install
npm run dev

** For Mobile App **
cd Mobile
cd front
npm install 
npx expo start

** For Backend **
cd Backend
npm start 

## Prototypes: ##
Figma: https://www.figma.com/design/gtIIUeuVkXK11RH1BpDBNS/Citizen-RW-App?node-id=18-1043&node-type=frame&t=y6cKRTc6Vn1dwpYL-0

## Database Schema: ##
Login Required to View: https://lucid.app/lucidchart/d3c90593-a0b0-4b18-995a-09a6fd6a5728/edit?viewport_loc=-321%2C-332%2C2956%2C1192%2C0_0&invitationId=inv_514cc1fd-239d-485d-98be-e29a5e671646


## Deployment Plan

The deployment process for this application consists of three main components: the mobile application, the admin portal website, and the backend. The **mobile application** will be built as an APK file for Android, distributed through Google Play or direct download from a secure server, allowing users easy access to install the app on their devices. The **admin portal** website will be hosted on a cloud service like **Vercel** or **Netlify** for efficient, high-availability access by local government leaders managing user interactions. The **backend API**, responsible for handling data and processing requests, will be deployed on **DigitalOcean**, utilizing a managed PostgreSQL or MySQL database and virtual machine (droplet) for a scalable, secure, and cost-effective solution. This setup ensures reliable data storage, robust performance, and smooth communication between the mobile app, website, and backend API, meeting the needs of end-users and admins alike.


## Video demo(5mins) ##

Initial Prototype: 





