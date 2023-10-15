import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scoreElement = document.getElementById('score');
const card = document.getElementById("gameOverCard");
card.style.display = "none";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Shadow map type can be adjusted
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add ambient light to the scene
//const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//scene.add(ambientLight);
function sLight(zz){
	let light = new THREE.PointLight(0xFFFFFF, 200.0);
	light.position.set(zz, 11.5, 9.8);
	//light.target.position.set(300,0,0);
	light.castShadow = true;
	/*light.shadow.bias = -0.001;
	light.shadow.mapSize.width = 2048;
	light.shadow.mapSize.height = 2048;
	light.shadow.camera.near = 0.1;
	light.shadow.camera.far = 500.0;
	light.shadow.camera.left = 800;
	light.shadow.camera.right = -800;
	light.shadow.camera.top = 800;
	light.shadow.camera.bottom = -800;*/
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
			/*gltfScene.position.y = 4;
			gltfScene.scale.set(6, 6, 6);
			gltfScene.position.x = xx + Math.floor(Math.random()*200);
			gltfScene.position.z = zz;
			scene.add(gltfScene);
			blocks.push(gltfScene); */
			//////
			gltfScene.scale.set(4, 4, 4);
			gltfScene.position.x = zz;
			gltfScene.position.y = 10;
			gltfScene.position.z = 11;
			//gltfScene.rotation.z = Math.PI*(1/2);
			gltfScene.traverse(function(node){
				if(node.isMesh){
					node.castShadow = true;
					node.receiveShadow = true;
				}
			});
			scene.add(gltfScene);
			//coins.push(gltfScene);
			////
			//scene.add(gltfScene);
		});
	});
}
//sLight(0);
//sLight(100);
//sLight(200);
//sLight(300);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const loader = new THREE.TextureLoader();
const bgTexture = loader.load('./back.jpg');
bgTexture.colorSpace = THREE.SRGBColorSpace;
scene.background = bgTexture;

/*var mtlLoader = new MTLLoader();
mtlLoader.load('./untitled1.mtl', function(materials) {
	materials.preload();

	var glftLoader = new OBJLoader();
	glftLoader.setMaterials(materials);
	glftLoader.load('./untitled1.obj', function(gltfScene) {
		//loadedModel = gltfScene;
		// console.log(loadedModel);

		gltfScene.rotation.y = Math.PI*(1/2);
		//gltfScene.scene.position.y = 3;
		gltfScene.scale.set(0.5, 0.5, 0.5);
		scene.add(gltfScene);
	});
});*/


function block(zz){
	var mtlLoader = new MTLLoader();
	mtlLoader.setPath('./models/train/');
	mtlLoader.load('materials.mtl', function(materials) {
		materials.preload();

		var glftLoader = new OBJLoader();
		glftLoader.setPath('./models/train/');
		glftLoader.setMaterials(materials);

		glftLoader.load('./model.obj', function(gltfScene) {
			gltfScene.position.y = 4;
			gltfScene.scale.set(6, 6, 6);
			//gltfScene.position.x = xx + Math.floor(Math.random()*200);
			gltfScene.position.x = xx;
			gltfScene.position.z = zz;
			gltfScene.traverse(function(node){
				if(node.isMesh){
					node.castShadow = true;
					node.receiveShadow = true;
				}
			});
			scene.add(gltfScene);
			blocks.push(gltfScene);
			//scene.add(gltfScene);
		});
	});
}

function coin(zz){
	var mtlLoader = new MTLLoader();
	mtlLoader.setPath('./models/coin/');
	mtlLoader.load('CoinDollarSign.mtl', function(materials) {
		materials.preload();

		var glftLoader = new OBJLoader();
		glftLoader.setPath('./models/coin/');
		glftLoader.setMaterials(materials);

		glftLoader.load('./CoinDollarSign.obj', function(gltfScene) {
			/*gltfScene.position.y = 4;
			gltfScene.scale.set(6, 6, 6);
			gltfScene.position.x = xx + Math.floor(Math.random()*200);
			gltfScene.position.z = zz;
			scene.add(gltfScene);
			blocks.push(gltfScene); */
			//////
			gltfScene.scale.set(6, 6, 6);
			gltfScene.position.x = xx+100;
			gltfScene.position.y = 2;
			gltfScene.position.z = zz;
			//gltfScene.rotation.z = Math.PI*(1/2);
			gltfScene.traverse(function(node){
				if(node.isMesh){
					node.castShadow = true;
					node.receiveShadow = true;
				}
			});
			scene.add(gltfScene);
			coins.push(gltfScene);
			////
			//scene.add(gltfScene);
		});
	});
}
const divButtons=document.getElementById("myButtons");
const startButton=document.getElementById("startButton");
startButton.addEventListener("click",function(e){
	divButtons.style.display="none";
	start();
	animate();
});

const playerCar = car();
///////////


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
	//gltf.scene.castShadow = true;
    //gltf.scene.receiveShadow = false;
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
		//firstAnimationAction1.play();
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
/*const restart =document.getElementById("restart-button");
restart.addEventListener("click",function(e){
	alert("game over!!");
	start();
});*/
		

//////////

// Add directional light to the scene


 // Declare the car variable in a higher scope

// Load the 3D car model (replace 'path/to/your/car.gltf' with your model's path)
/* const loader = new GLTFLoader();
loader.load('path/to/your/car.gltf', (gltf) => {
    car = gltf.scene; // Assign the loaded car model to the car variable
    scene.add(car);
}); */
scene.add(playerCar);
camera.position.x = -15;
camera.position.y = 7;
camera.position.z = 0;

