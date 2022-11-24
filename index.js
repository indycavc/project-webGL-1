import * as THREE from './three.js-master/build/three.module.js'

var scene, camera, renderer

const init = () => {
    //Create scene
    scene = new THREE.Scene()

    //Cara ganti warna background
    // scene.background = new THREE.Color(0x00ff)

    //Create camera
    const fov = 45
    const aspect = window.innerWidth / window.innerHeight
    const near = 0.1
    const far = 10000
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.set(0, 100, 100)
    camera.lookAt(0, 0, 0)

    //Create renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    renderer.shadowMap.enabled = true
}

const createPlaneGeometry = () => {
    //Create geometry (kerangka)
    const planeGeometry = new THREE.PlaneGeometry(120, 120)

    //Use texture
    const texture = useTexture('./texture/asphalt.jpg')

    //Create material (bahan-bahan)
    const planeMaterial = new THREE.MeshLambertMaterial({
        side: THREE.DoubleSide,
        map: texture
    })

    //Create mesh (objek jadi)
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)

    //Recieve shadow
    planeMesh.receiveShadow = true

    return planeMesh
}

const createBoxGeometry = () => {
    //Create geometry
    const boxGeometry = new THREE.BoxGeometry(10, 10, 10)

    //Use texture
    const texture = useTexture('./texture/Question.jpg')

    //Create material
    const boxMaterial = new THREE.MeshPhongMaterial({
        map: texture
    })

    //Create mesh
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)

    //Cast shadow
    boxMesh.castShadow = true

    return boxMesh
}

const useTexture = (pathImage) => {
    const loader = new THREE.TextureLoader()
    // const texture = loader.load('./texture/asphalt.jpg')
    const texture = loader.load(pathImage)

    return texture
}

const createAmbientLight = () => {
    const ambientLight = new THREE.AmbientLight()

    return ambientLight
}

const createPointLight = () => {
    const pointLight = new THREE.PointLight(0xffffff, 2)

    return pointLight
}

const createSpotLight = () => {
    const spotLight = new THREE.SpotLight(0xffffff, 1, 0, Math.PI/2)
    spotLight.castShadow = true

    return spotLight
}

const createLightHelper = (light) => {
    let helper = ""

    if(light.type == "PointLight"){
        helper = new THREE.PointLightHelper(light, 10)
    } else if (light.type == "SpotLight"){
        helper = new THREE.SpotLightHelper(light)
    }

    return helper
}

window.onload = () => {
    init()
    // === Geometry= ===
    let planeGeometry = createPlaneGeometry()
    planeGeometry.rotateX(Math.PI/2)

    let boxGeometry1 = createBoxGeometry()
    boxGeometry1.position.y = 20

    let boxGeometry2 = createBoxGeometry()
    boxGeometry2.position.x = -20
    boxGeometry2.position.y = 20

    let boxGeometry3 = createBoxGeometry()
    boxGeometry3.position.x = 20
    boxGeometry3.position.y = 20

    // === Light ===
    let ambientLight = createAmbientLight()

    let pointLight = createPointLight()
    pointLight.position.y = 40

    let spotLight = createSpotLight()
    spotLight.position.y = 70
    spotLight.angle = Math.PI/3

    // === Light helper ===
    let pointLightHelper = createLightHelper(pointLight)
    let spotLightHelper = createLightHelper(spotLight)

    // === Scene add ===
    scene.add(planeGeometry)
    scene.add(boxGeometry1)
    scene.add(boxGeometry2)
    scene.add(boxGeometry3)
    // scene.add(ambientLight)
    // scene.add(pointLight)
    // scene.add(pointLightHelper)
    scene.add(spotLight)
    // scene.add(spotLightHelper)

    const render = () => {
        requestAnimationFrame(render)
        boxGeometry1.rotation.x += 0.03
        boxGeometry1.rotation.y += 0.03
        boxGeometry2.rotation.x += 0.03
        boxGeometry2.rotation.y += 0.03
        boxGeometry3.rotation.x += 0.03
        boxGeometry3.rotation.y += 0.03
        renderer.render(scene, camera)
    }
    render()
}