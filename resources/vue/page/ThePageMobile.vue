<template>
  <div class="u-cover">
    <VrCanvasMobile />
    <a class="p-backLink" href="../">back</a>
    <div class="p-modeInfo">Mobile Mode</div>
  </div>
</template>

<script>
import VrCanvasMobile from '../parts/VrCanvasMobile'

export default {
  name: 'PageMobile',
  components: { VrCanvasMobile },
}
</script>
