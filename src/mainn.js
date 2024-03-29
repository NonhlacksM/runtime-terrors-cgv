// game
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.157.0/build/three.module.js';
import { GLTFLoader } from "../lib/GLTFLoader.js"

import {Reflector} from './reflector.js';
import AudioManager from './sounds.js';
import Level1 from './level1.js';
import Level2 from './level2.js';
import Level3 from './level3.js';

const scoreElement = document.getElementById('score');
const card = document.getElementById("gameOverCard");

card.style.display = "none";

// Get the element with the id "level"
const levelElement = document.getElementById('level');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//camera positions
var finalScore=0;
camera.position.x = -15;
camera.position.y = 7;
camera.position.z = 0;
camera.rotation.y = Math.PI*(3/2);
var level=1;
let mirror;

const renderer = new THREE.WebGLRenderer();
// Define your fog settings
const fogColor = 0xf1f1f1;
const fogDensity = 0.015;

// Create the fog object
const customFog = new THREE.FogExp2(fogColor, fogDensity);


//enabling the blender
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Shadow map type can be adjusted
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);


// CLASS FOR MODELS
let models;
/////////////////////////////////////////////////////////////////////////////////
if(level == 1){
	models = new Level1();
}else if(level == 2){
	models = new Level2();
	
}
else{
	models = new Level3();
}
const loadingManager = new THREE.LoadingManager();
const progressBar = document.getElementById('progress-bar');

loadingManager.onProgress = function(url, loaded, total) {
    progressBar.value = (loaded / total) * 100;
}

const progressBarContainer = document.querySelector('.progress-bar-container');

loadingManager.onLoad = function() {
    progressBarContainer.style.display = 'none';
}


// const models = new Level3();
let blockClone;
let coinClone;
let flatClone;
let pollClone;
let skybox;
/////////////////////////////////////////////////////////////////////////////////

// CLASS FOR CREATING MODELS
/////////////////////////////////////////////////////////////////////////////////
//adding the coins to scene
function coin(zz){
	var here = coinClone.clone();
	here.position.x = xx + 100;
	here.position.z = zz;
	scene.add(here);
	coins.push(here);
}
//adding the trains to scene
function block(zz){
	var pp = Math.floor(Math.random()*4);
	var here;
	if (models.getLevel()==1){
		here = blockClone.clone();
	} 
	else if (models.getLevel()==2){ 
		here = blockClone[pp].clone();
	}
	else if (models.getLevel()==3){ 
		here = blockClone.clone();
	}
	here.position.x = xx;
	here.position.z = zz;
	scene.add(here);
	blocks.push(here);
}
//adding the flats to scene
function flat(zz){
	var pp = Math.floor(Math.random()*6);
	var here = flatClone[pp].clone();
	here.position.x = xx;
	here.position.z = zz;
	scene.add(here);
	flats.push(here);
}
//adding the initial flats to scene
var right;
var left;
function flat00(zz){
	var pp = Math.floor(Math.random()*6);
	
	var obj = ['large_buildingA.obj', 'large_buildingB.obj', 'large_buildingC.obj',
	'large_buildingD.obj', 'large_buildingG.obj', 'large_buildingF.obj'];
	var mtl = ['large_buildingA.mtl', 'large_buildingB.mtl', 'large_buildingC.mtl',
	'large_buildingD.mtl', 'large_buildingG.mtl', 'large_buildingF.mtl'];
	var mtlLoader = new MTLLoader();
	mtlLoader.setPath('./models/large/');
	mtlLoader.load(mtl[pp], function(materials) {
		materials.preload();

		var glftLoader = new OBJLoader();
		glftLoader.setPath('./models/large/');
		glftLoader.setMaterials(materials);

		glftLoader.load(obj[pp], function(gltfScene) {
			gltfScene.scale.set(10, 10, 10);
			if (zz<0){
				gltfScene.position.x = left;
				left += 10;
			}
			else {
				gltfScene.position.x = right;
				right += 10;
			}
			
			gltfScene.position.y = 0;
			gltfScene.position.z = zz;
			gltfScene.traverse(function(node){
				if(node.isMesh){
					node.castShadow = false;
					node.receiveShadow = true;
				}
			});
			scene.add(gltfScene);
			flats.push(gltfScene);
		});
	});
}

