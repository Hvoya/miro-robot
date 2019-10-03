<template>
  <div class="cont">
    <slot></slot>
  </div>
</template>

<script>
export default {
  mounted(){
    window.scrollTo(0, 0)
  }
};
</script>
<style>
.cont {
    padding: 20px;
  padding-bottom: 100px;
  max-width: 1050px;
  margin: 0 auto;
}
</style>
