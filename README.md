Tamagochi  game 

General Features:
-the tamagochi companion has a health status and a happiness status
-two buttons are available, Feed and Play which interact with the health and the happiness status, 
each adding 10 points to the corespondent status
-the statuses both decrement by 10 every five seconds
-a log in and a sign in page is available for existing or new users
the companion's statuses will not be modified if the  game is stoped, user logged out, or the server
turned off.
-the users credentials are recognised even is the server is turned off, or the game is stoped.
-a third button is available in the game page named 'Exit' which logs out user and the
- log in tab is displayed

Key features in implementation:
    -the credentials used for logging in are stored  locally in the file "users.json"
    -a node server is used to handle the requests between the file and the back-end

Instructions for activating the server are below:
    -install node.js from the website https://nodejs.org/en/download
    -open a terminal, navigate to the project directory ('src' directory inside 'reactfirst' directory) and run the following comands
        npm init -y
        npm install express
    -Ensure you have the 'server.js', 'users.json', 'login.html', and 'signup.html', 'script,js',
'index.html'. 'styles.css', 'tamagochi.png' ,  files in the same directory.
    -start the  Node.js server by running the following command int the terminal
        node server.js
    -Now, the server should be running, 
and you can access the login page at http://localhost:3000/login.html where u can play the game
    - to close  the server select the terminal and press the buttons Ctrl+C and the server should close
 and the game cannot be played.


