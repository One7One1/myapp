R1: Home page:
lines 11-14 - main.js
views folder - index.ejs
Implemented the home page containing the links for all the pages in recipe buddy dynamic web application

R2: About page: 
lines 15-18 - main.js
views folder - about.ejs
Implemented the About Page - Contains a short description of the website and the developer name.

R3: Register page:
lines 48-107 - main.js
views folder - register.ejs
Implemented the Register Page - /register route was used to render the resister.ejs file. /registered route in the main.js file contains all the validation of the user
input for the registration form. New user details were added to the database using the insert mysql query and bcrypt was used to convert and compare password and hash passwords in the database. req.sanitize was used on user input to avoid cyber attacks like SQL injection, xss etc. And a message was displayed indicating that add operation has been done.

R4: Login page:
lines 281-336 - main.js
views folder - login.ejs
Implemented the Login Page - /login route was used to render the resister.ejs file. In the /loggedin route the password and username validation cheks were done to check if it meets the necessary requirements before authenticating the user. The hashed password was checked against the username in the table to authenticate the user using the mysql select query. bcrypt.compare was used to compare the password typed in by the user with the hashpassword stored in the database. Upon successful authentication a password correct message along with homepage was shown to the user and a failed authentication would show a password incorrect message with hompage link.

R5: Logout
lines 338-348 - main.js
Implemented logout - /logout route - req.session.destroy was used to delete session from the database. And upon successful logout a message was displayed with a link to the homepage.

R6: Add food page (only available to logged-in users):

lines 124-165 - main.js
views folder - addfood.ejs
Implemented the Addfood Page - /addfood route was used to render the addfood.ejs file.

Going beyond by saving the username of the user who has added this food item to the database. [3 marks]

R6C: Display a message indicating that add operation has been done.

R7: Search food page 

R7A: Display a form to users to search for a food item in the database. 'The form should contain just one field - to input the name of the food item'. Display a link to the home page or a navigation bar that contains links to other pages.

R7B:  Collect form data to be passed to the back-end (database) and search the database based on the food name collected from the form. If food found, display a template file (ejs, pug, etc) including data related to the food found in the database to users. Display a message to the user, if not found.

R7C: Going beyond, search food items containing part of the food name as well as the whole food name. As an example, when searching for ‘bread’ display data related to ‘pitta bread’, ‘white bread’, ‘wholemeal bread’, and so on. [6 marks]

R8: Update food page (only available to logged-in users)

R8A: Display search food form. Display a link to the home page or a navigation bar that contains links to other pages.

R8B: If food found, display all data related to the food found in the database to users in forms so users can update each field. Display a message to the user if not found. Collect form data to be passed to the back-end (database) and store updated food items in the database. Display a message indicating the update operation has been done. 

You can go beyond this requirement by letting ONLY the user who created the same food item update it. [3 marks]

R8C: Implement a delete button to delete the whole record, when the delete button is pressed, it is good practice to ask 'Are you sure?' and then delete the food item from the database, and display a message indicating the delete has been done. 

You can go beyond this requirement by letting ONLY the user who created the same food item delete it. [3 marks]

R9: List food page (available to all users)

R9A: Display all fields for all foods stored in the database. Display a link to the home page or a navigation bar that contains links to other pages.

R8B: You can gain more marks for your list page is organised in a tabular format instead of a simple list.

R9C: going beyond by letting users select some food items (e.g. by displaying a checkbox next to each food item and letting the user input the amount of each food item in the recipe e.g. 2x100 g flour). Then collect the name of all selected foods and calculate the sum of the nutritional information related to all selected food items for a recipe or a meal and display them as ‘nutritional information of a recipe or a meal’. Please note, it is not necessary to store recipes or meals in the database. [6.5 marks]

R10: API
There is a basic API displayed on '/api' route listing all foods stored in the database in JSON format. i.e. food content can also be accessed as JSON via HTTP method, It should be clear how to access the API (this could include comments in code). Additional credit will be given for an API that implements get, post, put and delete.

R11: form validation
All form data should have validations, examples include checking password length, email validation, integer data is integer and etc. 
R12: Your dynamic web application must be implemented in Node.js on your virtual server. The back-end of the web application could be MongoDB or MySQL. Make sure you have included comments in your code explaining all sections of the code including database interactions.



ER DIAGRAM
<img src="2022-12-23 (2).png" alt="Alt text" title="Optional title">
