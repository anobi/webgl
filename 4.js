var scene, renderer, camera, cubeCamera, controls;
var l1, l2, l3, l4;
var lcube, lsphere, pcube, psphere;

function init(){
    //init stuff
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    //configure things
    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.antialias = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI/2;

    camera.position.set(0, 20, -50);
    camera.lookAt(scene.position);

    document.body.appendChild(renderer.domElement);
    window.addEventListener('resize', resizeWindow, false);
}

function resizeWindow(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

THREE.PointLight.prototype.Visualize = function(){
    this.sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 16), new THREE.MeshBasicMaterial({color: this.color}));
    this.add(this.sphere);
};

THREE.SpotLight.prototype.Visualize = function(){
    this.cylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 1, 2, 16), new THREE.MeshBasicMaterial({color: this.color}));
    this.add(this.cylinder);
};


//create scene
function sceneSetup(){

    var ambientLight = new THREE.AmbientLight(0x111111);
    //scene.add(ambientLight);

    l1 = new THREE.PointLight(0xFF6666, 1, 1);
    l1.Visualize();
    l1.castShadow = true;
    l1.shadowDarkness = 0.5;
    l1.position.set(-20, 0, -20);
    scene.add(l1);

    l2 = new THREE.PointLight(0x66FF66, 1, 1);
    l2.Visualize();
    l2.castShadow = true;
    l2.shadowDarkness = 0.5;
    l2.position.set(-20, 5, 20);
    scene.add(l2);

    l3 = new THREE.PointLight(0x6666FF, 1, 1);
    l3.Visualize();
    l3.castShadow = true;
    l3.shadowDarkness = 0.5;
    l3.position.set(25, 0, 0);
    scene.add(l3);

    l4 = new THREE.SpotLight(0xFFFFFF, 1, 1);
    l4.Visualize();
    l4.castShadow = true;
    l4.position.set(0, 25, 0);

    scene.add(l4);

    var phong = new THREE.ShaderMaterial({
        uniforms: THREE.UniformsUtils.merge([
            THREE.UniformsLib.lights,
            THREE.UniformsLib.common,
            {
                diffuse: {type: 'c', value: new THREE.Color(0xBBBBBB)},
                diffuse_intensity: {type: 'f', value: 0.8},

                specularity: {type: 'c', value: new THREE.Color(0xFFFFFF)},
                specular_intensity: {type: 'f', value : 0.5},
                specular_hardness: {type: 'f', value : 60.0},
            }
        ]),
        lights: true,
        vertexShader: document.getElementById('vertexShader').text,
        fragmentShader: document.getElementById('phongShader').text,
    });

    var ground = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000), phong);
    ground.position.set(0, -5, 0);
    ground.rotation.x = -90 * (Math.PI / 180);
    ground.castShadow = true;
    ground.receiveShadow = true;
    scene.add(ground);

    //lambert shaded geos
    lcube = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), phong);
    lcube.position.set(0, 0, 0);
    lcube.castShadow = true;
    lcube.receiveShadow = true;
    scene.add(lcube);

    lsphere = new THREE.Mesh(new THREE.SphereGeometry(5, 16, 16), phong);
    lsphere.position.set(0, 10, 0);
    lsphere.castShadow = true;
    lsphere.receiveShadow = true;
    scene.add(lsphere);

    phong.needsUpdate = true;
}


function render() {
	requestAnimationFrame(render);

    var timer = Date.now() * 0.001;

    l1.position.y = Math.sin(timer) * 4;
    l2.position.y = Math.sin(timer / 2) * 4;
    l3.position.y = Math.cos(timer) * 4;

	renderer.render(scene, camera);
    controls.update();
}

init();
sceneSetup();
render();
