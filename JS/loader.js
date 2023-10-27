const divButtons=document.getElementById("myButtons");
const welcomeContainer=document.getElementById("welcomeContainer");

window.addEventListener("load", function () {
    divButtons.style.display="none";
    welcomeContainer.style.display = "none";
    const loader = document.querySelector('.progress-bar-container');
    loader.style.display = "block";
    // Wait for the "load" event to ensure all page resources are loaded.
    setTimeout(function () {
      // Find the loader element and hide it
  
      if (loader) {
        loader.style.display = "none"; 
        divButtons.style.display="flex";
        welcomeContainer.style.display = "block";
      }
    }, 3000);
    // 1000 milliseconds (3 seconds)
  });
  
  