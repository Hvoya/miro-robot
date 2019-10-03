<template>
    <p>Activation...</p>
</template>

<script>

import xhr from '../utils/fetch'

export default {
    mounted(){
        const token = this.$route.params.token;
        xhr.get(`/user/activate/${token}`)
            .then(()=>{
                this.$message.success(this.$t('success.activation'));
                this.$router.replace('/projects/login');
            })
            .catch(()=>this.$message.success(this.$t('errors.server_error')))
    }
}
</script>

<style>

</style>
