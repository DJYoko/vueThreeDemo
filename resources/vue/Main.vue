<template>
  <div class="l-cover">
    <div id="elementContainer" class="l-cover"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
// import StereoEffect from 'three-stereo-effect'
const StereoEffect = require('three-stereo-effect')(THREE)

export default {
  name: 'Main',
  data() {
    const renderer = new THREE.WebGLRenderer()

    const camera = null
    const scene = new THREE.Scene()
    const light = new THREE.PointLight(0x00ffff)

    return {
      camera,
      scene,
      light,
      renderer,
    }
  },
  computed: {
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

    const container = document.getElementById('elementContainer')
    container.appendChild(this.renderer.domElement)

    this.camera = new THREE.PerspectiveCamera(
      60,
      this.windowWidth / this.windowHeight,
      1,
      10
    )
    this.camera.position.z = 3

    this.light.position.set(2, 2, 2)
    this.scene.add(this.light)

    this.addCube()

    // set stereo view
    const effect = new StereoEffect(this.renderer)
    effect.eyeSeparation = 1
    effect.setSize(window.innerWidth, window.innerHeight)
    effect.render(this.scene, this.camera)

    this.renderer.render(this.scene, this.camera)
  },
  methods: {
    addCube() {
      // add object
      const geo = new THREE.BoxGeometry(1, 1, 1)
      const mat = new THREE.MeshLambertMaterial({ color: 0xffffff })
      const mesh = new THREE.Mesh(geo, mat)
      this.scene.add(mesh)
    },
  },
}
</script>