//camera.rotation.z = -0.3;
camera.rotation.y = Math.PI*(3/2);

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

		if (blocks.length > 0 && move.length > 2 && blocks[0].position.x <= move[2].position.x-15) {
			scene.remove(blocks[0]);
			blocks.shift();
		}

		if (coins.length > 0 && move.length > 2 && coins[0].position.x <= move[2].position.x-15) {
			scene.remove(coins[0]);
			coins.shift();
		}

		if (xx%50==0){
			sLight(xx);
			scene.remove(sLights[0]);
			sLights.shift();
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
    
	if (blocks.length > 0 && move.length > 2 && blocks[0].position.x == move[2].position.x+4
		&& 4>= Math.abs(blocks[0].position.z - move[2].position.z)) {
		end = true;
		toggleCardVisibility();
		// alert("Game Over! You crashed!"+points);
	}
	if (blocks.length > 1 && move.length > 2 && blocks[1].position.x == move[2].position.x+4
		&& 4>= Math.abs(blocks[1].position.z - move[2].position.z)) {
		end = true;
		toggleCardVisibility();
		//alert("Game Over! You crashed!"+points);
	}
	if (blocks.length > 2 && move.length > 2 && blocks[2].position.x == move[2].position.x+4
		&& 4>= Math.abs(blocks[2].position.z - move[2].position.z)) {
		end = true;
		toggleCardVisibility();
		//alert("Game Over! You crashed!"+points);
	}

	for (let l=0;l<4;l++){
		if (coins.length > l && move.length > 2 && coins[l].position.x == move[2].position.x+3
			&& 4>= Math.abs(coins[l].position.z - move[2].position.z)) {
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

/*const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );*/
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

/*function block(zz){
	/*const rtt = new THREE.Mesh(
        new THREE.BoxGeometry(6,6,6),
        new THREE.MeshLambertMaterial({color:"white"})
    );
	train(zz);
	/*rtt.position.x = xx + Math.floor(Math.random()*200);
	rtt.position.y = 0;
	rtt.position.z = zz;
    scene.add(rtt);
	blocks.push(rtt);
} */

/*function flat(zz){
	var x = Math.floor(Math.random()*20);
	const rtt = new THREE.Mesh(
        new THREE.BoxGeometry(10,20 +x,5),
        new THREE.MeshLambertMaterial({color:"brown"})
    );
	rtt.position.x = xx;
	rtt.position.y = x/2;
	rtt.position.z = zz;
    scene.add(rtt);
	flats.push(rtt)
}*/

/*function coin(zz){
	/*const rtt = new THREE.Mesh(
        new THREE.CylinderGeometry(1,1,0.1,100),
        new THREE.MeshLambertMaterial({color:"yellow"})
    ); 
	rtt.position.x = xx+100;
	rtt.position.y = 2;
	rtt.position.z = zz;
	rtt.rotation.z = Math.PI*(1/2);
    scene.add(rtt);
	coins.push(rtt);
} */



var roads;
var paves;
var pills;
var blocks;
var flats;
var coins;
var points;
var levels;
var sLights;
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
    const backwheel = new THREE.Mesh(
        new THREE.BoxGeometry(1.2,1.2,3.3),
        new THREE.MeshLambertMaterial({color:"grey",
		opacity: 0,
		transparent: true,})
    );
	//backwheel.castShadow = true;
    backwheel.receiveShadow = true;
    backwheel.position.y = 0.6;
    backwheel.position.x = -1.8;
    scene.add(backwheel);
	move.push(backwheel);

    const frontwheel = new THREE.Mesh(
        new THREE.BoxGeometry(1.2,1.2,3.3),
        new THREE.MeshLambertMaterial({color:"grey",
		opacity: 0,
		transparent: true,})
    );
	//frontwheel.castShadow = true;
    frontwheel.receiveShadow = true;
    frontwheel.position.y = 0.6;
    frontwheel.position.x = 1.8;
    scene.add(frontwheel);
	move.push(frontwheel);
    
    const main = new THREE.Mesh(
        new THREE.BoxGeometry(6.0,1.5,3.0),
        new THREE.MeshLambertMaterial({color:"blue",
		opacity: 0,
		transparent: true,})
    );
	//main.castShadow = true;
    main.receiveShadow = true;
    main.position.y =  1.2;
    scene.add(main);
	move.push(main);

    const cabin = new THREE.Mesh(
        new THREE.BoxGeometry(3.3,1.2,2.4),
        new THREE.MeshLambertMaterial({color:"red",
		opacity: 0,
		transparent: true,})
    ); 
	//cabin.castShadow = true;
    cabin.receiveShadow = true;
    cabin.position.x =-0.6;
    cabin.position.y =2.55;
    scene.add(cabin);  
	move.push(cabin);  

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
		move[2].visible = true;
	

    camera.position.set(-15, 7, 0);
    person.position.x = 0;

    animate();
});


//animate();

































function flat(zz){
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
			/*gltfScene.position.y = 4;
			gltfScene.scale.set(10, 10, 10);
			gltfScene.position.x = xx + Math.floor(Math.random()*200);
			gltfScene.position.z = zz;
			scene.add(gltfScene);
			blocks.push(gltfScene);*/
			//scene.add(gltfScene);

			//var x = Math.floor(Math.random()*20);
			gltfScene.scale.set(10, 10, 10);
			gltfScene.position.x = xx;
			
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
			/*gltfScene.position.y = 4;
			gltfScene.scale.set(10, 10, 10);
			gltfScene.position.x = xx + Math.floor(Math.random()*200);
			gltfScene.position.z = zz;
			scene.add(gltfScene);
			blocks.push(gltfScene);*/
			//scene.add(gltfScene);

			//var x = Math.floor(Math.random()*20);
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
