import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add ambient light to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

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
function animate() {
    requestAnimationFrame(animate);

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
		block(8*(Math.floor(Math.random()*3)-1));
	}
	if (time==10){
		time = 0;
		flats(-20);
		flats(20);
		road();
		pill(3);
		pill(-3);
		pill(10);
		pill(-10);
	}
	xx += 1;
	time += 1;
	time1 += 1;

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
	rtt.position.x = xx+300;
	rtt.position.y = -0.5;
	rtt.position.z = zz;
    scene.add(rtt);
}
function road(){
	const rtt = new THREE.Mesh(
        new THREE.BoxGeometry(10,0.1,22),
        new THREE.MeshLambertMaterial({color:"grey"})
    );
	rtt.position.x = xx+300;
	rtt.position.y = -0.6;
	//rtt.position.z = zz;
    scene.add(rtt);
}

function block(zz){
	const rtt = new THREE.Mesh(
        new THREE.BoxGeometry(6,6,6),
        new THREE.MeshLambertMaterial({color:"white"})
    );
	rtt.position.x = xx+300 + Math.floor(Math.random()*150);
	rtt.position.y = 0;
	rtt.position.z = zz;
    scene.add(rtt);
}

function flats(zz){
	var x = Math.floor(Math.random()*20);
	const rtt = new THREE.Mesh(
        new THREE.BoxGeometry(10,20 +x,5),
        new THREE.MeshLambertMaterial({color:"brown"})
    );
	rtt.position.x = xx+300;
	rtt.position.y = x/2;
	rtt.position.z = zz;
    scene.add(rtt);
}

var move; 
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

	xx = 0;
	time = 0;
	time1 = 0;
    return car;
}

let objectNumber = 1;
let useAnaglyph = false;

// Rendering function (replace with your rendering logic)
function renderScene() {
	//console.log(`objectNumber: ${objectNumber}, useAnaglyph: ${useAnaglyph}`);
	for (let i=0;i<move.length;i++){
		if (objectNumber==1){
			move[i].position.y += 3;
		}
		if (objectNumber==2){
			move[i].position.y -= 3;
		}
		if (objectNumber==3){
			move[i].position.z -= 6;
		}
		if (objectNumber==4){
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
