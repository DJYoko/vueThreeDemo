<template>
  <div class="u-cover" ref="elementContainer"></div>
</template>

<script>
import snowing from '../mixins/snowing'
import backgroundSphere from '../mixins/backgroundSphere'
import * as THREE from 'three'
import DeviceOrientationControls from 'three-device-orientation'
const StereoEffect = require('three-stereo-effect')(THREE)

export default {
  name: 'VrCanvas',
  mixins: [snowing, backgroundSphere],
  data() {
    const renderer = new THREE.WebGLRenderer()
    const stereoEffect = null
    const camera = null
    const deviceOrientationControls = null
    const scene = new THREE.Scene()
    const light = new THREE.PointLight(0xffffff)

    return {
      isDeviceOrientationControl: false,
      stereoEffect,
      deviceOrientationControls,
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

    this.snowing()
    this.setStereoEffect()
    this.addBackgroundSphere()

    // start motion
    this._tick()
  },
  methods: {
    _tick() {
      requestAnimationFrame(this._tick)

      if (this.deviceOrientationControls !== null) {
        this.deviceOrientationControls.update()
      }

      this.stereoEffect.render(this.scene, this.camera)
    },

    setStereoEffect() {
      this.stereoEffect = new StereoEffect(this.renderer)
      this.stereoEffect.eyeSeparation = 1
      this.stereoEffect.setSize(window.innerWidth, window.innerHeight)
    },
    setPointOfView() {
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
          .then((response) => {
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
    setOrientationControls(e) {
      if (this.isDeviceOrientationControl) {
        return false
      }
      this.isDeviceOrientationControl = true

      if (!e.alpha) {
        return
      }
      this.deviceOrientationControls = new DeviceOrientationControls(
        this.camera
      )
      // this.deviceOrientationControls.connect()

      // window.removeEventListener(
      //   'deviceorientation',
      //   this.setOrientationControls,
      //   true
      // )
    },
  },
}
</script>
