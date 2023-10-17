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
function scoreBack(){
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

