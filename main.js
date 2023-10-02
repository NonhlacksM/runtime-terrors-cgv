import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add ambient light to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
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
			gltfScene.position.x = xx + Math.floor(Math.random()*200);
			gltfScene.position.z = zz;
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
			scene.add(gltfScene);
			coins.push(gltfScene);
			////
			//scene.add(gltfScene);
		});
	});
}


start();
const playerCar = car();

// Add directional light to the scene
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);

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
		// Rotate the car (if needed)
		if (playerCar) {
			playerCar.rotation.y += 1;
		}
		for (let i=0;i<move.length;i++){
			move[i].position.x += 1;
		}
		camera.position.x += 1;

		if (time1==100){
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
		alert("Game Over! You crashed!"+points);
	}
	if (blocks.length > 1 && move.length > 2 && blocks[1].position.x == move[2].position.x+4
		&& 4>= Math.abs(blocks[1].position.z - move[2].position.z)) {
		end = true;
		alert("Game Over! You crashed!"+points);
	}
	if (blocks.length > 2 && move.length > 2 && blocks[2].position.x == move[2].position.x+4
		&& 4>= Math.abs(blocks[2].position.z - move[2].position.z)) {
		end = true;
		alert("Game Over! You crashed!"+points);
	}

	for (let l=0;l<4;l++){
		if (coins.length > l && move.length > 2 && coins[l].position.x == move[2].position.x+3
			&& 4>= Math.abs(coins[l].position.z - move[2].position.z)) {
				points += 1;
				scene.remove(coins[l]);
				coins.shift();
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
	points = 0;

	right = -40;
	left = -40;

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
        new THREE.MeshLambertMaterial({color:"grey"})
    );
    backwheel.position.y = 0.6;
    backwheel.position.x = -1.8;
    scene.add(backwheel);
	move.push(backwheel);

    const frontwheel = new THREE.Mesh(
        new THREE.BoxGeometry(1.2,1.2,3.3),
        new THREE.MeshLambertMaterial({color:"grey"})
    );
    frontwheel.position.y = 0.6;
    frontwheel.position.x = 1.8;
    scene.add(frontwheel);
	move.push(frontwheel);
    
    const main = new THREE.Mesh(
        new THREE.BoxGeometry(6.0,1.5,3.0),
        new THREE.MeshLambertMaterial({color:"blue"})
    );
    main.position.y =  1.2;
    scene.add(main);
	move.push(main);

    const cabin = new THREE.Mesh(
        new THREE.BoxGeometry(3.3,1.2,2.4),
        new THREE.MeshLambertMaterial({color:"red"})
    ); 
    cabin.position.x =-0.6;
    cabin.position.y =2.55;
    scene.add(cabin);  
	move.push(cabin);  

	end = false;
    return car;
}

let objectNumber = 1;
let useAnaglyph = false;

// Rendering function (replace with your rendering logic)
function renderScene() {
	//console.log(`objectNumber: ${objectNumber}, useAnaglyph: ${useAnaglyph}`);
	for (let i=0;i<move.length;i++){
		if (objectNumber==1 && move[i].position.y<3){
			move[i].position.y += 3;
		}
		if (objectNumber==2 && move[i].position.y>2){
			move[i].position.y -= 3;
		}
		if (objectNumber==3 && move[i].position.z>-6){
			move[i].position.z -= 6;
		}
		if (objectNumber==4 && move[i].position.z<6){
			move[i].position.z += 6;
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

animate();

































function flat(zz){
	var pp = Math.floor(Math.random()*6);
	console.log(pp+" x value 2 :"+xx);
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
			console.log(pp+" x value"+xx);
			gltfScene.position.y = 0;
			gltfScene.position.z = zz;
			scene.add(gltfScene);
			flats.push(gltfScene);
		});
	});
}

var right;
var left;
function flat00(zz){
	var pp = Math.floor(Math.random()*6);
	console.log(pp+" x value 2 :"+xx);
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
			console.log(pp+" x value"+xx);
			gltfScene.position.y = 0;
			gltfScene.position.z = zz;
			scene.add(gltfScene);
			flats.push(gltfScene);
		});
	});
}