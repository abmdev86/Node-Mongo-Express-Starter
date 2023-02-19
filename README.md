# MERN Stack - Mongo, Express Node 
## Server ##
*NOTE: You will need to provide your own MongoDB ConnectionString*

## Get Started with [MongoAtlas](https://cloud.mongodb.com/)
---
You can fork or download the zip of this repo to get started 
---
1. Create a free account
2. setup your user 
    - click on the Database Access link on the left (this will prompt you to add a new database user). 
    - Click on the "Add New Database User" button and a Add New Database User dialogue box will open.
    - I used Password login. You can select an appropriate choice or go with Passwords.
    - Click 'Add User' to complete the process.
3. Create a Cluster On the side menu, click on Database. This brings you to the Database page with a button: '+ Create' to the right.
    - Choose the free cluster. 
4. Click Network access. You will need to whitelist your IP address or accept any IP address (Not Recommended)
5. Connect to the Database. Click on 'Database' to navigate to the Database page and click on the 'Connect' Button. 
    - Select the connection option 'Connect Your Application'
        - Ensure the driver version is Node 3.6 or later.
        - Connect string example ```mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbName>?retryWrites=true&w=majority```
        - Replace Password with the password for the username user
        - dbName is needed to connect to that specific table.

6. Create a database table
     - In the dialogue box that comes up, enter a database name and a collection name.
7. Create a file in the root folder and name it ```.env```.
    - Create a variable like ```DB_URL``` and assign the connection string to it
    ```
    
    DB_URL=mongodb+srv://plenty:RvUsNHBHpETniC3l@cluster0.z3yuu.mongodb.net/authDB?retryWrites=true&w=majority
    ```
8. The .db/dbConnect.js holds the mongoose connection method used. It is setup to read the .env connection string when connecting to the database.