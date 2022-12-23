R1: Home page:
lines 11-14 - main.js
views folder - index.ejs
Implemented the home page containing the links for all the pages in recipe buddy dynamic web application

R2: About page: 
lines 15-18 - main.js
views folder - about.ejs
Implemented the About Page - Contains a short description of the website and the developer name.

R3: Register page:

R3A: Display a form to users to add a new user to the database. The form should consist of the following items: first name, last name, email address, username, and password.  Display a link to the home page or a navigation bar that contains links to other pages.

R3B:  Collect form data to be passed to the back-end (database) and store user data in the database. Each user data consists of the following fields: first name, last name, email address, username and password. To provide security of data in storage, a hashed password should only be saved in the database, not a plain password.

R3C: Display a message indicating that add operation has been done.

R4: Login page:


R4A: Display a form to users to log in to the dynamic web application. The form should consist of the following items: username and password.  Display a link to the home page or a navigation bar that contains links to other pages.

R4B: Collect form data to be checked against data stored for each registered user in the database. Users are logged in if and only if both username and password are correct. 

R4C: Display a message indicating whether login is successful or not and why not successful.

R5: Logout

There is a way to logout, a message is displayed upon successful logout.

R6: Add food page (only available to logged-in users):

R6A: Display a form to users to add a new food item to the database. 

Here is an example of a food item, showing the fields that should be on the form and example values:

Name: flour
Typical values per:100
Unit of the typical value: gram
Carbs: 81 g
Fat: 1.4 g
Protein: 9.1 g
Salt: 0.01 g
Sugar: 0.6 g

This is saying that 100 grams of flour has 81g carbs, 1.4g fats, etc.  The unit of the typical value could also be things like litre, tablespoon, cup, etc.

Display a link to the home page or a navigation bar that contains links to other pages.
R6B:  Collect form data to be passed to the back-end (database) and store food items in the database. 

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
