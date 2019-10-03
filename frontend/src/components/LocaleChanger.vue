<template>
  <a-switch :defaultChecked="$i18n.locale === 'en'" :style="{marginLeft: 'auto'}" unCheckedChildren="RU" checkedChildren="EN" @change="changeLang"/>
</template>

<script>
export default {
  methods:{
    changeLang(value){
      const lang = value ? 'en' : 'ru';
      localStorage.setItem('lang', lang);
      this.$i18n.locale = lang;
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
