var scene, renderer, camera;
var l1, l2, l3, l4;

function init(){
    //init stuff
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    //configure things
    renderer.setClearColor(0x000000);
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
        {
            diffuse: {type: 'c', value: new THREE.Color(0xBBBBBB)}
        }
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
    //scene.add(ambientLight);

    l1 = new THREE.PointLight(0xFFFFFF,1, 10);
    l1.addSphere();
    l1.position.set(-20, 0, 0);
    scene.add(l1);

    l2 = new THREE.PointLight(0xFFFFFF, 1, 5);
    l2.addSphere();
    l2.position.set(-7, 0, 0);
    scene.add(l2);

    l3 = new THREE.PointLight(0xFFFFFF, 1, 3);
    l3.addSphere();
    l3.position.set(7, 0, 0);
    scene.add(l3);

    l4 = new THREE.PointLight(0xFFFFFF, 1, 1);
    l4.addSphere();
    l4.position.set(20, 0, 0);
    scene.add(l4);

    var ground = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000),
                                shader);
    ground.position.set(0, -5, 0);
    ground.rotation.x = -90 * (Math.PI / 180);
    scene.add(ground);

    shader.needsUpdate = true;
}


function render() {
	requestAnimationFrame(render);

    var timer = Date.now() * 0.001;

    l1.position.y = Math.sin(timer) * 4;
    l2.position.z = Math.sin(timer) * 5;
    l3.position.z = Math.cos(timer) * 5;
    l4.position.y = Math.cos(timer) * 4;

    camera.lookAt(scene.position);

    shader.needsUpdate = true;
	renderer.render(scene, camera);
}

init();
sceneSetup();
render();
