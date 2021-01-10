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
    return {
      renderer,
    }
  },
  computed: {},
  mounted() {
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    this.renderer.setSize(windowWidth, windowHeight)

    const $elementContainer = document.getElementById('elementContainer')
    $elementContainer.appendChild(this.renderer.domElement)
  },
  methods: {},
}
</script>
