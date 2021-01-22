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
    const stereoEffect = null
    const camera = null
    const deviceOrientationControls = null
    const orbitControls = null
    const scene = new THREE.Scene()
    const light = new THREE.PointLight(0x00ffff)

    return {
      stereoEffect,
      deviceOrientationControls,
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

    // sync Device control and angle
    this.setPointOfView()

    this.camera.position.z = 5

    this.light.position.set(2, 2, 2)
    this.scene.add(this.light)

    this.addCube()
    this.setStereoEffect()
    this.addImage()

    // start motion
    this._tick()
  },
  methods: {
    _tick() {
      requestAnimationFrame(this._tick)
      this.stereoEffect.render(this.scene, this.camera)

      // Mobile
      if (this.deviceOrientationControls) {
        this.deviceOrientationControls.update()
      }

      // PC
      if (this.orbitControls) {
        this.orbitControls.update()
      }
    },

    setStereoEffect() {
      this.stereoEffect = new StereoEffect(this.renderer)
      this.stereoEffect.eyeSeparation = 1
      this.stereoEffect.setSize(window.innerWidth, window.innerHeight)
    },
    setPointOfView() {
      if (!this.isMobile) {
        // PC
        this.setOrbitControls()
        return false
      }

      // non SSL env
      if (typeof DeviceOrientationEvent === 'undefined') {
        return false
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
    addImage() {
      const texture = new THREE.TextureLoader().load(
        './img/6860371067_fe759ef565_h.jpg',
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
    setOrientationControls(e) {
      if (!e.alpha) {
        return
      }

      // const htmlelm = this.$refs.elementContainer
      this.deviceOrientationControls = new DeviceOrientationControls(
        this.camera
      )
      this.deviceOrientationControls.connect()

      // call at once
      window.removeEventListener(
        'deviceorientation',
        this.setOrientationControls,
        true
      )
    },
    addCube() {
      // add object
      const geo = new THREE.BoxGeometry(0.1, 0.1, 0.1)
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
      }, 80)
    },
  },
}
</script>
