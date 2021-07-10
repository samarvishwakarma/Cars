import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GLTFLoader, GLTFParser, GLTFReference } from 'three/examples/jsm/loaders/GLTFLoader';
import { Color, Object3D, PointLightHelper, TextureLoader } from 'three';
import gsap from "gsap";
// import materials from '/static/head.gltf'
//loader 
let model,mesh;
const loader = new GLTFLoader();
loader.load('/head.gltf',(gltf)=>{
    gltf.scene.position.z=0
    gltf.scene.position.y=-0.5
    gltf.scene.rotation.y=1.5
    gltf.scene.castShadow = true;
    gltf.scene.recieveShadow = true;
    model = gltf.scene;
    scene.add(gltf.scene)
    gltf.scene.traverse( function( node ) {

        if ( node.isMesh ) { node.castShadow = true; }

    } );
    // gltf.scene.scale
    const carcolor = {
        color : 0x000000
    }
    // console.log(gltf.parser.associations)
    let f = 0;
    for (let [key, value] of gltf.parser.associations.entries(Object)) {
        f=f+1;
        // console.log(`${key}: ${value}`);
        // console.log(value.index);
        // mesh = key.color.setRGB(0,0,0);
        // key.clipShadows =true;
        gui.addColor(carcolor,'color')
            .onChange(() => {
                key.color.set(carcolor.color)
            })
        if(f==3)
        break;
      }

})

// loader.load('/hair.gltf',(object)=>{
//     // console.log(object)
//     scene.add(object.scene)
//     object.scene.position.y=-0.5
//     object.scene.castShadow = true;
//     object.scene.receiveShadow=true;
// })



// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//texture
const text= new THREE.TextureLoader();
//plane
const geometry = new THREE.PlaneGeometry(5,5,64,64);
const material = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide, map: text.load('/shadow.png'), transparent: true} );
const plane = new THREE.Mesh( geometry, material );
scene.add( plane );
plane.rotation.x=4.74
plane.rotation.z=-4.77
plane.position.y=-0.4


//hdri
let materialArray = [];
let texture_ft = new THREE.TextureLoader().load( 'blizzard_ft.jpg');
let texture_bk = new THREE.TextureLoader().load( 'blizzard_bk.jpg');
let texture_up = new THREE.TextureLoader().load( 'blizzard_up.jpg');
let texture_dn = new THREE.TextureLoader().load( 'blizzard_dn.jpg');
let texture_rt = new THREE.TextureLoader().load( 'blizzard_rt.jpg');
let texture_lf = new THREE.TextureLoader().load( 'blizzard_lf.jpg');
  
materialArray.push(new THREE.MeshStandardMaterial( { map: texture_ft }));
materialArray.push(new THREE.MeshStandardMaterial( { map: texture_bk }));
materialArray.push(new THREE.MeshStandardMaterial( { map: texture_up }));
materialArray.push(new THREE.MeshPhysicalMaterial( { map: texture_dn, reflectivity: 1, metalness: 0.5}));
materialArray.push(new THREE.MeshStandardMaterial( { map: texture_rt }));
materialArray.push(new THREE.MeshStandardMaterial( { map: texture_lf }));
   
for (let i = 0; i < 6; i++)
  materialArray[i].side = THREE.BackSide;
   
let skyboxGeo = new THREE.BoxGeometry( 15, 15, 15);
let skybox = new THREE.Mesh( skyboxGeo, materialArray );
scene.add( skybox );
skybox.position.y=7
skybox.receiveShadow = true


// Lights

    const pointLight = new THREE.DirectionalLight(0xffffff, 1)
    pointLight.position.x = 0
    pointLight.position.y = 0.5
    pointLight.position.z = 2
    scene.add(pointLight)
    pointLight.castShadow = true
    pointLight.shadow.camera = new THREE.OrthographicCamera( 2, 2, 2, 2, 0.1, 1000);
    
    const pointLight2 = new THREE.PointLight(0xffffff, 0.1)
    pointLight2.position.x = 0
    pointLight2.position.y = 1
    pointLight2.position.z = 1
    scene.add(pointLight2)

    const pointLight3 = new THREE.DirectionalLight(0xffffff, 1)
    pointLight3.position.x = 1
    pointLight3.position.y = 1
    pointLight3.position.z = -2
    scene.add(pointLight3)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    document.body.appendChild(renderer.domElement)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 30000)
camera.position.x = 2
camera.position.y = 1
camera.position.z = 10
scene.add(camera)
gsap.to(camera.position,{
    x: 0.1,
    y: 0.2,
    z: 3.3,
    duration: 3} )

gsap.to(camera.position,{
    x: -2.85,
    y: 0.52,
    z: -0.77,
    duration: 3, delay: 4} )    

gsap.to(camera.position,{
        x: 1.2,
        y: 0.2,
        z: -2.7,
        duration: 3, delay: 8} )   

gsap.to(camera.position,{
        x: 2.7,
        y: 0.5,
        z: 1.1,
        duration: 3, delay: 11.5} ) 

gsap.to(camera.position,{
    x: 1.16,
    y: 2.57,
    z: 1.0,
    duration: 3, delay: 14.5} )

gsap.to(camera.position,{
    x: 1.84,
    y: 4.08,
    z: 1.59,
    duration: 3, delay: 14.5} )

    
// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.maxDistance = 8
controls.minDistance = 3
controls.maxPolarAngle = 1.5
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias:true,
    // alpha:true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.gammaOutput = true

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // gltf.scene.rotation.y = 0.0005 * elapsedTime
    if (model) {
        // model.rotation.y -= 0.01;
    }
    // console.log(camera.position)s
    // Update Orbital Controls
    controls.update()
    
    // Render
    // mesh.pbrMetallicRoughness.baseColorFactor[2]=1;

    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()