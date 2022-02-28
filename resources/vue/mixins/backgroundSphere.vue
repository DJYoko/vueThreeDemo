<script>
import * as THREE from 'three'
export default {
  name: 'backgroundSphere',
  methods: {
    addBackgroundSphere() {
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
  },
}
</script>
