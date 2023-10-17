scoreBoard.addEventListener("click",function(e){
    // Toggle the visibility of the options menu
    divButtons.style.display="none";
   welcomeContainer.style.display = "none";
   leaderboard.style.display="block";
   if (leaderboard.classList.contains('hidden')) {
       leaderboard.classList.remove('hidden');
   } else {
       leaderboard.classList.add('hidden');
   }

});

const card = document.getElementById("gameOverCard");
const scoreCard = document.getElementById("scoreCard");
function scoreBack1(){
    card.style.display = "none";
    scoreCard.style.display = "none";
    divButtons.style.display="flex";
    leaderboard.style.display="none";
    welcomeContainer.style.display = "block";
}
function updateLeaderboard(score) {
    const leaderboard = document.getElementById('leaderboard');
    leaderboard.style.display = 'block';

    const scoreList = document.getElementById('scoreList');
    const newItem = document.createElement('li');
    newItem.textContent = 'Score: ' + score;

    scoreList.appendChild(newItem);

    const scores = Array.from(scoreList.children);
    scores.sort((a, b) => {
        return parseInt(b.textContent.split(': ')[1]) - parseInt(a.textContent.split(': ')[1]);
    });

    while (scores.length > 5) {
        scoreList.removeChild(scores.pop());
    }
}


/*************************************
 * Initialise board
 ************************************/
// Function to initialize the leaderboard with zeros
function initializeLeaderboard() {
    const leaderboard = document.getElementById('leaderboard');
    const scoreList = document.getElementById('scoreList');

    // Clear any existing scores
    scoreList.innerHTML = '';

    // Create and add zero scores
    for (let i = 0; i < 5; i++) {
        const newItem = document.createElement('li');
        newItem.textContent = 'Score: 0';
        scoreList.appendChild(newItem);
    }
}

// Call the initialization function when your page loads
window.addEventListener('load', () => {
    initializeLeaderboard();
});









// Add an event listener to the "Leaderboard" button in your JavaScript code
document.getElementById('pauseLeaderboard').addEventListener('click', showLeaderboardOnPause);

// Function to display the leaderboard
function showLeaderboardOnPause() {
    const leaderboard = document.getElementById('leaderboard');
    leaderboard.style.display = 'block';
    
    // You may also need to populate the leaderboard with scores here if you haven't already.
    // Example:
    // populateLeaderboard();
}




// function gameOver() {
//     gameInProgress = false;
//     // Add code to handle game over here
// }

// function scoreBack() {
//     const leaderboard = document.getElementById('leaderboard');

//     if (gameInProgress) {
//         // You were already playing the game or just lost
//         leaderboard.style.display = 'none';
//         // Add any other logic you need when going back from a game
//     } else {//clicking back from start menu
//         card.style.display = "none";
//         scoreCard.style.display = "none";
//         divButtons.style.display="flex";
//         leaderboard.style.display="none";
//         welcomeContainer.style.display = "block";
//     }
// }
