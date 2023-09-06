const healthIndicator = document.getElementById('health');
const happinessIndicator = document.getElementById('happiness');
const playButton = document.getElementById('playBtn');
const feedButton = document.getElementById('feedBtn');
const exitButton = document.getElementById('exitBtn');

// Function to get the pet's health and happiness for the current user from local storage
function getUserStats(username) {
    const userData = JSON.parse(localStorage.getItem(username));
    return userData || { health: 100, happiness: 100 };
}

// Function to update the status indicators
function updateIndicators() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
        // Redirect to the login page if the user is not logged in
        window.location.href = 'login.html';
    } else {
        const { health, happiness } = getUserStats(currentUser);
        healthIndicator.textContent = health;
        happinessIndicator.textContent = happiness;
    }
}

// Function to decrease the indicators over time
function decreaseIndicators() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
        const { health, happiness } = getUserStats(currentUser);
        const newHealth = Math.max(0, health - 10);
        const newHappiness = Math.max(0, happiness - 10);
        const updatedStats = { health: newHealth, happiness: newHappiness };
        localStorage.setItem(currentUser, JSON.stringify(updatedStats));
        updateIndicators();
    }
}

// Function to increase the health when the user feeds the pet
function increaseHealth() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
        const { health } = getUserStats(currentUser);
        const newHealth = Math.min(100, health + 10);
        const updatedStats = { ...getUserStats(currentUser), health: newHealth };
        localStorage.setItem(currentUser, JSON.stringify(updatedStats));
        updateIndicators();
    }
}

// Function to increase the happiness when the user plays with the pet
function increaseHappiness() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
        const { happiness } = getUserStats(currentUser);
        const newHappiness = Math.min(100, happiness + 10);
        const updatedStats = { ...getUserStats(currentUser), happiness: newHappiness };
        localStorage.setItem(currentUser, JSON.stringify(updatedStats));
        updateIndicators();
    }
}

// Function to log out the current user and return to the login page
function logoutUser() {
    sessionStorage.removeItem('currentUser'); // Remove the current user from session storage
    window.location.href = 'login.html'; // Redirect to the login page
}

playButton.addEventListener('click', () => {
    increaseHappiness();
});

feedButton.addEventListener('click', () => {
    increaseHealth();
});

exitButton.addEventListener('click', () => {
    logoutUser();
});

// Decrease indicators over time
setInterval(decreaseIndicators, 5000); // Decrease every 5 seconds

// Check if the pet "dies"
setInterval(() => {
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
        const { health, happiness } = getUserStats(currentUser);
        if (health === 0 || happiness === 0) {
            alert("Your pet has died. You can get a new pet!");
            const updatedStats = { health: 100, happiness: 100 };
            localStorage.setItem(currentUser, JSON.stringify(updatedStats));
            updateIndicators();
        }
    }
}, 1000); // Check every 1 second

// Call updateIndicators initially to display the initial states
updateIndicators();
