import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import AudioManager from './sounds.js';
const scoreElement = document.getElementById('score');
const card = document.getElementById("gameOverCard");
card.style.display = "none";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.x = -15;
camera.position.y = 7;
camera.position.z = 0;
camera.rotation.y = Math.PI*(3/2);


const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Shadow map type can be adjusted
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

// CLASS FOR MODELS
/////////////////////////////////////////////////////////////////////////////////

let blockClone;
var blockCreate = new MTLLoader();
blockCreate.setPath('./models/train/');
blockCreate.load('materials.mtl', function(materials) {
	materials.preload();

	var glftLoader = new OBJLoader();
	glftLoader.setPath('./models/train/');
	glftLoader.setMaterials(materials);

	glftLoader.load('./model.obj', function(gltfScene) {
		gltfScene.position.y = 4;
		gltfScene.scale.set(6, 6, 6);
		gltfScene.traverse(function(node){
			if(node.isMesh){
				node.castShadow = true;
				node.receiveShadow = true;
			}
		});
		blockClone = gltfScene;
	});
});

let coinClone;
var coinCreate  = new MTLLoader();
coinCreate.setPath('./models/coin/');
coinCreate.load('CoinDollarSign.mtl', function(materials) {
	materials.preload();

	var glftLoader = new OBJLoader();
	glftLoader.setPath('./models/coin/');
	glftLoader.setMaterials(materials);

	glftLoader.load('./CoinDollarSign.obj', function(gltfScene) {
		gltfScene.scale.set(6, 6, 6);
		gltfScene.position.y = 2;
		gltfScene.traverse(function(node){
			if(node.isMesh){
				node.castShadow = true;
				node.receiveShadow = true;
			}
		});
		coinClone = gltfScene;
	});
});

let flatClone;
fflatClonee();
function fflatClonee(){
	flatClone = [];
	for (let ii=0; ii<6; ii++){
		var obj = ['large_buildingA.obj', 'large_buildingB.obj', 'large_buildingC.obj',
		'large_buildingD.obj', 'large_buildingG.obj', 'large_buildingF.obj'];
		var mtl = ['large_buildingA.mtl', 'large_buildingB.mtl', 'large_buildingC.mtl',
		'large_buildingD.mtl', 'large_buildingG.mtl', 'large_buildingF.mtl'];
		var flatCreate = new MTLLoader();
		flatCreate.setPath('./models/large/');
		flatCreate.load(mtl[ii], function(materials) {
			materials.preload();

			var glftLoader = new OBJLoader();
			glftLoader.setPath('./models/large/');
			glftLoader.setMaterials(materials);

			glftLoader.load(obj[ii], function(gltfScene) {
				gltfScene.scale.set(10, 10, 10);
				gltfScene.position.y = 0;
				gltfScene.traverse(function(node){
					if(node.isMesh){
						node.castShadow = false;
						node.receiveShadow = true;
					}
				});
				flatClone.push(gltfScene);
			});
		});
	}
}

/////////////////////////////////////////////////////////////////////////////////

// CLASS FOR CREATING MODELS
/////////////////////////////////////////////////////////////////////////////////

function coin(zz){
	var here = coinClone.clone();
	here.position.x = xx + 100;
	here.position.z = zz;
	scene.add(here);
	coins.push(here);
}

function block(zz){
	var here = blockClone.clone();
	here.position.x = xx + Math.floor(Math.random()*200);
	here.position.z = zz;
	scene.add(here);
	blocks.push(here);
}

function flat(zz){
	var pp = Math.floor(Math.random()*6);
	var here = flatClone[pp].clone();
	here.position.x = xx;
	here.position.z = zz;
	scene.add(here);
	flats.push(here);
}

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



/////////////////////////////////////////////////////////////////////////////////


// Do not know yet
/////////////////////////////////////////////////////////////////////////////////

