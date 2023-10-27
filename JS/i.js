document.addEventListener("DOMContentLoaded", function () {
 // Firebase configuration
 const firebaseConfig = {
    //   copy your firebase config informations
    apiKey: "AIzaSyBiQr7aHxdYxk8sCkHxMebkVyBEgXCnknU",
  authDomain: "online-store-b90ca.firebaseapp.com",
  databaseURL: "https://online-store-b90ca-default-rtdb.firebaseio.com",
  projectId: "online-store-b90ca",
  storageBucket: "online-store-b90ca.appspot.com",
  messagingSenderId: "160581372978",
  appId: "1:160581372978:web:b507d7ac5f14c9e4ff002b",
  measurementId: "G-PH4QNCPP2J"
  };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
  const database = firebase.database();

    // Reference to the "leaderboard" table
    const leaderboardRef = database.ref("leaderboard");

     // Reference to the HTML list element
     const leaderboardList = document.getElementById("leaderboardList");

     // Function to retrieve, sort, and display leaderboard data
     function displayLeaderboardData(snapshot) {
       leaderboardList.innerHTML = ""; // Clear previous data

       if (snapshot.exists()) { // Check if data exists
         const leaderboardData = [];

         snapshot.forEach(childSnapshot => {
           const data = childSnapshot.val();
           leaderboardData.push(data);
         });

         // Sort the data by score in descending order
         leaderboardData.sort((a, b) => b.score - a.score);

         leaderboardData.forEach(data => {
           const listItem = document.createElement("li");
           listItem.textContent = `${data.name}: ${data.score}`;
           leaderboardList.appendChild(listItem);

           // Print data to the console
           console.log(`${data.name}: ${data.score}`);
         });
       }
       
     }

     // Attach an event listener to the "leaderboard" table
     leaderboardRef.on("value", displayLeaderboardData);

    });
    // Export the initialized Firebase instance