function sLight00(zz){
	let light = new THREE.PointLight(0xFFFFFF, 600.0);
	light.position.set(zz, 11.5, 9.8);
	light.castShadow = true;
	scene.add(light);
	sLights.push(light);
	
	var mtlLoader = new MTLLoader();
	mtlLoader.setPath('./models/lights/');
	mtlLoader.load('materials.mtl', function(materials) {
		materials.preload();

		var glftLoader = new OBJLoader();
		glftLoader.setPath('./models/lights/');
		glftLoader.setMaterials(materials);

		glftLoader.load('./model.obj', function(gltfScene) {
			gltfScene.scale.set(4, 4, 4);
			gltfScene.position.x = zz;
			gltfScene.position.y = 10;
			gltfScene.position.z = 11;
			gltfScene.traverse(function(node){
				if(node.isMesh){
					node.castShadow = true;
					node.receiveShadow = true;
				}
			});
			scene.add(gltfScene);
			lightPoll.push(gltfScene);
		});
	});
}



/////////////////////////////////////////////////////////////////////////////////


// Do not know yet
/////////////////////////////////////////////////////////////////////////////////

function sLight(zz){
	let light = new THREE.PointLight(0xFFFFFF, 600.0);
	light.position.set(zz, 11.5, 9.8);
	light.castShadow = true;
	scene.add(light);
	sLights.push(light);
	
	var here = pollClone.clone();
	here.scale.set(4, 4, 4);
	here.position.x = zz;
	here.position.y = 10;
	here.position.z = 11;
	scene.add(here);
	lightPoll.push(here);

}

const loader1 = new GLTFLoader(loadingManager);
const loader2 = new GLTFLoader(loadingManager);
let mixer;
let mixer2; // Declare a mixer variable to manage animations
var person;
var person2;
var ani;
var ani2;
var jumpjump;

/////////////////getting elements from the html/////////////////////////////////

const divButtons=document.getElementById("myButtons");
const startButton=document.getElementById("startButton");
const scoreCard = document.getElementById("scoreCard");
const welcomeContainer=document.getElementById("welcomeContainer");

let gameInProgress = false; // Variable to track game state
function init(){
	loader1.load('./untitled3.glb', function (gltf) {
		// Add the loaded 3D object to the scene
		gltf.scene.rotation.set(0, Math.PI / 2, 0);
		gltf.scene.scale.set(3, 3, 3);
	
		gltf.scene.traverse(function(node){
			if(node.isMesh){
				node.castShadow = true;
				node.receiveShadow = true;
			}
		});
		scene.add(gltf.scene);
		person = gltf.scene;
		person.position.set(0, 0, 0);
		ani = gltf.animations;
		ani2 = gltf.animations;
	
		// Initialize the mixer
		mixer = new THREE.AnimationMixer(gltf.scene);
	
		// Get all the animations from the loaded model
		const animations = gltf.animations;
		if (animations && animations.length > 0) {
			console.log("List of animations:");
	
			// Loop through the animations and print their names to the console
			animations.forEach((animation, index) => {
				console.log(`Animation ${index + 1}: ${animation.name}`);
			});
		}
	
		// Create animation actions for each animation and add them to the mixer
		if (animations.length > 0) {
			const firstAnimationClip = animations[0];
			const firstAnimationAction = mixer.clipAction(firstAnimationClip);
			firstAnimationAction.play();
			firstAnimationAction.loop = THREE.LoopOnce;
	
			const firstAnimationClip1 = animations[1];
			const firstAnimationAction1 = mixer.clipAction(firstAnimationClip1);
			firstAnimationAction1.loop = THREE.LoopOnce;
	
			mixer.addEventListener('finished', function(e) {
				if (jumpjump == 10){
					jumpjump = 9;
					firstAnimationAction1.reset();
					firstAnimationAction1.play();
					person.position.y += 3;
					if(check==="true"){
						camera.position.y += 3;
					}
				}
	
				else {
					firstAnimationAction.reset();
					firstAnimationAction.play();
				}
			});
		}
	}, undefined, function (error) {
		console.error(error);
	});
	
	loader2.load('./person2.glb', function (gltf) {
		// Add the loaded 3D object to the scene
		gltf.scene.rotation.set(0, Math.PI / 2, 0);
		gltf.scene.scale.set(2, 2, 2);
	
		gltf.scene.traverse(function(node){
			if(node.isMesh){
				node.castShadow = true;
				node.receiveShadow = true;
			}
		});
		scene.add(gltf.scene);
		person2 = gltf.scene;
		// person2.position.x = -10;
		person2.position.set(-10, 0, 0); // Set an initial position for person
		// console.log(person)
		// console.log(person2)
		// console.log(person.position)
		// console.log(person2.position)
	
		// Initialize the mixer
		mixer2 = new THREE.AnimationMixer(gltf.scene);
	
		// Get all the animations from the loaded model
		const animations = gltf.animations;
	
		// Create animation actions for each animation and add them to the mixer
		if (animations.length > 0) {
			const firstAnimationClip = animations[0];
			const firstAnimationAction = mixer2.clipAction(firstAnimationClip);
			firstAnimationAction.play();
		}
	}, undefined, function (error) {
		console.error(error);
	});
}
init();
startButton.addEventListener("click",function(e){
	progressBarContainer.style.display = 'flex';

	welcomeContainer.style.display = "none";
	divButtons.style.display="none";
	scoreCard.style.display="block";
	gameInProgress = true;
	start();

	/*
	scene.fog = customFog;
	setTimeout(() => {
		scene.fog = null; // Set fog to null to remove it
	}, 10000); // 4000 milliseconds (4 seconds)
	*/

	progressBarContainer.style.display = 'none';
	animate();
	
});

