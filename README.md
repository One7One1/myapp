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
Implemented the Register Page - /register route was used to render the resister.ejs file. 

/registered route in the main.js file contains all the validation of the user
input for the registration form. New user details were added to the database using the insert mysql query and bcrypt was used to convert and compare password and hash passwords in the database. req.sanitize was used on user input to avoid cyber attacks like SQL injection, xss etc. And a message was displayed indicating that add operation has been done.

R4: Login page:
lines 281-336 - main.js
views folder - login.ejs
Implemented the Login Page - /login route was used to render the resister.ejs file. 

In the /loggedin route the password and username validation cheks were done to check if it meets the necessary requirements before authenticating the user. The hashed password was checked against the username in the table to authenticate the user using the mysql select query. bcrypt.compare was used to compare the password typed in by the user with the hashpassword stored in the database. Upon successful authentication a password correct message along with homepage was shown to the user and a failed authentication would show a password incorrect message with hompage link.

R5: Logout
lines 338-348 - main.js
Implemented logout - /logout route - req.session.destroy was used to delete session from the database. And upon successful logout a message was displayed with a link to the homepage.

R6: Add food page (only available to logged-in users):

lines 124-165 - main.js
views folder - addfood.ejs
Implemented the Addfood Page - /addfood route was used to render the addfood.ejs file. 

/foodadded route does validation checks for all the food values the user wants to add to the database. The user input is added to the database using the SQL query "INSERT INTO table_name ... VALUES ....;".The username of the user entering the food is automatically added to the database using req.session.userid. Upon successfully adding the food to the database a message is displayed with a link to the homepage. 

R7: Search food page 
lines 19-47 - main.js
views folder - search.ejs

Implemented the Search Page - /search route was used to render the search.ejs file. 

/search-result route is used to render the list.ejs file which displays the searched food item in a tabular format. "SELECT * FROM nutridata WHERE foodprod LIKE '%" + req.query.keyword + "%'"; - displays all the food items even if the complete food name is not searched. 
The list.ejs file is used to extract data from the database. If the searched food item does not correspond to anything stored in the database the page returns "no data found!" to the user. 

R8: Update food page (only available to logged-in users)

lines 167-240 - main.js
views folder - updatesearch.ejs, updatefood.ejs

updatesearch.ejs file contains the search form and a link to the homepage. updatefood.ejs file contains a form which  displays the extracted data about the searched food item to the users for updation. It also contains a post method which allows the user to type in the unique id that corresponds to the food item to delte an entry from the database.

/updatesearch route is used to render the updatesearch.ejs file. And redirectLogin is used to only allow access for loggedin users to the update page. A validation check is also implemented to check if the search field is left empty.

/updatesearch-result route is used to render the updatefood.ejs file. The sql query "SELECT * FROM nutridata WHERE foodprod LIKE '%" + req.query.keyword + "%' AND username = '" + req.session.userId + "'"; is used to obtain the details of the food searched from the database and only display it to the user who had made the food entry to the database. This route also does all the validation and sanitization checks for the food updated by the user before passing it through to the database for storage.But, if the search did not yield a match from the database or if the loggedin user was not the user who created the food entry then the page displays "No data found!" to the user with a link to the homepage. If the updation was done successfully by the original user then a message is displayed indicating the successful updation of the food product and a link to the homepage is provided.

/deletefoodnow route is used to enable the user who created the food entry into the database to delete the entry from the database. This was made possible using an if else statements and using 2 sql queries.The first SQL query "SELECT username FROM nutridata WHERE id =?"; obtains the username from the table where the food id corresponding to the food being searched for updation is stored. And if the username obtained matches the req.session.userId then the second SQL query "DELETE FROM nutridata WHERE id = ?" is executed, and a message showing successful deletion of entry from database is shown to the user along with a link back to the homepage. If the username does not match the req.session.userId then the user is redirected back to the homepage. This way only the user who made the food entry is allowed to delete the food.


R9: List food page
lines 109-122 - main.js
views folder - list.ejs

The list.ejs file is used to extract data from the database and display it in a tabluar format.

/list route is used to render the list.ejs file and redirectLogin has been implemented to make this list page available to only loggedin users. The sql query "SELECT * FROM nutridata"; is used to obtain all the details stored in the table.

R10: API
lines 351-381 - main.js

/api route
sql query "SELECT * FROM nutridata"; is used to display all the data from the database.
sql query "SELECT * FROM nutridata WHERE foodprod LIKE '%" + req.query.keyword + "%'"; is used to show only details of that food entry which matches the keyword inputed by the user.
And res.json(result) - is used to display all the data in the json format.
If - Else statements are used to decide which sql statement to execute depending on user input.

R11: Form Validation - All form data has been validated - /registered, /loggedin, /updatefoodnow, /foodadded.

R12: 
The dynamic web application has been implemented in Node.js on the virtual server. 
https://doc.gold.ac.uk/usr/684/
The back-end of the web application is done in MySQL. 
<img src="https://github.com/One7One1/myapp/blob/main/2022-12-23%20(3).png" alt="Alt text" title="Optional title">


ENTITY RELATIONSHIP DIAGRAM
<img src="2022-12-23 (2).png" alt="Alt text" title="Optional title">
