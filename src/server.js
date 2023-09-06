const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(__dirname)); // Serve static files from the current directory

app.post('/signup', (req, res) => {
    const newUser = req.body;
    try {
        const usersData = JSON.parse(fs.readFileSync('users.json'));
        usersData.users.push(newUser);
        fs.writeFileSync('users.json', JSON.stringify(usersData, null, 2));
        res.sendStatus(200);
    } catch (error) {
        console.error('Error saving user data:', error);
        res.sendStatus(500);
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
