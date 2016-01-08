var scene, renderer, camera;
var cube;

function init(){
    //init stuff
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    //configure things
    renderer.setClearColor(0x000011);
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.position.set(0, 5, 50);
    camera.lookAt(scene.position);

    document.body.appendChild(renderer.domElement);
    window.addEventListener('resize', resizeWindow, false);
}

function resizeWindow(){
    camera.aspect = window.innerWidth / window.innerHeight; 
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

var shader = new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.lights,
        {}
    ]),
    lights: true,
    vertexShader: document.getElementById('vertexShader').text,
    fragmentShader: document.getElementById('fragmentShader').text,
});

THREE.PointLight.prototype.addSphere = function(){
    this.sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 16), new THREE.MeshBasicMaterial({color: this.color}));
    this.add(this.sphere);
};


//create scene
function sceneSetup(){

    var ambientLight = new THREE.AmbientLight(0x111111);
    scene.add(ambientLight);

    var pointLight = new THREE.PointLight(0xFF0000,1,100);
    pointLight.addSphere();
    pointLight.position.set(10, 0, 0);
    scene.add(pointLight);

    var pointLight2 = new THREE.PointLight(0x00FF00,1,100);
    pointLight2.addSphere();
    pointLight2.position.set(0, 10, 0);
    scene.add(pointLight2);

    var pointLight3 = new THREE.PointLight(0x0000FF,1,100);
    pointLight3.addSphere();
    pointLight3.position.set(0, 0, 10);
    scene.add(pointLight3);

    var pointLight4 = new THREE.PointLight(0xFFFFFF,1,100);
    pointLight4.addSphere();
    pointLight4.position.set(-8, 0, -8);
    scene.add(pointLight4);

    shader.needsUpdate = true;

    cube = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5),
                            shader);

    cube.position.set(0, 0, 0);
    scene.add(cube);

    var ground = new THREE.Mesh(new THREE.PlaneGeometry(100, 100),
                                shader);
    ground.position.set(0, -5, 0);
    ground.rotation.x = -90 * (Math.PI / 180);
    scene.add(ground);

}


function render() {
	requestAnimationFrame(render);

    var timer = Date.now() * 0.0005;

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    camera.position.x = Math.cos(timer) * 50;
    camera.position.z = Math.sin(timer) * 50;
    camera.position.y = Math.cos(timer) * 4.5;
    camera.lookAt(scene.position);

	renderer.render(scene, camera);
}

init();
sceneSetup();
render();
