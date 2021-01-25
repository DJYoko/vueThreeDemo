<template>
  <div class="l-cover">
    <VrCanvasDesktop />
    <a class="p-backLink" href="../">back</a>
    <div class="p-modeInfo">Desktop Mode</div>
  </div>
</template>

<script>
import VrCanvasDesktop from '../parts/VrCanvasDesktop'

export default {
  name: 'Main',
  components: { VrCanvasDesktop },
}
</script>
