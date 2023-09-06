const signupForm = document.querySelector('form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;

    // Check if the user exists in the users.json file
    const usersData = await readUsersFile();
    if (usersData && usersData.users) {
        const existingUser = usersData.users.find((user) => user.username === username);
        if (existingUser) {
            alert('The username is already taken. Please choose a different username.');
            return;
        }
    }

    // Add the new user to the users.json file via the server
    try {
        const newUser = { username, password };
        await signupUser(newUser);
        alert('User registration successful! You can now log in with your credentials.');
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Error saving user data:', error);
        alert('An error occurred while saving user data. Please try again.');
    }
});

// Function to read the users.json file and return its content as JSON
async function readUsersFile() {
    try {
        const response = await fetch('users.json');
        const usersData = await response.json();
        return usersData;
    } catch (error) {
        console.error('Error reading users.json:', error);
        return null;
    }
}

// Function to send a POST request to the server and sign up the user
async function signupUser(user) {
    try {
        await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
    } catch (error) {
        console.error('Error signing up user:', error);
        throw error;
    }
}
