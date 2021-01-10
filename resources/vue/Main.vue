<template>
  <div class="l-cover">
    <div id="elementContainer" class="l-cover"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
export default {
  name: 'Main',
  data() {
    const renderer = new THREE.WebGLRenderer()
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      this.windowWidth / this.windowHeight,
      1,
      10000
    )
    return {
      camera,
      scene,
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
    this.renderer.setSize(this.windowWidth, this.windowHeight)

    const $elementContainer = document.getElementById('elementContainer')
    $elementContainer.appendChild(this.renderer.domElement)
    this.camera.position.set(0, 0, 1000)
  },
  methods: {},
}
</script>