function gameOver() {
    gameInProgress = false;
    // Add code to handle game over here
}

//////code to display the leaderboard
function scoreBack() {
    const leaderboard = document.getElementById('leaderboard');

    if (gameInProgress) {
        // You were already playing the game or just lost
        leaderboard.style.display = 'none';
        // Add any other logic you need when going back from a game
    } else {//clicking back from start menu
        card.style.display = "none";
        scoreCard.style.display = "none";
        divButtons.style.display="flex";
        leaderboard.style.display="none";
        welcomeContainer.style.display = "block";
    }
}

////////////
const scoreBackk=document.getElementById("scoreBack");
scoreBackk.addEventListener("click",function(e){
	scoreBack();
});
const playerCar = car();
scene.add(playerCar);

var time;
var time1;
var time2;



let models1 = new Level1();

let models2= new Level2();

let models3 = new Level3();

let k = "2";
function animate() {
   requestAnimationFrame(animate);
   if (mixer && dying==1) {
	mixer.update(0.03);
	mixer2.update(0.03);
	//requestAnimationFrame(animate);
	}
    
		// CLASS FOR MODELS
	/////////////////////////////////////////////////////////////////////////////////
	if(level == 1){
		models = models1;
		
		
	}else if(level%2 ==0){
		models = models2;
	}
	else{
		models = models3;
		
		
	}
	
	blockClone = models.getCar();
	coinClone = models.getCoin();
	flatClone = models.getFlat();
	pollClone = models.getPoll();
	if (!end){
		if (mixer) {
			mixer.update(0.03);
			mixer2.update(0.03);
			
			 // You can adjust the time delta as needed
			}
			
		// Rotate the car (if needed)
		if (playerCar) {
			playerCar.rotation.y += 1;
		}
		person.position.x += 1;
		person2.position.x += 1;
		skybox.position.x += 1;
		
		ponds[0].position.x += 1;
		for (let i=0;i<move.length;i++){
			move[i].position.x += 1;
		}
		camera.position.x += 1;

		if (time1>=levels){
			time1 = 0;
			block(6*(Math.floor(Math.random()*3)-1));
			time2[1] = 6*(Math.floor(Math.random()*3)-1);
			time2[0] = 5;
		}

		if (blocks.length > 0 && move.length > 0 && blocks[0].position.x <= move[0].position.x-15) {
			scene.remove(blocks[0]);
			blocks.shift();
		}

		if (coins.length > 0 && move.length > 0 && coins[0].position.x <= move[0].position.x-15) {
			scene.remove(coins[0]);
			coins.shift();
		}

		if (xx%50==0){
			sLight(xx);
			scene.remove(sLights[0]);
			sLights.shift();
			scene.remove(lightPoll[0]);
			lightPoll.shift();
		}

		if (time==10){
			time = 0;
			flat(-20);
			flat(20);
			scene.remove(flats[0]);
			flats.shift();
			scene.remove(flats[0]);
			flats.shift();

			pill(3);
			pill(-3);
			pill(10);
			pill(-10);

			for (let j=0;j<4;j++){
				scene.remove(pills[0]);
				pills.shift();
			}

			if (time2[0]>0){
				time2[0] -= 1;
				coin(time2[1]);
			}
		}
		road();
		scene.remove(roads[0]);
		roads.shift();
		scene.remove(paves[0]);
		paves.shift();
		scene.remove(paves[0]);
		paves.shift();

		xx += 1;
		time += 1;
		time1 += 1;
       const death=new AudioManager('./Sounds/death.mp3');
		if (blocks.length > 0 && move.length > 0 && blocks[0].position.x == move[0].position.x+4
			&& 4>= Math.abs(blocks[0].position.z - move[0].position.z)) {
			death.playSound();
			end = true;
			dead = true;
			dying = 1;
			toggleCardVisibility();
		}
		if (blocks.length > 1 && move.length > 0 && blocks[1].position.x == move[0].position.x+4
			&& 4>= Math.abs(blocks[1].position.z - move[0].position.z)) {
			end = true;
			dead = true;
			dying = 1;
			toggleCardVisibility();
		}
		if (blocks.length > 2 && move.length > 0 && blocks[2].position.x == move[0].position.x+4
			&& 4>= Math.abs(blocks[2].position.z - move[0].position.z)) {
			end = true;
			dead = true;
			dying = 1;
			toggleCardVisibility();
		}
	

	
	const leaderboard = document.getElementById('leaderboard');
	function updateLeaderboardd(score) {
		leaderboard.style.display = 'none';
	
		const scoreList = document.getElementById('scoreList');
		const newItem = document.createElement('li');
		newItem.textContent = 'PlayerName: ' + score;
	
		const scores = Array.from(scoreList.children);
	
		// Find the correct position to insert the new score
		let insertIndex = scores.length; // Default to adding to the end
	
		for (let i = 0; i < scores.length; i++) {
			const currentScore = parseInt(scores[i].textContent.split(': ')[1]);
			if (score > currentScore) {
				insertIndex = i;
				break;
			}
		}
	
		// Insert the new score at the calculated position
		if (insertIndex < scores.length) {
			scoreList.insertBefore(newItem, scores[insertIndex]);
		} else {
			scoreList.appendChild(newItem); // Add to the end
		}
	
		// Update the scores array with the new item
		scores.splice(insertIndex, 0, newItem);
	
		// Remove the last item if there are more than 5 scores
		if (scores.length > 5) {
			const removedItem = scores.pop();
			scoreList.removeChild(removedItem);
		}
	}
	
	
	if (dead == true) {
		
		updateLeaderboardd(points);
		var name = "score";
		
		try {
		  if ( hasLowerScore(parseInt(points))) {
			//alert("true");
			addLeaderboardEntry(name,parseInt(points));
		  } else {
			//alert("false");
			//addLeaderboardEntry(name,score);
			// Call the function to delete the lowest score entry
			
		  }
		} catch (error) {
		  console.error("Error checking for lower score: ", error);
		}
		levelElement.textContent = '1'; // Change the content to whatever you need
		// Display the leaderboard pop-up
		const leaderboardPopup = document.getElementById('leaderboardPopup');
		leaderboardPopup.style.display = 'none';
	}
	
	// Function to close the leaderboard pop-up
	function closeLeaderboardPopup() {
		const leaderboardPopup = document.getElementById('leaderboardPopup');
		leaderboardPopup.style.display = 'none';
	}

	const audioManager = new AudioManager('./Sounds/Video Game Coin Beep Sound Effect.mp3');
	for (let l=0;l<4;l++){
		if (coins.length > l && move.length > 0 && coins[l].position.x == move[0].position.x+3
			&& 4>= Math.abs(coins[l].position.z - move[0].position.z)) {
				audioManager.playSound();
				points += 1;
				if (points%30==0){
					levels = levels/2;
					// Update its textContent
					level+=1;

					// Enable the fog
					scene.fog = customFog;

					setTimeout(() => {
						scene.fog = null; // Set fog to null to remove it
					}, 10000); // 4000
					
				}
				scoreElement.textContent = points;
				scene.remove(coins[l]);
				coins.shift();
				levelElement.textContent = level; // Change the content to whatever you need
		}
	}

	if (jumpjump >0 && jumpjump<10){
		jumpjump -= 1;
		if (jumpjump ==0){
		person.position.y -= 3;
		if(check==="true"){
			camera.position.y -= 3;
		}
		}
	}
	}

    renderer.render(scene, camera);
}

