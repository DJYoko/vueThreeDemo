<template>
  <div class="l-cover">
    <div class="l-cover" ref="elementContainer"></div>
    <div
      class="p-repositoryInformation-switch"
      @click="showRepositoryInformationModal"
    >
      repository information
    </div>
    <b-modal
      id="repositoryInformationModal"
      :hide-footer="true"
      title="VUE Three Demo"
    >
      <RepositoryInformation />
    </b-modal>
  </div>
</template>

<script>
import * as THREE from 'three'
const StereoEffect = require('three-stereo-effect')(THREE)
import RepositoryInformation from './RepositoryInformation'

export default {
  name: 'Main',
  components: { RepositoryInformation },
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
  },
  methods: {
    showRepositoryInformationModal() {
      this.$bvModal.show('repositoryInformationModal')
    },
    execRender() {
      const effect = new StereoEffect(this.renderer)
      effect.eyeSeparation = 1
      effect.setSize(window.innerWidth, window.innerHeight)
      effect.render(this.scene, this.camera)
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
      setInterval(() => {
        const now = new Date()
        const dig = now.getMilliseconds()

        const currentDeg = {
          x: mesh.rotation.x,
          y: mesh.rotation.y,
          z: mesh.rotation.z,
        }

        const updateDeg = {
          x: currentDeg.x + Math.PI / 180,
          y: currentDeg.y - Math.PI / 180,
          z: currentDeg.z + Math.PI / 180,
        }

        mesh.rotation.set(updateDeg.x, updateDeg.y, updateDeg.z)
        this.execRender()
      }, 60)
    },
  },
}
</script>
