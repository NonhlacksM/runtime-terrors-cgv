import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

class Level1 {
    constructor() {
        this.createCar();
        this.createCoin();
        this.createFlat();
        this.createPoll();
        this.createSkybox();
    }

    createCar() {
        // Initialize your variables.
        this.train = null;
        const loadingManager = new THREE.LoadingManager();
        
        loadingManager.onProgress = function(url, loaded, total) {
            
        }

        loadingManager.onLoad = function() {
         
        }
        const blockCreate = new MTLLoader(loadingManager);

        blockCreate.setPath('./models/train/');
        blockCreate.load('materials.mtl', (materials) => {
            materials.preload();

            const gltfLoader = new OBJLoader(loadingManager);
            gltfLoader.setPath('./models/train/');
            gltfLoader.setMaterials(materials);

            gltfLoader.load('./model.obj', (gltfScene) => {
                gltfScene.position.y = 4;
                gltfScene.scale.set(6, 6, 6);
                gltfScene.traverse(function (node) {
                    if (node.isMesh) {
                        node.castShadow = true;
                        node.receiveShadow = true;
                    }
                });

                this.train = gltfScene;
            });
        });
    }

    createCoin() {
        this.coin = null;
        const self = this;
        const loadingManager = new THREE.LoadingManager();
        
        loadingManager.onProgress = function(url, loaded, total) {
            
        }

        loadingManager.onLoad = function() {
         
        }

        var coinCreate  = new MTLLoader(loadingManager);
        coinCreate.setPath('./models/coin/');
        coinCreate.load('CoinDollarSign.mtl', function(materials) {
            materials.preload();

            var glftLoader = new OBJLoader(loadingManager);
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
                self.coin = gltfScene;
            });
        });
    }

    createFlat() {
        this.flat = [];
        const self = this;
        const loadingManager = new THREE.LoadingManager();
       
        loadingManager.onProgress = function(url, loaded, total) {
            
        }

        loadingManager.onLoad = function() {
          
        }

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
                    self.flat.push(gltfScene);
                });
            });
        }
    }

    createPoll() {
        this.poll = null;
        const self = this;
        const loadingManager = new THREE.LoadingManager();
        
        loadingManager.onProgress = function(url, loaded, total) {
            
        }

        loadingManager.onLoad = function() {
          
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
        return this.train;
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
        return 1;
    }
}

export default Level1;