var xx;
function pill(zz){
	const rtt = new THREE.Mesh(
        new THREE.BoxGeometry(1,0.1,1),
        new THREE.MeshLambertMaterial({color:"yellow"})
    );
	rtt.position.x = xx;
	rtt.position.y = -0.5;
	rtt.position.z = zz;
	rtt.castShadow = false;
    rtt.receiveShadow = true;
    scene.add(rtt);
	pills.push(rtt);
}
function road(){
	const rtt = new THREE.Mesh(
        new THREE.BoxGeometry(1,0.1,22),
        new THREE.MeshLambertMaterial({color:"grey"})
    );
	rtt.position.x = xx;
	rtt.position.y = -0.6;
	rtt.castShadow = false;
    rtt.receiveShadow = true;
    scene.add(rtt);
	roads.push(rtt);
	pave(22);
	pave(-22);
}
function pave(zz){
	var colour;
	if (models.getLevel()==1){
		colour = "black";
	} 
	else if (models.getLevel()==2){
		colour = "green";
	}
	else if (models.getLevel()==3){
		colour = "green";
	}
	const rtt = new THREE.Mesh(
        new THREE.BoxGeometry(1,0.1,22),
        new THREE.MeshLambertMaterial({color:colour})
    );
	rtt.position.x = xx;
	rtt.position.z = zz;
	rtt.castShadow = false;
    rtt.receiveShadow = true;
	rtt.position.y = -0.6;
    scene.add(rtt);
	paves.push(rtt);
}
function Pond(){
	const mirrorOptions = {
		clipBias: 0.000,
		textureWidth: window.innerWidth * window.devicePixelRatio,
		textureHeight: window.innerHeight * window.devicePixelRatio,
		color: 0x808080,
		multisample: 4,
	}
	
	const mirrorGeometry = new THREE.PlaneGeometry(20, 5);
	mirror = new Reflector(mirrorGeometry, mirrorOptions);
	mirror.rotateY(-Math.PI/2);
	mirror.position.set(15, 10, 0);
	mirror.rotateX(Math.PI/9);
	scene.add(mirror);
	ponds.push(mirror);
	mirror.visible = true;
}

