const optionButton = document.getElementById('optionButton');
const settingsButton = document.getElementById('settingsButton');
const optionsMenu = document.getElementById('optionsMenu');
const soundSwitch = document.getElementById('soundSwitch');
const divButtons=document.getElementById("myButtons");
const welcomeContainer=document.getElementById("welcomeContainer");
let isSoundOn = true; // Initially, sound is on


let backkk;
// Event listener for the "Options" button
optionButton.addEventListener('click', function(){
    backkk = true;
    // Toggle the visibility of the options menu
    divButtons.style.display="none";
    welcomeContainer.style.display = "none";
    optionsMenu.style.display="block";
    if (optionsMenu.classList.contains('hidden')) {
        optionsMenu.classList.remove('hidden');
    } else {
        optionsMenu.classList.add('hidden');
    }
});

settingsButton.addEventListener('click', function() {
    backkk = false;
    // Toggle the visibility of the options menu
    divButtons.style.display="none";
    welcomeContainer.style.display = "none";
    optionsMenu.style.display="block";
    if (optionsMenu.classList.contains('hidden')) {
        optionsMenu.classList.remove('hidden');
    } else {
        optionsMenu.classList.add('hidden');
    }
});

function back(){
    optionsMenu.style.display="none";
    if (backkk){
        divButtons.style.display="flex";
        welcomeContainer.style.display = "block";
        preloader.style.display = "none";
    }
}
// Event listener for the sound switch
soundSwitch.addEventListener('change', function() {
    // Update the sound status based on the switch state
    isSoundOn = soundSwitch.checked;
    preloader.style.display = "none";

    // Play or stop the song based on the sound status
    if (isSoundOn) {
        // Play the song (you'll need to add your specific code for playing the song)
        playSound();
    } else {
        // Stop the song (you'll need to add your specific code for stopping the song)
        stopSound();
    }
});

let audio; // Global variable to hold the audio element

// Function to play the sound
function playSound() {
    if (!audio) {
        // Create an audio element and set the source of your audio file
        audio = new Audio('./Sounds/SUBWAY SURFERS (Main Theme).m4a');
        audio.loop = true; // Enable looping for continuous playback
    }

    // Check if the audio is paused, and if so, play it
    if (audio.paused) {
        audio.play();
    }
}

// Function to stop the sound
function stopSound() {
    if (audio) {
        audio.pause();
    }
}