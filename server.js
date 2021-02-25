'use strict';
/*
Step 1:
Require in and define your libraries.
Please note that you do not need enviroment variables for this, but I am going to demo them on purpose.
*/
require('dotenv').config(); //You can find this in the docs for npm library dotenv with with your GoogleFu skills.
//Note, I also always put this under 'use strict', so I don't run the risk of trying to use a variable from .env before I have brought in the lib to read things from my .env file.

const express = require('express');
const app = express(); //Let's us have access to all things great that express does for us
const cors = require('cors') // Not always needed, but it is a basic backstage pass on the internet. If the backstage guard is pretty lax, in our case because it knows we just want to see the band we snuck into the concert for, you just need a simple command in middleware setup below

//Defining and reuiring the pg lib
const pg = require('pg')

/*
 Step 2:
 Utilize Middleware, aka: use a few things you brought in to make your express server powerful.
*/

const PORT = process.env.PORT || 3003; // Reminder the OR '||' operator makes it so that if in your .env file this line of code cannot find a variable PORT, and PORT has a viable value, it will default to the hardcoded POR of 3003.

// Defining the url address of where our database lives. Please reach out if you ar eunsure of what to put for this, as it varies in requirements for Mac vs Win/Liux users. 
const DATABASE_URL = process.env.DATABASE_URL;

//Using cors/aka easily briable guard
app.use(cors()) // Note 'use' is a method of express > app in our case.
//Also note cors when required needs to be invoked/called. I am sure it is in the npm cors docs.

//This falls under step 2 completely. This will be the setup of pg as far as defining a new client, how to handle errors, and how to actually turn on a connection using the pg libray with node.js.

const client = new pg.Client(DATABASE_URL); // Makes alink between pg lib and the address of the database to connect to. Not an actual connection
client.on('error', err => console.error(err))// Helps with Error handling, pg errors do not by default appear in youy terminal, this will add them so you can debug as you move along. It is at a basic level an event handler listening for the event of 'error'. When it hears it, do the thing, in this case a pretty inline function.

//Last Step, jump to the bottom of the code where we are going to turn the pg lib on as well as turn on our port with app.listen.

/*
Step 4:
    Note: Don't skip to this until you have proven steps 1-3 work. You are asking for problems when you assume any or all of them have went correctly.
==================    Routes     ==================

    SKIPPING ALL OF THE SERVER COOL THINGS
*/

/* 
Step 3:
Turn the things on on. For now the Server.
*/
//Below is a true flex of how Promises and JavaScript can leverage its muscles in an elegant way.
//The idea is:
// WE need to connect to our database, and also turn on our express app via the listen and port num.

// Remember, client.connect() returns a promise.
//A .then() can be chained to any returned Promise.
// Using an anonyomus function with the ES6 syntax, we can directly return the app.listen inside of a chained .then to out Promise of client.connect().
//THis is a two-birds with a stone, failsafe ninja idea. If we chain them together, we all fail big, or we live to say 'Oh hi there' from both code blocks having a successful return.


client.connect()
    .then(() => {
        app.listen(PORT, () => console.log(`Pitter Patter on PORT:${PORT}`))
    })

