<script>
import * as THREE from 'three'
export default {
  name: 'snowing',
  methods: {
    snowing() {
      setInterval(() => {
        this._addSnow()
      }, 200)
    },
    _addSnow() {
      // add object
      const size = 0.05 * Math.random()

      const fallingAreaRange = 4
      const initialX = Math.random() * fallingAreaRange - fallingAreaRange / 2
      const initialZ = Math.random() * fallingAreaRange - fallingAreaRange / 2

      const geo = new THREE.SphereGeometry(size, 10, 10)
      const mat = new THREE.MeshLambertMaterial({ color: 0xffffff })
      const mesh = new THREE.Mesh(geo, mat)
      const position = { x: initialX, y: 4, z: initialZ }
      mesh.position.set(position.x, position.y, position.z)

      this.scene.add(mesh)
      const fallSpeed = 30
      const verticalMove = 0.01

      const falling = setInterval(() => {
        // remove snow when it touches ground
        if (positionY < 0) {
          clearInterval(falling)
          this.scene.remove(mesh)
          return false
        }

        const meshPosition = mesh.position
        const positionXdiff =
          Math.random() > 0.5 ? verticalMove : -1 * verticalMove
        const positionZdiff =
          Math.random() > 0.5 ? verticalMove : -1 * verticalMove
        const positionX = meshPosition.x + positionXdiff
        const positionZ = meshPosition.z + positionZdiff
        const positionY = meshPosition.y - fallSpeed / 400

        meshPosition.set(positionX, positionY, positionZ)
      }, 1000 / fallSpeed)
    },
  },
}
</script>