////variables needed at the start
var roads;
var paves;
var ponds;
var pills;
var blocks;
var flats;
var coins;
var points;
var levels;
var sLights;
var lightPoll;

//function to load everything at the start
function start(){
	
	xx = -20;
	time = 10;
	time1 = 0;
	time2 = [0,0];
	roads = [];
	paves = [];
	ponds = [];
	pills = [];
	blocks = [];
	flats = [];
	coins = [];
	sLights = [];
	lightPoll = [];
	points = 0;
	levels = 128;

	jumpjump = 0;
	//blockClone = models.getTrain();      
	blockClone = models.getCar();
	coinClone = models.getCoin();
	flatClone = models.getFlat();
	pollClone = models.getPoll();
	skybox = models.getSkybox();
	scene.add(skybox);

	sLight(-50);


	Pond();

	for (let i=0;i<300;i++){
		road();

		if (time==10){
			time = 0;
			flat(-20);
			flat(20);
			pill(3);
			pill(-3);
			pill(10);
			pill(-10);
		}
		if (xx%50==0){
			sLight(xx);
		}

		xx += 1;
		time += 1;
	}
	flat(-20);
	flat(20);
	flat(-20);
	flat(20);
}

var move; 
var end;
var dead;
var dying;
function car(){
    const car = new THREE.Group();
	move = [];
    const main = new THREE.Mesh(
        new THREE.BoxGeometry(6.0,1.5,3.0),
        new THREE.MeshLambertMaterial({color:"blue",
		opacity: 0,
		transparent: true,})
    );
	
    main.position.y =  1.2;
    scene.add(main);
	move.push(main);

	
	end = false;
	dead = false;
	dying = 0;
    return car;
}

