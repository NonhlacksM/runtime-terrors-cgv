import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

class Level2 {
    constructor() {
        this.createCar();
        this.createCoin();
        this.createFlat();
        this.createPoll();
        this.createSkybox();
    }

    createCar() {
        // Initialize your variables.
        this.car = [];
        const loadingManager = new THREE.LoadingManager();
        loadingManager.onProgress=function(url,itemsloaded,itemsTotal){
            //alert(1+"loading");
        }
        loadingManager.onLoad = function(){
            //alert("just finished");
        }
        
        var obj = ['Cop.obj','SUV.obj','Taxi.obj','SportsCar.obj'];
        var mtl = ['Cop.mtl','SUV.mtl','Taxi.mtl','SportsCar.mtl'];
        for (let ii=0; ii<4; ii++){
            const blockCreate = new MTLLoader();
            blockCreate.setPath('./models/car/');
            blockCreate.load(mtl[ii], (materials) => {
                materials.preload();

                const gltfLoader = new OBJLoader();
                gltfLoader.setPath('./models/car/');
                gltfLoader.setMaterials(materials);

                gltfLoader.load(obj[ii], (gltfScene) => {
                    gltfScene.position.y = 0;
                    gltfScene.rotation.y = Math.PI*(3/2);
                    gltfScene.scale.set(3, 4, 3);
                    gltfScene.traverse(function (node) {
                        if (node.isMesh) {
                            node.castShadow = true;
                            node.receiveShadow = true;
                        }
                    });

                    //this.car = gltfScene;
                    this.car.push(gltfScene);
                });
            });
        }
    }

    createCoin() {
        this.coin = null;
        const self = this;
        const loadingManager = new THREE.LoadingManager();
        loadingManager.onProgress=function(url,itemsloaded,itemsTotal){
            //alert(1+"loading");
        }
        loadingManager.onLoad = function(){
            //alert("just finished");
            //this.check = "true";
        }

        var coinCreate  = new MTLLoader(loadingManager);
        coinCreate.setPath('./models/coin/');
        coinCreate.load('materials.mtl', function(materials) {
            materials.preload();

            var glftLoader = new OBJLoader(loadingManager);
            glftLoader.setPath('./models/coin/');
            glftLoader.setMaterials(materials);

            glftLoader.load('./model.obj', function(gltfScene) {
                gltfScene.scale.set(1, 1, 1);
                gltfScene.position.y = 3;
                gltfScene.traverse(function(node){
                    if(node.isMesh){
                        node.castShadow = true;
                        node.receiveShadow = true;
                    }
                });
                self.coin = gltfScene;
            });
        });
    }

    createFlat() {
        this.flat = [];
        const self = this;
        const loadingManager = new THREE.LoadingManager();
        loadingManager.onProgress=function(url,itemsloaded,itemsTotal){
            //alert(1+"loading");
        }
        loadingManager.onLoad = function(){
            //alert("just finished");
            //this.check = "true";
        }

        for (let ii=0; ii<6; ii++){
            var obj = ['Barn.obj', 'BigBarn.obj', 'Silo_House.obj',
            'OpenBarn.obj', 'SmallBarn.obj', 'TowerWindmill.obj'];
            var mtl = ['Barn.mtl', 'BigBarn.mtl', 'Silo_House.mtl',
            'OpenBarn.mtl', 'SmallBarn.mtl', 'TowerWindmill.mtl'];
            var flatCreate = new MTLLoader();
            flatCreate.setPath('./models/farm/');
            flatCreate.load(mtl[ii], function(materials) {
                materials.preload();

                var glftLoader = new OBJLoader();
                glftLoader.setPath('./models/farm/');
                glftLoader.setMaterials(materials);

                glftLoader.load(obj[ii], function(gltfScene) {
                    gltfScene.scale.set(2, 2, 2);
                    gltfScene.position.y = 0;
                    gltfScene.traverse(function(node){
                        if(node.isMesh){
                            node.castShadow = false;
                            node.receiveShadow = true;
                        }
                    });
                    self.flat.push(gltfScene);
                });
            });
        }
    }

    createPoll() {
        this.poll = null;
        const self = this;
        const loadingManager = new THREE.LoadingManager();
        loadingManager.onProgress=function(url,itemsloaded,itemsTotal){
            //alert(1+"loading");
        }
        loadingManager.onLoad = function(){
            //alert("just finished");
            //this.check = "true";
        }

        var mtlLoader = new MTLLoader();
        mtlLoader.setPath('./models/lights/');
        mtlLoader.load('materials.mtl', function(materials) {
            materials.preload();

            var glftLoader = new OBJLoader();
            glftLoader.setPath('./models/lights/');
            glftLoader.setMaterials(materials);

            glftLoader.load('./model.obj', function(gltfScene) {
                gltfScene.traverse(function(node){
                    if(node.isMesh){
                        node.castShadow = true;
                        node.receiveShadow = true;
                    }
                });
                self.poll = gltfScene;
            });
        });
    }

    createSkybox(){
        let materialArray = [];
        let texture_ft = new THREE.TextureLoader().load( './models/skybox/meadow_ft.jpg');
        let texture_bk = new THREE.TextureLoader().load( './models/skybox/meadow_bk.jpg');
        let texture_up = new THREE.TextureLoader().load( './models/skybox/meadow_up.jpg');
        let texture_dn = new THREE.TextureLoader().load( './models/skybox/meadow_dn.jpg');
        let texture_rt = new THREE.TextureLoader().load( './models/skybox/meadow_rt.jpg');
        let texture_lf = new THREE.TextureLoader().load( './models/skybox/meadow_lf.jpg');
        
        materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));

        for (let i = 0; i < 6; i++)
        materialArray[i].side = THREE.BackSide;

        let skyboxGeo = new THREE.BoxGeometry( 300, 100, 100);
        this.skybox = new THREE.Mesh( skyboxGeo, materialArray );
    }



    getCar() {
        return this.car;
    }
    getCoin() {
        return this.coin;
    }
    getFlat() {
        return this.flat;
    }
    getPoll() {
        return this.poll;
    }
    getSkybox (){
        return this.skybox;
    }
    getLevel (){
        return 2;
    }
}

export default Level2;
