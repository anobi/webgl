var scene, renderer, camera;
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

var lambert = new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.lights,
        {
            diffuse: {type: 'c', value: new THREE.Color(0xBBBBBB)}
        }
    ]),
    lights: true,
    vertexShader: document.getElementById('vertexShader').text,
    fragmentShader: document.getElementById('lambertShader').text,
});

var phong = new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.lights,
        {
            diffuse: {type: 'c', value: new THREE.Color(0xBBBBBB)},
            diffuse_intensity: {type: 'f', value: 0.8},

            specularity: {type: 'c', value: new THREE.Color(0xFFFFFF)},
            specular_intensity: {type: 'f', value : 0.5},
            specular_hardness: {type: 'f', value : 60.0}
        }
    ]),
    lights: true,
    vertexShader: document.getElementById('vertexShader').text,
    fragmentShader: document.getElementById('phongShader').text,
});

THREE.PointLight.prototype.addSphere = function(){
    this.sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 16), new THREE.MeshBasicMaterial({color: this.color}));
    this.add(this.sphere);
};


//create scene
function sceneSetup(){

    var ambientLight = new THREE.AmbientLight(0x111111);
    //scene.add(ambientLight);

    l1 = new THREE.PointLight(0xFFFFFF, 1, 1);
    l1.addSphere();
    l1.position.set(-20, 0, -20);
    scene.add(l1);

    l2 = new THREE.PointLight(0xFFFFFF, 1, 1);
    l2.addSphere();
    l2.position.set(-20, 0, 20);
    scene.add(l2);

    l3 = new THREE.PointLight(0xFFFFFF, 1, 1);
    l3.addSphere();
    l3.position.set(20, 0, 20);
    scene.add(l3);

    l4 = new THREE.PointLight(0xFFFFFF, 1, 1);
    l4.addSphere();
    l4.position.set(20, 0, -20);
    scene.add(l4);

    var ground = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000), phong);
    ground.position.set(0, -5, 0);
    ground.rotation.x = -90 * (Math.PI / 180);
    scene.add(ground);

    //lambert shaded geos
    lcube = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5), phong);
    lcube.position.set(-20, 0, 30);
    scene.add(lcube);

    lsphere = new THREE.Mesh(new THREE.SphereGeometry(5, 8, 8), phong);
    lsphere.position.set(-20, 0, -12);
    scene.add(lsphere);

    //new phong shaded geos
    pcube = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5), lambert);
    pcube.position.set(20, 0, 30);
    scene.add(pcube);

    psphere = new THREE.Mesh(new THREE.SphereGeometry(5, 8, 8), lambert);
    psphere.position.set(20, 0, -12);
    scene.add(psphere);

    lambert.needsUpdate = true;
    phong.needsUpdate = true;
}


function render() {
	requestAnimationFrame(render);

    var timer = Date.now() * 0.001;

    l1.position.y = Math.sin(timer) * 4;
    l2.position.y = Math.sin(timer) * 4;
    l3.position.y = Math.cos(timer) * 4;
    l4.position.y = Math.cos(timer) * 4;

    camera.position.x = Math.sin(timer) * 50;
    camera.lookAt(scene.position);

	renderer.render(scene, camera);
}

init();
sceneSetup();
render();
