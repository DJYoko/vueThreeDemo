<template>
  <div class="l-cover">
    <VrCanvasDesktop />
    <a class="p-backLink" href="../">back</a>
    <div class="p-modeInfo">Desktop Mode</div>
  </div>
</template>

<script>
import RepositoryInformation from './RepositoryInformation'
import VrCanvasDesktop from './VrCanvasDesktop'

export default {
  name: 'Main',
  components: { RepositoryInformation, VrCanvasDesktop },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {
    showRepositoryInformationModal() {
      this.$bvModal.show('repositoryInformationModal')
    },
  },
}
</script>
