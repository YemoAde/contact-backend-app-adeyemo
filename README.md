
Contact/Address Book (Rest Backend) Concept - Assessment
===

You will be tasked with creating a nodejs based REST application which will serve as a data source for an existing Contact/Address book web and mobile application.
The application will expose two rest resources
- Auth Resource – This will handle endpoints for authentication which will include, login, signup etc
- Contact Resource – This will handle CRUD endpoints for managing a user’s contact list. All endpoints in this resource should only be accessed by an authenticated and authorized user.
The project will persist data to a mongodb database. This database will already be configured in the project.

What we are testing
--

- Express Project Structure Comprehension
- Rest API Authentication
- Rest API Endpoint Nomenclature
- JavaScript ECMA standards 
- Data Persistence (MongoDB)

What you will be given
--

You will be provided with an initial project which will need to completed. The project contains annotations which will serve as hints which should point you in the right direction when implementing missing endpoints and logic.
The project structure is shown below.

Go through the code to understand the structure before you start.
Note:
The assessment project uses babel to transpile ES6/ES7 to ES5

Get Ready to Run
---
- Install the projects dependencies 
    - > `npm install`
    
- Create .env file from .evn.example
    - > DB_USER = mongo_user_name
    - > DB_PASS = mongo_user_password
    - > JWT_SECRET = a_secret

- Run compiled version.
    - > `npm run start`

Start Development 
---

- To build the project
    - > `npm run build`
- To continuously watch for changes 
    - > `npm run watch`

Submitted
--

