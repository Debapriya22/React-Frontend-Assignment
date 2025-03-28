** EmployWise Frontend Assignment **

# This is a React application that integrates with the Reqres API to perform basic user management tasks. The app allows users to log in, view a paginated list of users, edit user details, and delete users. 

1) Features
   # User Authentication - Login using credentials and store the token
   # User List - Fetch and display users in a structured table
   # Edit User Details - Modify first name, last name, and email
   # Delete Users - Remove users from the list
   # Error Handling - Shows appropriate success or error messages
   # Pagination - Navigate through user lists

2) Tech Stack
# React - Frontend framework

# Axios - HTTP requests

# React Router - Navigation

# Reqres API - Mock API for users

3) Setup & Installation
# Clone the Repository
git clone https://github.com/yourusername/employwise-frontend.git
cd employwise-frontend
# Install Dependencies
npm install
# Start the Development Server
npm start
The app will be available at http://localhost:3000

4) Login Credentials
# Use the following credentials to log in:
# Email: eve.holt@reqres.in
# Password: cityslicka

5) How to Use
# Login with the credentials above.
# View Users - See a paginated list of users.
# Edit Users - Click "Edit" to modify a user’s details.
# Delete Users - Click "Delete" to remove a user.
# Pagination - Use "Next" and "Previous" buttons to navigate.

6) API Endpoints Used
# Action	Method	Endpoint	Description
# Login	POST	/api/login	Logs in a user
# Fetch Users	GET	/api/users?page=1	Retrieves user list
# Update User	PUT	/api/users/{id}	Updates user details
# Delete User	DELETE	/api/users/{id}	Removes a user
# API Base URL: https://reqres.in/

7) Troubleshooting
# Issue: Error: error:0308010C:digital envelope routines::unsupported
# Fix: Run this command before starting the project:

# set NODE_OPTIONS=--openssl-legacy-provider

# Issue: App not loading?
# Fix:

# rm -rf node_modules package-lock.json
# npm install
# npm start
