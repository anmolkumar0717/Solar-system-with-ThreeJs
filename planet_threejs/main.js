import  * as THREE from 'three'
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'
const scene=new THREE.Scene();

// initialize the material and also create a new shape geometry
const spheregeometry=new THREE.SphereGeometry(1,32,32)


const textureloader= new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()
cubeTextureLoader.setPath('/textures/cubeMap/')
const suntexture = textureloader.load(
  '/textures/2k_sun.jpg'
)

const mercuryTexture = textureloader.load(
  '/textures/2k_mercury.jpg'
)

const venusTexture = textureloader.load(
  '/textures/2k_venus_surface.jpg'
)

const earthTexture = textureloader.load(
  '/textures/2k_earth_daymap.jpg'
)
const marsTexture = textureloader.load(
  '/textures/2k_mars.jpg'
)
const jupyterTexture= textureloader.load(
  '/textures/2k_jupiter.jpg'
)

const saturnTexture=textureloader.load(
  '/textures/2k_saturn.jpg'
)
const uranusTexture=textureloader.load(
  '/textures/2k_uranus.jpg'
)
const neptuneTexture=textureloader.load(
  '/textures/2k_neptune.jpg'
)
const moonTexture = textureloader.load(
  '/textures/2k_moon.jpg'
)

const backgroundCubemap=cubeTextureLoader.load(
  [
    'px.png',
    'nx.png',
    'py.png',
    'ny.png',
    'pz.png',
    'nz.png'
  ]
)
scene.background=backgroundCubemap
// Add Materials to the planets

 
const sunmaterial = new THREE.MeshBasicMaterial(
  {
    map:suntexture
  }
)
const mercuryMaterial = new THREE.MeshStandardMaterial(
  {
    map:mercuryTexture
  }
)

const venusMaterial=new THREE.MeshStandardMaterial(
  {
    map:venusTexture
  }
)

const earthMaterial = new THREE.MeshStandardMaterial(
  {
    map:earthTexture
  }
)
const marsMaterial=new THREE.MeshStandardMaterial(
  {
    map:marsTexture
  }
)

const jupyterMaterial=new THREE.MeshStandardMaterial(
  {
    map:jupyterTexture
  }
)

const saturnMaterial=new THREE.MeshStandardMaterial(
  {
    map:saturnTexture
  }
)

const uranusMaterial=new THREE.MeshStandardMaterial(
  {
    map:uranusTexture
  }
)

const nepturnMaterial=new THREE.MeshStandardMaterial(
  {
    map:neptuneTexture
  }
)

const moonMaterial=new THREE.MeshStandardMaterial(
  {
    map:moonTexture
  }
)
const sun = new THREE.Mesh(
  spheregeometry,
  sunmaterial
)
sun.scale.setScalar(5)
scene.add(sun)

const planets = [
  {
    name: "Mercury",
    radius: 0.5,
    distance: 10,
    speed: 0.01,
    material: mercuryMaterial,
    moons: [],
  },
  {
    name: "Venus",
    radius: 0.8,
    distance: 15,
    speed: 0.007,
    material: venusMaterial,
    moons: [],
  },
  {
    name: "Earth",
    radius: 1,
    distance: 20,
    speed: 0.005,
    material: earthMaterial,
    moons: [
      {
        name: "Moon",
        radius: 0.3,
        distance: 3,
        speed: 0.015,
      },
    ],
  },
  {
    name: "Mars",
    radius: 0.7,
    distance: 25,
    speed: 0.003,
    material: marsMaterial,
    moons: [
      {
        name: "Phobos",
        radius: 0.1,
        distance: 2,
        speed: 0.02,
      },
      {
        name: "Deimos",
        radius: 0.2,
        distance: 3,
        speed: 0.015,
      },
    ],
  },
  {
    name: "Jupyter",
    radius: 1.6,
    distance: 28,
    speed: 0.002,
    material: jupyterMaterial,
    moons: [
      {
        name: "Phobos",
        radius: 0.1,
        distance: 2,
        speed: 0.02,
      },
      {
        name: "Deimos",
        radius: 0.2,
        distance: 2.3,
        speed: 0.015,
      },
      {
        name: "Phobos",
        radius: 0.13,
        distance: 2.6,
        speed: 0.0018,
      },
      {
        name: "Deimos",
        radius: 0.15,
        distance: 2.8,
        speed: 0.013,
      },
    ],

  },
  {
    name: "saturn",
    radius: 1.2,
    distance: 35,
    speed: 0.0015,
    material: saturnMaterial,
    moons: [],
  },
  {
    name: "uranus",
    radius: 1.1,
    distance: 43,
    speed: 0.0012,
    material: uranusMaterial,
    moons: [],

  },
  {
    name: "neptune",
    radius: 1.09,
    distance: 47,
    speed: 0.001,
    material: nepturnMaterial,
    moons: [],
  },
];

const createPlanet=(planet)=>{
  const planetMesh=new THREE.Mesh(
    spheregeometry,
    planet.material
  )
  planetMesh.scale.setScalar(planet.radius)
  planetMesh.position.x=planet.distance
  return planetMesh
}

const createMoon=(moon)=>{
  const moonMesh=new THREE.Mesh(
    spheregeometry,
    moonMaterial
  )
  moonMesh.scale.setScalar(moon.radius)
  moonMesh.position.x=moon.distance
  return moonMesh
}

const planetMeshs=planets.map((planet)=>{
  const planetMesh=createPlanet(planet)
  scene.add(planetMesh)

  planet.moons.forEach((moon)=>{
    const moonMesh=createMoon(moon)
    planetMesh.add(moonMesh)
  })

  return planetMesh

})

const ambientLight=new THREE.AmbientLight(
  0xffffff,
  0.1
)
scene.add(ambientLight)

const pointLight=new THREE.PointLight(
  0xffffff,
  500
)
scene.add(pointLight)

const camera=new THREE.PerspectiveCamera(
    35,
    window.innerWidth / window.innerHeight,
    0.1,
    400
);
camera.position.z=150
camera.position.y=5

const canvas=document.querySelector('canvas.threejs')
const renderer=new THREE.WebGLRenderer({
    canvas:canvas,

})

renderer.setSize(window.innerWidth,window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))

const controls= new OrbitControls(camera,canvas)
controls.enableDamping=true;

window.addEventListener("resize",()=>{
    camera.aspect= window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth / window.innerHeight)
})

const renderloop=(()=>{
  planetMeshs.forEach((planet,index)=>{
    planet.rotation.y+=planets[index].speed
    planet.position.x=Math.sin(planet.rotation.y) * planets[index].distance
    planet.position.z=Math.cos(planet.rotation.y) * planets[index].distance
    planet.children.forEach((moon,moonIndex)=>{
      moon.rotation.y+=planets[index].moons[moonIndex].speed
      moon.position.x=Math.sin(moon.rotation.y) * planets[index].moons[moonIndex].distance
      moon.position.z=Math.cos(moon.rotation.y) * planets[index].moons[moonIndex].distance

    })
    

  })

    
  controls.update(),
  renderer.render(scene,camera),
  window.requestAnimationFrame(renderloop)
});

renderloop();

