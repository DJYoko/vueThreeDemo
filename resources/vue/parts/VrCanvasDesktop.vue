<template>
  <div class="l-cover" ref="elementContainer"></div>
</template>

<script>
import snowing from '../mixins/snowing'
import backgroundSphere from '../mixins/backgroundSphere'
import * as THREE from 'three'

const OrbitControls = require('three-orbit-controls')(THREE)

export default {
  name: 'VrCanvas',
  mixins: [snowing, backgroundSphere],
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
    this.addBackgroundSphere()

    // start motion
    this._tick()
  },
  methods: {
    _tick() {
      requestAnimationFrame(this._tick)
      this.renderer.render(this.scene, this.camera)
      this.orbitControls.update()
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
  },
}
</script>