let objectNumber = 1;
let useAnaglyph = false;
var check = "false";
// Rendering function (replace with your rendering logic)
function renderScene() {
	//console.log(`objectNumber: ${objectNumber}, useAnaglyph: ${useAnaglyph}`);
	for (let i=0;i<move.length;i++){
		if (objectNumber==1 && move[i].position.y<3 ){
			move[i].position.y += 3;
		}
		if (objectNumber==2 && move[i].position.y>2 ){
			move[i].position.y -= 3;
		}
		if (objectNumber==3 && move[i].position.z>-6 ){
			move[i].position.z -= 6;
		}
		if (objectNumber==4 && move[i].position.z<6 ){
			move[i].position.z += 6;
		}
		if (objectNumber==5 && check==="false"){
			camera.position.x = camera.position.x+16.7;
			camera.position.y = 4.7;
			camera.position.z = person.position.z;
			camera.rotation.y = Math.PI*(3/2);
			
			check= "true";
		}
		if (objectNumber==6 && check==="true"){
			camera.position.x = camera.position.x-16.7;
			camera.position.y = 7;
			camera.position.z = 0;
			camera.rotation.y = Math.PI*(3/2);
			check= "false";
		}
	}

	if (objectNumber==1 && person.position.y<3 ){
		jumpjump = 10;
	}
	if (objectNumber==2 && person.position.y>2 ){
		if(check==="true"){

		}
		person.position.y -= 3;
	}
	if (objectNumber==3 && person.position.z>-6){
		person.position.z -= 6;
		person2.position.z -= 6;
		if(check==="true"){
			camera.position.z -= 6;
		}
		
	}
	if (objectNumber==4 && person.position.z<6){
		person.position.z += 6;
		person2.position.z += 6;
		if(check==="true"){
			camera.position.z += 6;
		}
	}
    
}

// Add a function to handle keyboard input
function doKeyboard(event) {
    const ch = event.key;
    let redraw = 1;

    switch (ch) {
        case 'ArrowUp':
            objectNumber = 1;
            break;
        case 'ArrowDown':
            objectNumber = 2;
            break;
        case 'ArrowLeft':
            objectNumber = 3;
            break;
        case 'ArrowRight':
            objectNumber = 4;
            break;
        case 'A':
            objectNumber = 5;
            break;
        case 'D':
            objectNumber = 6;
            break;
        case ' ':
            useAnaglyph = !useAnaglyph;
            break;
        case 'b':
        case 'B':
            if (mirror) {
                mirror.visible = !mirror.visible; // Toggle mirror visibility
            }
            break;
        default:
            redraw = 0;
            break;
    }

    if (redraw) {
        renderScene(); // Trigger a redraw or rendering function
    }
}

// Define a boolean variable to track whether the player is looking back
let lookingBack = false;

// Add a keyboard event listener to the document
document.addEventListener('keydown', doKeyboard);



function toggleCardVisibility() {
	
	if (card.style.display === "none") {
		card.style.display = "block"; 
		
		// Show the card
	} 
}
// Define an array to store objects that should be kept in the scene
const objectsToKeep = [];

const restart = document.getElementById("restartGame");
restart.addEventListener("click", function (e) {
    card.style.display = "none";
	welcomeContainer.style.display="none";
	

    // Iterate through the scene's children and filter out lights and camera
    scene.children.forEach((child) => {
        if (child instanceof THREE.PerspectiveCamera || child instanceof THREE.AmbientLight) {
            // Keep the perspective camera and ambient light in the scene
            objectsToKeep.push(child);
        } else {
            // Remove other objects from the scene
            scene.remove(child);
        }
    });

    // Clear the renderer's buffer
    renderer.clear();

    // Add back the perspective camera and ambient light to the scene
    objectsToKeep.forEach((obj) => {
        scene.add(obj);
    });
    scoreElement.textContent = 0;
    end = false;
	dead = false;
	dying = 0;
    start();

    scene.add(person);

    for (let i = 0; i < move.length; i++) {
        move[i].position.x = 0;
        scene.add(move[i]);
    }


	
		// Set the visibility of "frontwheel" to true
		//move[2].visible = true;
	

    camera.position.set(-15, 7, 0);
    person.position.x = 0;
	skybox.position.x = 0;


	leaderboard.style.display = "none";
	
    animate();
});


