module.exports = function (app, shopData) {

    const redirectLogin = (req, res, next) => {
        if (!req.session.userId) {
            res.redirect('./login')
        } else { next(); }
    }

    const { check, validationResult } = require('express-validator');

    // Handle our routes
    app.get('/', function (req, res) {
        res.render('index.ejs', shopData)
    });
    //About page route
    app.get('/about', function (req, res) {
        res.render('about.ejs', shopData);
    });
    //Search route
    app.get('/search', [check('keyword').notEmpty()],
        function (req, res) {
            res.render("search.ejs", shopData);
        });
    //search-result route
    app.get('/search-result', function (req, res) {
        //searching in the database
        
        //SQL query to select all food names in the database that match the user inputed keyword.
        let sqlquery = "SELECT * FROM nutridata WHERE foodprod LIKE '%" + req.query.keyword + "%'";

        // executing the SQL query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./');
            }
            let newData = Object.assign({}, shopData, { availableFoods: result });
            //If the keyword search yields an empty/no result then display the below message and a a link to the homepage
            if(result.length==0){
                res.send('No data found!<br>'+'<a href=' + './' + '>Home</a>');
            }
            else{
                //Display the list.ejs page
                res.render("list.ejs", newData);
            }
            
        });
    });
    app.get('/register', function (req, res) {
        res.render('register.ejs', shopData);
    });
    app.post('/registered',
        //Form validation being done
        //Checking email validation
        [check('email').isEmail(),
        //password validation
        check('pass').isLength({ min: 8 }),
        check('pass').isStrongPassword([{
            minLength: 8, minLowercase: 1, minUppercase: 1,
            minNumbers: 1, minSymbols: 1, returnScore: false,
            pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10,
            pointsForContainingUpper: 10, pointsForContainingNumber: 10,
            pointsForContainingSymbol: 10
        }]),
        //Form validation being done for first/last name, username
        check('last').notEmpty(),
        check('last').isAlpha('en-US', { ignore: '\s' }),
        check('first').notEmpty(),
        check('first').isAlpha('en-US', { ignore: '\s' }),
        check('user').notEmpty()],
        function (req, res) {
            const errors = validationResult(req);
            //If validation is unsuccessful then redirect to the register page
            if (!errors.isEmpty()) {
                res.redirect('./register');
            }
            else {
                // bcrypt being used to convert and compare password and hash passwords
                const bcrypt = require('bcrypt');
                const saltRounds = 10;
                const plainPassword = req.body.pass;
                bcrypt.hash(plainPassword, saltRounds, function (err, hashedPassword) {
                    // SQL query to insert user inputed values into the table newuser
                    let sqlquery = "INSERT INTO newuser (email, hashedpassword, lastname, firstname, username) VALUES (?,?,?,?,?);";
                    let myList = [req.sanitize(req.body.email),
                        hashedPassword,
                    //sanitisation of user inputs
                    req.sanitize(req.body.last),
                    req.sanitize(req.body.first),
                    req.sanitize(req.body.user),
                    req.sanitize(req.body.pass)];

                    //Executing the SQL query 
                    db.query(sqlquery, myList, (err, result) => {
                        if (err) {
                            res.redirect('./');
                        }
                        else {
                            //Upon successful querying, dispaly the below message and a link to the homepage
                            result = 'Hello ' + req.sanitize(req.body.first) + ' ' + req.sanitize(req.body.last) + ' you are now registered!<br> We will send an email to you at ' + req.sanitize(req.body.email);
                            result += '<br>Your password is: ' + req.sanitize(req.body.pass) + ' and your hashed password is: ' + hashedPassword + '<br><a href=' + './' + '>Home</a>';
                            res.send(result);
                        }
                    });
                })
            }
                                                                                          
        });
    
    //food list route
    app.get('/list', redirectLogin, function (req, res) {
        //SQL query to show all the data inside the table
        let sqlquery = "SELECT * FROM nutridata";
        //Executing the SQL query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./');
            }

            let newData = Object.assign({}, shopData, { availableFoods: result });
            res.render("list.ejs", newData);
        });
    });

    //addfood route
    app.get('/addfood', redirectLogin, function (req, res) {
        res.render('addfood.ejs', shopData);
    });

    //Foodadded route
    app.post('/foodadded',
        //validation checks to see if the user entered updation values meet certain standards
        [check('name').notEmpty(),
        //validation check to see if the user has entered a number
        check('typical').isNumeric(),
        //validation check to see if the user has left the field empty
        check('unit').notEmpty(),
        check('carbs').isNumeric(),
        check('fat').isNumeric(),
        check('protein').isNumeric(),
        check('salt').isNumeric(),
        check('sugar').isNumeric()],
        function (req, res) {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.redirect('./addfood');
            }
            else {
            //SQL query to insert all the user inputed data into the database
            let sqlquery = "INSERT INTO nutridata (username,foodprod,typicalvalue,unit,carbs,fat,protein,salt,sugar) VALUES (?,?,?,?,?,?,?,?,?)";

            // Providing sanitization to user input to protect from cyberattacks - SQL injection attacks, XSS
            let newrecord = [req.sanitize(req.session.userId), req.sanitize(req.body.name), req.sanitize(req.body.typical), req.sanitize(req.body.unit), req.sanitize(req.body.carbs), 
                req.sanitize(req.body.fat), req.sanitize(req.body.protein), req.sanitize(req.body.salt), req.sanitize(req.body.sugar)];
            //Executing the SQL query
            db.query(sqlquery, newrecord, (err, result) => {
                if (err) {
                    return console.error(err.message);
                }
                else
                    //Upon successful querying, dispaly the below message and a link to the homepage
                    res.send(' The nutritional data related to the following food: ' 
                    + req.sanitize(req.body.name) + ' is added to database. <br><a href=' + './' + '>Home</a>');
            });
        } 
    });

    //updatesearch route
    //Login required to update - redirectLogin
    app.get('/updatesearch', redirectLogin, [check('keyword').notEmpty()],
        function (req, res) {
            res.render("updatesearch.ejs", shopData);
        });

    //updatesearch-result route
    app.get('/updatesearch-result', redirectLogin, function (req, res) {
       
        //SQL query to select all food names in the database that match the user inputed keyword.
        //The SQL query also checks to see if the logged in user is the person who updated the food in the table
        let sqlquery = "SELECT * FROM nutridata WHERE foodprod LIKE '%" + req.query.keyword + "%' AND username = '" + req.session.userId + "'"; 

        // Executing the SQL query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./');
            }
            let newData = Object.assign({}, shopData, { availableFoods: result });

            //If no mathcing search was returned then display below message and show link to homepage.
            if(result.length==0){
                res.send('No data found!<br>'+'<a href=' + './' + '>Home</a>');
            }
            else{
                //If user search matches the food name in the database then display the updatefood ejs file.
                res.render("updatefood.ejs", newData);
            }
            
        });
    });

    //updatefoodnow route
    app.post('/updatefoodnow',
        //validation checks to see if the user entered updation values meet certain standards
        [check('name').notEmpty(),
        //validation check to see if the user has entered a number
        check('typical').isNumeric(),
        //validation check to see if the user has left the field empty
        check('unit').notEmpty(),
        check('carbs').isNumeric(),
        check('fat').isNumeric(),
        check('protein').isNumeric(),
        check('salt').isNumeric(),
        check('sugar').isNumeric()],
        function (req, res) {
            const errors = validationResult(req);
            //If validation checks don't pass then reload the updatesearch page
            if (!errors.isEmpty()) {
                res.redirect('./updatesearch');
            }
            else {

                //SQL update query to save user entered data in database
                let sqlquery = "UPDATE nutridata SET typicalvalue = ?, unit = ?, carbs = ?, fat = ?, protein = ?, salt = ?, Sugar = ? WHERE foodprod = ?";
                // Providing sanitization to user input to protect from cyberattacks - SQL injection attacks, XSS
                let newrecord = [req.sanitize(req.body.typical), req.sanitize(req.body.unit), req.sanitize(req.body.carbs), 
                req.sanitize(req.body.fat), req.sanitize(req.body.protein), req.sanitize(req.body.salt), req.sanitize(req.body.sugar), req.sanitize(req.body.name)];
                //Executing the SQL Query
                db.query(sqlquery, newrecord, (err, result) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    else
                        //Upon successful querying dispaly the below message and the name of the foodin which the updation was made by user
                        res.send(' The nutritional data related to the following food is updated and added to database, Name of product: ' 
                        + req.sanitize(req.body.name) + '<br><a href=' + './' + '>Home</a>');
                });

            }
            
    });
    
    //deletefoodnow route
    app.post('/deletefoodnow', function (req, res) {

        //SQL query to select username from table according to id in the database
        let sqluser = "SELECT username FROM nutridata WHERE id =?";

        let deleterecord = [req.sanitize(req.body.id)];

        db.query(sqluser, deleterecord, (err, result) => {
            if (err) {
                return console.error(err.message);
            }
            else{
                //If the username mathches then delete the entire record
                if(result[0].username == req.session.userId){

                    //SQL query to delete food according to id.
                    let sqlquery = "DELETE FROM nutridata WHERE id = ?";

                    //Executing the SQL Query
                    db.query(sqlquery, deleterecord, (err, result) => {
                        if (err) {
                            return console.error(err.message);
                        }
                        else
                            //Upon successful querying dispaly the below message and the link to the homepage
                            res.send(' The entry related to the following food has been deleted. <br><a href=' + './' + '>Home</a>');
                    });
                }
                else{
                    //redirect to homepage if the wrong user is logged in.
                    res.redirect('./');
                }
            }

        });
        

    });

    //Login route
    app.get('/login', function (req, res) {
        res.render('login.ejs', shopData);
    });

    //loggedin route
    app.post('/loggedin',
        //Validation checks for password to meet a set standard. 
        check('pass').isLength({ min: 8 }),
        check('pass').isStrongPassword([{
            minLength: 8, minLowercase: 1, minUppercase: 1,
            minNumbers: 1, minSymbols: 1, returnScore: false,
            pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10,
            pointsForContainingUpper: 10, pointsForContainingNumber: 10,
            pointsForContainingSymbol: 10
        }]),
        //Validation check for username
        check('user').notEmpty(),
        check('user').isAlphanumeric('en-US', { ignore: '\s' }),
        function (req, res) {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.redirect('./login');
            }
            else {
            let bcrypt = require('bcrypt');
            //SQL query to select the hashed password from the table.
            let sqlquery = 'SELECT hashedpassword FROM newuser WHERE username = ?';
            let data_passed = req.sanitize([req.body.user]);
            
            db.query(sqlquery, data_passed, (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    //comparing the password and hash password for a match
                    bcrypt.compare(req.sanitize(req.body.pass), result[0].hashedpassword, function (err, second_r) {
                        if (err) {
                            //checking error
                            console.log(err);
                        }
                        else if (second_r == true) {

                            req.session.userId = req.sanitize(req.body.user);
                             //Entering the correct password displays the below message and shows a link to home page.
                            res.send('Password Correct!<br> <a href=' + './' + '>Home</a>');
                        }
                        else {
                            //Entering the wrong password displays the below message and shows a link to home page.
                            res.send('Password Incorrect!<br> <a href=' + './' + '>Home</a>');
                        }
                    });
                }
            });
        } 
    });

    //logout route
    app.get('/logout', redirectLogin, (req, res) => {
        req.session.destroy(err => {
            //If error - automatically redirects back to the homepage
            if (err) {
                return res.redirect('./')
            }
            //Upon successful logout displays the below message and shows a link to home page.
            res.send('You are now logged out.<br> <a href=' + './' + '>Home</a>');
        })
    })


    //The API can be accessed by clicking on the API link provided on the homepage
    //localhost:8000/api?keyword=***** ---- Can be used to search for a particular food item.
    //API route
    app.get('/api', function (req,res) {
        // Query database to get all the data regarding foods
        var searchParameter = req.query.keyword;
        let sqlquery = "SELECT * FROM nutridata"; 
        // SQL Query to select the food from the database relevant to the keyword
        let sqlquerySearch = "SELECT * FROM nutridata WHERE foodprod LIKE '%" + req.query.keyword + "%'";

        //Searching for food name in the API
        if(searchParameter)
        {
            db.query(sqlquerySearch, (err, result) => { 
                if (err) {
                res.redirect('./');
                } 
                res.json(result);
        });
        }
        //Else display all the food data available
        else
        {
            db.query(sqlquery, (err, result) => { 
                if (err) {
                res.redirect('./');
                } 
                res.json(result); 
        });
        }
    });

    

    
}