function sLight(zz){
	let light = new THREE.PointLight(0xFFFFFF, 200.0);
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

const loader1 = new GLTFLoader();
let mixer; // Declare a mixer variable to manage animations
var person;
var ani;
var ani2;
var jumpjump;

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

const loader = new THREE.TextureLoader();
const bgTexture = loader.load('./back.jpg');
bgTexture.colorSpace = THREE.SRGBColorSpace;
scene.background = bgTexture;


/////////////////////////////////////////////////////////////////////////////////



const divButtons=document.getElementById("myButtons");
const startButton=document.getElementById("startButton");
const scoreCard = document.getElementById("scoreCard");
const welcomeContainer=document.getElementById("welcomeContainer");

startButton.addEventListener("click",function(e){
	welcomeContainer.style.display = "none"
	divButtons.style.display="none";
	scoreCard.style.display="block";
	start();
	animate();
});

const playerCar = car();
scene.add(playerCar);

var time;
var time1;
var time2;
function animate() {
    requestAnimationFrame(animate);
    
	if (!end){
		if (mixer) {
			mixer.update(0.03);
			
			 // You can adjust the time delta as needed
			}
		// Rotate the car (if needed)
		if (playerCar) {
			playerCar.rotation.y += 1;
		}
		person.position.x += 1;
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
	}
    
	if (blocks.length > 0 && move.length > 0 && blocks[0].position.x == move[0].position.x+4
		&& 4>= Math.abs(blocks[0].position.z - move[0].position.z)) {
		end = true;
		toggleCardVisibility();
	}
	if (blocks.length > 1 && move.length > 0 && blocks[1].position.x == move[0].position.x+4
		&& 4>= Math.abs(blocks[1].position.z - move[0].position.z)) {
		end = true;
		toggleCardVisibility();
	}
	if (blocks.length > 2 && move.length > 0 && blocks[2].position.x == move[0].position.x+4
		&& 4>= Math.abs(blocks[2].position.z - move[0].position.z)) {
		end = true;
		toggleCardVisibility();
	}

	function updateLeaderboardd(score) {
		const leaderboard = document.getElementById('leaderboard');
		leaderboard.style.display = 'block';
	
		const scoreList = document.getElementById('scoreList');
		const newItem = document.createElement('li');
		newItem.textContent = 'Score: ' + score;
	
		const scores = Array.from(scoreList.children);
	
		// Insert the new score in the correct position
		let inserted = false;
		for (let i = 0; i < scores.length; i++) {
			const currentScore = parseInt(scores[i].textContent.split(': ')[1]);
			if (score > currentScore) {
				scoreList.insertBefore(newItem, scores[i]);
				inserted = true;
				break;
			}
		}
	
		// If the score hasn't been inserted yet, add it to the end
		if (!inserted) {
			scoreList.appendChild(newItem);
		}
	
		// Update the scores array with the new item
		scores.push(newItem);
	
		// Remove the last item if there are more than 5 scores
		while (scores.length > 5) {
			scoreList.removeChild(scores.shift()); // Remove the first item
		}
	}
	
	
	if (end == true) {
		updateLeaderboardd(points);
	
		// Display the leaderboard pop-up
		const leaderboardPopup = document.getElementById('leaderboardPopup');
		leaderboardPopup.style.display = 'none';
	}
	
	// Function to close the leaderboard pop-up
	function closeLeaderboardPopup() {
		const leaderboardPopup = document.getElementById('leaderboardPopup');
		leaderboardPopup.style.display = 'none';
	}

	const audioManager = new AudioManager('Video Game Coin Beep Sound Effect.mp3');
	for (let l=0;l<4;l++){
		if (coins.length > l && move.length > 0 && coins[l].position.x == move[0].position.x+3
			&& 4>= Math.abs(coins[l].position.z - move[0].position.z)) {
				audioManager.playSound();
				points += 1;
				if (points%30==0){
					levels = levels/2;
				}
				scoreElement.textContent = points;
				scene.remove(coins[l]);
				coins.shift();
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
	const rtt = new THREE.Mesh(
        new THREE.BoxGeometry(1,0.1,22),
        new THREE.MeshLambertMaterial({color:"black"})
    );
	rtt.position.x = xx;
	rtt.position.z = zz;
	rtt.castShadow = false;
    rtt.receiveShadow = true;
	rtt.position.y = -0.6;
    scene.add(rtt);
	paves.push(rtt);
}



var roads;
var paves;
var pills;
var blocks;
var flats;
var coins;
var points;
var levels;
var sLights;
var lightPoll;
function start(){
	xx = -20;
	time = 10;
	time1 = 0;
	time2 = [0,0];
	roads = [];
	paves = [];
	pills = [];
	blocks = [];
	flats = [];
	coins = [];
	sLights = [];
	lightPoll = [];
	points = 0;
	levels = 128;

	jumpjump = 0;

	right = -40;
	left = -40;
	sLight(-50);

	for (let i=0;i<300;i++){
		road();

		if (time==10){
			time = 0;
			flat00(-20);
			flat00(20);
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
	flat00(-20);
	flat00(20);
	flat00(-20);
	flat00(20);
}

var move; 
var end;
function car(){
    const car = new THREE.Group();
	move = [];
    const main = new THREE.Mesh(
        new THREE.BoxGeometry(6.0,1.5,3.0),
        new THREE.MeshLambertMaterial({color:"blue",
		opacity: 0,
		transparent: true,})
    );
	//main.castShadow = true;
    //main.receiveShadow = true;
    main.position.y =  1.2;
    scene.add(main);
	move.push(main);

	alert(move.length);
	end = false;
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
			camera.position.x = camera.position.x+15.9;
			camera.position.y = 4.7;
			camera.position.z = person.position.z;
			camera.rotation.y = Math.PI*(3/2);
			check= "true";
		}
		if (objectNumber==6 && check==="true"){
			camera.position.x = camera.position.x-15.9;
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
		if(check==="true"){
			camera.position.z -= 6;
		}
		
	}
	if (objectNumber==4 && person.position.z<6){
		person.position.z += 6;
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
		default:
			redraw = 0;
			break;
	}

	if (redraw) {
		renderScene(); // Trigger a redraw or rendering function
	}
}

// Add a keyboard event listener to the document
document.addEventListener('keydown', doKeyboard);


function toggleCardVisibility() {
	
	if (card.style.display === "none") {
		card.style.display = "block"; // Show the card
	} /*else {
		card.style.display = "none"; // Hide the card
	} */
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

    end = false;
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

    animate();
});


//animate();


































