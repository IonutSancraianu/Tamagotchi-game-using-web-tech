const loginForm = document.querySelector('form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const clearAllAccountsBtn = document.getElementById('clearAllAccountsBtn'); // Get the clear all accounts button

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

// Function to check if the user exists in the users.json file
async function checkUserCredentials(username, password) {
    const usersData = await readUsersFile();
    if (usersData && usersData.users) {
        return usersData.users.find((user) => user.username === username && user.password === password);
    }
    return null;
}

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;

    // Check if the user exists in the users.json file
    const userData = await checkUserCredentials(username, password);
    if (userData) {
        // Successful login, save the current user in session storage
        sessionStorage.setItem('currentUser', username);
        window.location.href = 'index.html';
    } else {
        alert('Invalid username or password. Please try again.');
    }
});

// Function to get user data from local storage based on the username
function getUserData(username) {
    return JSON.parse(localStorage.getItem(username));
}

// Add event listener to clear all accounts button
clearAllAccountsBtn.addEventListener('click', () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure you want to clear all accounts? This action cannot be undone.')) {
        localStorage.clear();
        alert('All accounts have been cleared.');
        sessionStorage.removeItem('currentUser'); // Remove the current user from session storage
        window.location.href = 'login.html'; // Redirect to the login page after clearing accounts
    }
});
