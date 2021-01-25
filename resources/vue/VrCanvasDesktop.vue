<template>
  <div class="l-cover" ref="elementContainer"></div>
</template>

<script>
import * as THREE from 'three'

const OrbitControls = require('three-orbit-controls')(THREE)

export default {
  name: 'VrCanvas',
  data() {
    const renderer = new THREE.WebGLRenderer()
    const camera = null
    const orbitControls = null
    const scene = new THREE.Scene()
    const light = new THREE.PointLight(0xffffff)

    return {
      orbitControls,
      camera,
      scene,
      light,
      renderer,
    }
  },
  computed: {
    isMobile() {
      const ua = navigator.userAgent
      if (ua.indexOf('Android') != -1) {
        return true
      }
      if (/(iPad|iPhone|iPod)/g.test(ua)) {
        return true
      }
      return false
    },
    windowWidth() {
      return window.innerWidth
    },
    windowHeight() {
      return window.innerHeight
    },
  },
  mounted() {
    // set size & devicePixelRatio
    this.renderer.setSize(this.windowWidth, this.windowHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)

    const container = this.$refs.elementContainer
    container.appendChild(this.renderer.domElement)

    this.camera = new THREE.PerspectiveCamera(
      75,
      this.windowWidth / this.windowHeight,
      0.1,
      1100
    )

    this.setOrbitControls()

    this.camera.position.z = 4

    this.light.position.set(2, 2, 2)
    this.scene.add(this.light)

    // this.addCube()
    this.snowing()
    this.addImage()

    // start motion
    this._tick()
  },
  methods: {
    _tick() {
      requestAnimationFrame(this._tick)
      this.renderer.render(this.scene, this.camera)
      this.orbitControls.update()
    },
    addImage() {
      const texture = new THREE.TextureLoader().load(
        '../img/6860371067_fe759ef565_h.jpg',
        (tex) => {
          const geometry = new THREE.SphereGeometry(5, 24, 18)
          geometry.scale(-1, 1, 1)

          const material = new THREE.MeshBasicMaterial({ map: texture })

          const sphere = new THREE.Mesh(geometry, material)
          const sphereWidth = 1
          const sphereHeight = 1
          sphere.scale.set(sphereWidth, sphereHeight, 1)
          this.scene.add(sphere)
        }
      )
    },
    setOrbitControls() {
      const htmlelm = this.$refs.elementContainer
      this.orbitControls = new OrbitControls(this.camera, htmlelm)
      this.orbitControls.enableDamping = true
      this.orbitControls.rotateSpeed = 1
      this.orbitControls.enableZoom = false
      this.orbitControls.maxPolarAngle = 2.6
      this.orbitControls.minPolarAngle = 0.5
    },
    snowing() {
      setInterval(() => {
        this._addSnow()
      }, 200)
    },
    _addSnow() {
      // add object
      const size = 0.05 * Math.random()

      const fallingAreaRange = 4
      const initialX = Math.random() * fallingAreaRange - fallingAreaRange / 2
      const initialZ = Math.random() * fallingAreaRange - fallingAreaRange / 2

      const geo = new THREE.SphereGeometry(size, 10, 10)
      const mat = new THREE.MeshLambertMaterial({ color: 0xffffff })
      const mesh = new THREE.Mesh(geo, mat)
      const position = { x: initialX, y: 4, z: initialZ }
      mesh.position.set(position.x, position.y, position.z)

      this.scene.add(mesh)
      const fallSpeed = 30
      const verticalMove = 0.01

      const falling = setInterval(() => {
        // remove snow when it touches ground
        if (positionY < 0) {
          clearInterval(falling)
          this.scene.remove(mesh)
          return false
        }

        const meshPosition = mesh.position
        const positionXdiff =
          Math.random() > 0.5 ? verticalMove : -1 * verticalMove
        const positionZdiff =
          Math.random() > 0.5 ? verticalMove : -1 * verticalMove
        const positionX = meshPosition.x + positionXdiff
        const positionZ = meshPosition.z + positionZdiff
        const positionY = meshPosition.y - fallSpeed / 400

        meshPosition.set(positionX, positionY, positionZ)
      }, 1000 / fallSpeed)
    },
  },
}
</script>
