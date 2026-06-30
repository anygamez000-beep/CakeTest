// Joke Generator using Official Joke API
// API: https://official-joke-api.appspot.com/

let currentJoke = null;
let jokeCount = 0;

const jokeTextEl = document.getElementById('jokeText');
const jokeTypeEl = document.getElementById('jokeType');
const getJokeBtnEl = document.getElementById('getJokeBtn');
const nextJokeBtnEl = document.getElementById('nextJokeBtn');
const shareBtnEl = document.getElementById('shareBtn');
const loadingEl = document.getElementById('loading');
const errorMsgEl = document.getElementById('errorMsg');
const jokeCountEl = document.getElementById('jokeCount');

// Event listeners
getJokeBtnEl.addEventListener('click', fetchJoke);
nextJokeBtnEl.addEventListener('click', fetchJoke);
shareBtnEl.addEventListener('click', shareJoke);

// Fetch joke from API
async function fetchJoke() {
    try {
        // Show loading state
        showLoading(true);
        hideError();

        // Fetch from the Official Joke API
        const response = await fetch('https://official-joke-api.appspot.com/random_joke');
        
        // Check if response is OK
        if (!response.ok) {
            throw new Error('Failed to fetch joke');
        }

        // Convert response to JSON
        const data = await response.json();
        
        // Store the joke
        currentJoke = data;
        
        // Display the joke
        displayJoke(data);
        
        // Increment counter
        jokeCount++;
        jokeCountEl.textContent = jokeCount;

    } catch (error) {
        console.error('Error:', error);
        showError('Oops! Could not load a joke. Please try again.');
    } finally {
        showLoading(false);
    }
}

// Display joke on screen
function displayJoke(joke) {
    // Handle both single-line and two-part jokes
    if (joke.type === 'single') {
        jokeTextEl.textContent = joke.joke;
    } else {
        // Two-part joke (setup and punchline)
        jokeTextEl.textContent = `${joke.setup} ... ${joke.punchline}`;
    }

    // Display joke type
    jokeTypeEl.textContent = `Type: ${joke.type} | ID: ${joke.id}`;
}

// Share joke
function shareJoke() {
    if (!currentJoke) {
        showError('No joke to share yet. Get a joke first!');
        return;
    }

    const jokeText = jokeTextEl.textContent;
    
    // Try to use Web Share API (works on mobile and some browsers)
    if (navigator.share) {
        navigator.share({
            title: 'Check out this joke!',
            text: jokeText,
        }).catch(err => console.log('Share cancelled or failed', err));
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(jokeText)
            .then(() => {
                alert('Joke copied to clipboard!');
            })
            .catch(() => {
                alert('Joke: ' + jokeText);
            });
    }
}

// Show/hide loading state
function showLoading(show) {
    if (show) {
        loadingEl.classList.add('active');
        getJokeBtnEl.disabled = true;
        nextJokeBtnEl.disabled = true;
    } else {
        loadingEl.classList.remove('active');
        getJokeBtnEl.disabled = false;
        nextJokeBtnEl.disabled = false;
    }
}

// Show error message
function showError(message) {
    errorMsgEl.textContent = message;
    errorMsgEl.classList.add('active');
}

// Hide error message
function hideError() {
    errorMsgEl.classList.remove('active');
}

// Load a joke when page loads
window.addEventListener('load', fetchJoke);
