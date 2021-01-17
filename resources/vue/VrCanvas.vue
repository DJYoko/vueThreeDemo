<template>
  <div class="l-cover" ref="elementContainer"></div>
</template>

<script>
import * as THREE from 'three'
const StereoEffect = require('three-stereo-effect')(THREE)
const DeviceOrientationControls = require('three-device-orientation')
const OrbitControls = require('three-orbit-controls')(THREE)

export default {
  name: 'VrCanvas',
  data() {
    const renderer = new THREE.WebGLRenderer()
    const camera = null
    const scene = new THREE.Scene()
    const light = new THREE.PointLight(0x00ffff)

    return {
      orbitControls: null,
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
    // set size & devicePixelRation
    this.renderer.setSize(this.windowWidth, this.windowHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)

    const container = this.$refs.elementContainer
    container.appendChild(this.renderer.domElement)

    this.camera = new THREE.PerspectiveCamera(
      50,
      this.windowWidth / this.windowHeight,
      0.1,
      2000
    )
    this.camera.position.z = 10

    this.light.position.set(2, 2, 2)
    this.scene.add(this.light)

    this.addCube()
    this.execRender()
    this.addImage()

    // sync Device control and angle
    this.setPointOfView()
  },
  methods: {
    setPointOfView() {
      if (!this.isMobile) {
        // PC
        this.setOrbitControls()
      }

      // Android & iOS 12 or less
      if (typeof DeviceOrientationEvent.requestPermission !== 'function') {
        window.addEventListener(
          'deviceorientation',
          this.setOrientationControls
        )
        return true
      }

      // iOS 13 or more
      const container = this.$refs.elementContainer
      container.addEventListener('click', () => {
        // require HTTPS
        DeviceOrientationEvent.requestPermission()
          .then(function(response) {
            if (response === 'granted') {
              window.addEventListener(
                'deviceorientation',
                this.setOrientationControls
              )
            }
          })
          .catch(function(e) {
            console.log(e)
          })
      })
    },
    execRender() {
      const effect = new StereoEffect(this.renderer)
      effect.eyeSeparation = 1
      effect.setSize(window.innerWidth, window.innerHeight)
      effect.render(this.scene, this.camera)
    },
    addImage() {
      var texture = new THREE.TextureLoader().load(
        // './img/rodrigo-soares-SCvlb1FWeuY-unsplash.jpg',
        './img/6860371067_fe759ef565_h.jpg',
        (tex) => {
          const geometry = new THREE.SphereGeometry(100, 25, 25)
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
      const controls = new OrbitControls(this.camera, htmlelm)
      controls.target.set(
        this.camera.position.x + 0.15,
        this.camera.position.y,
        this.camera.position.z
      )
      controls.enableDamping = true
      controls.rotateSpeed = -0.07
      controls.enableZoom = false
      controls.maxPolarAngle = 2.6
      controls.minPolarAngle = 0.5
    },
    setOrientationControls(e) {
      if (!e.alpha) {
        return
      }
      const controls = new DeviceOrientationControls(this.camera, true)
      controls.connect()
      controls.update()
      window.removeEventListener(
        'deviceorientation',
        this.setOrientationControls,
        true
      )
    },
    addCube() {
      // add object
      const geo = new THREE.BoxGeometry(1, 1, 1)
      const mat = new THREE.MeshLambertMaterial({ color: 0xffffff })
      const mesh = new THREE.Mesh(geo, mat)
      this.scene.add(mesh)
      this.rotateCube(mesh)
    },
    rotateCube(mesh) {
      const progress = Math.PI / 90
      setInterval(() => {
        const now = new Date()
        const dig = now.getMilliseconds()

        const currentDeg = {
          x: mesh.rotation.x,
          y: mesh.rotation.y,
          z: mesh.rotation.z,
        }

        const updateDeg = {
          x: currentDeg.x + progress,
          y: currentDeg.y + progress,
          z: currentDeg.z + progress,
        }

        mesh.rotation.set(updateDeg.x, updateDeg.y, updateDeg.z)
        this.execRender()
      }, 80)
    },
  },
}
</script>
