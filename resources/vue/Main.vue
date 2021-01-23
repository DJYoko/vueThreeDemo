<template>
  <div class="l-cover">
    <VrCanvas />
    <div
      class="p-repositoryInformation-switch"
      @click="showRepositoryInformationModal"
    >
      2223 info
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
import RepositoryInformation from './RepositoryInformation'
import VrCanvas from './VrCanvas'

export default {
  name: 'Main',
  components: { RepositoryInformation, VrCanvas },
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
