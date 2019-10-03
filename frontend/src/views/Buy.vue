<template>
    <ProjectPageTemplate>
        <h2 class="buy-heading">{{$t('headings.buy')}}</h2>
        <div class="buy-logo-wrapper">
            <a target="_blank" href="https://store.eastmaker.ru"><img :src="mstoreLogo" alt=""></a>
        </div>
    </ProjectPageTemplate>
</template>
<script>
  import mstoreLogo from '../assets/mstore_logo.jpg';
  import ProjectPageTemplate from "../templates/ProjectPageTemplate";
export default {
    components: {
      ProjectPageTemplate
    },
    data(){
      return {
        mstoreLogo
      }
    }
}
</script>
<style>
    .buy-heading{
        margin-bottom: 40px;
    }
    .buy-logo-wrapper {
        width: 200px;
    }
    .buy-logo-wrapper img{
        display: block;
        width: 100%;
        height: auto;
        border: 1px solid lightpink;
        padding: 10px;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
    }
</style>
