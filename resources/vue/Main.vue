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
    // const effect = new StereoEffect(renderer)
    // effect.eyeSeparation = 10
    // effect.setSize(window.innerWidth, window.innerHeight)
    return {
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

    // parse
    const container = document.getElementById('elementContainer')
    container.appendChild(this.renderer.domElement)

    //  set camera (this operation should be after container.appendChild)
    this.camera = new THREE.PerspectiveCamera(
      60,
      this.windowWidth / this.windowHeight,
      1,
      10
    )
    this.camera.position.z = 3

    // add scene
    this.scene = new THREE.Scene()

    // add light
    this.light = new THREE.PointLight(0x00ffff)
    this.light.position.set(2, 2, 2)
    this.scene.add(this.light)

    // add object
    const geo = new THREE.BoxGeometry(1, 1, 1)
    const mat = new THREE.MeshLambertMaterial({ color: 0xffffff })
    this.mesh = new THREE.Mesh(geo, mat)
    this.scene.add(this.mesh)

    // set stereo view
    const effect = new StereoEffect(this.renderer)
    effect.eyeSeparation = 1
    effect.setSize(window.innerWidth, window.innerHeight)
    effect.render(this.scene, this.camera)

    this.renderer.render(this.scene, this.camera)
  },
  methods: {},
}
</script>
