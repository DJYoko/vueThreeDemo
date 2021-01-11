<template>
  <div class="l-cover" ref="elementContainer"></div>
</template>

<script>
import * as THREE from 'three'
const StereoEffect = require('three-stereo-effect')(THREE)

export default {
  name: 'VrCanvas',
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

    const container = this.$refs.elementContainer
    container.appendChild(this.renderer.domElement)

    this.camera = new THREE.PerspectiveCamera(
      50,
      this.windowWidth / this.windowHeight,
      1,
      2000
    )
    this.camera.position.z = 5

    this.light.position.set(2, 2, 2)
    this.scene.add(this.light)

    this.addCube()
    this.execRender()
    this.addImage()

  },
  methods: {
    execRender() {
      const effect = new StereoEffect(this.renderer)
      effect.eyeSeparation = 1
      effect.setSize(window.innerWidth, window.innerHeight)
      effect.render(this.scene, this.camera)
    },
    addImage() {
      var texture = new THREE.TextureLoader().load(
        './img/rodrigo-soares-SCvlb1FWeuY-unsplash.jpg',
        (tex) => {
          const w = 10
          const h = tex.image.height / (tex.image.width / w)

          const geometry = new THREE.PlaneGeometry(1, 1)
          const material = new THREE.MeshPhongMaterial({ map: texture })
          const plane = new THREE.Mesh(geometry, material)
          plane.scale.set(w, h, 1)
          this.scene.add(plane)
        }
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