const pauseButton = document.getElementById("pauseButton");
const options = document.getElementById("options");
const playButton = document.getElementById("playButton");
const settingsButton = document.getElementById("settingsButton");

pauseButton.addEventListener("click", function() {
	if (!dead){
		end = true;
	    options.style.display = "block";
	}
});

playButton.addEventListener("click", function() {
	end = false;
	options.style.display = "none";
	
	// Add code to resume playback here
});

//document.addEventListener("DOMContentLoaded", function () {
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
		
   // Function to check if a score exists in the database that's less than the given score
   function hasLowerScore(score) {
	   return new Promise((resolve, reject) => {
		 leaderboardRef.once("value", (snapshot) => {
		   if (snapshot.exists()) {
			 let leaderboardData = [];
			 
			 snapshot.forEach(childSnapshot => {
			   const data = childSnapshot.val();
			   leaderboardData.push(data);
			 });
	 
			 // Sort the data by score in descending order
			 leaderboardData.sort((a, b) => b.score - a.score);
	 
			 // Check if there is a score lower than the given score
			 const lowerScoreExists = leaderboardData.some(data => data.score < score);
			 
			 resolve(lowerScoreExists);
		   } else {
			 resolve(false); // No data in the leaderboard
		   }
		 });
	   });
	 }
	 
	 // Function to add a new entry, sort, and remove the lowest-scoring entry
	 function addLeaderboardEntry(name, score) {
	   hasLowerScore(score)
		 .then((lowerScoreExists) => {
		   if (lowerScoreExists) {
			 // Add the new entry to the database
			 const newEntryRef = leaderboardRef.push();
			 newEntryRef.set({ name, score });
	         deleteLowestScoreEntry();
			 // Retrieve the leaderboard data and sort it
			 leaderboardRef.once("value", (snapshot) => {
			   if (snapshot.exists()) {
				 const leaderboardData = [];
				 snapshot.forEach(childSnapshot => {
				   const data = childSnapshot.val();
				   leaderboardData.push(data);
				 });
	 
				 leaderboardData.sort((a, b) => b.score - a.score);
	 
				 // Remove the lowest-scoring entry if there are more than 10 entries
				 if (leaderboardData.length > 10) {
				   const lowestScore = leaderboardData.pop().score;
				   leaderboardData = leaderboardData.filter(data => data.score !== lowestScore);
				 }
	 
				 // Update the leaderboard with the sorted and trimmed data
				 leaderboardRef.set(leaderboardData); 
			   }
			 });
			 
		   } else {
			 console.log("Score is not higher than any existing scores.");
		   }
		 })
		 .catch(error => {
		   console.error("Error checking for lower score: ", error);
		 });
	 }
   
	 function deleteLowestScoreEntry() {
	   leaderboardRef.once("value", (snapshot) => {
		 if (snapshot.exists()) {
		   const leaderboardData = [];
	 
		   snapshot.forEach(childSnapshot => {
			 const data = childSnapshot.val();
			 leaderboardData.push({ key: childSnapshot.key, score: data.score });
		   });
	 
		   // Sort the data by score in ascending order to get the lowest score first
		   leaderboardData.sort((a, b) => a.score - b.score);
	 
		   if (leaderboardData.length > 0) {
			 const lowestScoreKey = leaderboardData[0].key;
	 
			 // Delete the lowest scoring entry from the database
			 database.ref("leaderboard/" + lowestScoreKey).remove()
			   .then(() => {
				 console.log("Lowest score entry deleted successfully.");
			   })
			   .catch((error) => {
				 console.error("Error deleting lowest score entry:", error);
			   });
		   } else {
			 console.log("No entries in the leaderboard.");
		   }
		 }
	   });
	 }
	 
	 
	 document.addEventListener("DOMContentLoaded", function () {
    
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
  // });