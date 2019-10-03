<template>
  <ProjectPageTemplate>
    <h2 :style="{marginTop: '90px'}" v-html="$t('headings.login')"></h2>
    <a-form layout="horizontal" :form="form" @submit="login">
      <a-row :gutter="20" type="flex" justify="center" :style="{marginTop: '100px'}">
        <a-col :span="10">
          <a-form-item>
            <a-input
              v-decorator="[
          'email',
          {rules: [{ required: true, message: $t('form_errors.required')}]}
        ]"
              placeholder="Email"
            >
              <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item>
            <a-input
              v-decorator="[
          'password',
          {rules: [{ required: true, message: $t('form_errors.required')}]}
        ]"
              type="password"
              placeholder="Password"
            >
              <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <a-form-item>
            <a-button
              :style="{width: '100%'}"
              type="primary"
              html-type="submit"
            >{{$t('buttons.login')}}</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <div class="join-container">
      <h3>{{$t('headings.first_time_miro')}}</h3>
      <a-button
        @click="$router.push('/projects/registration')"
        class="join"
        type="primary"
        ghost
      >{{$t('buttons.create_account')}}</a-button>
    </div>
    <a-row :gutter="20">
      <a-col :span="8">
        <h4>{{$t('headings.login_text_heading_1')}}</h4>
        <h5>{{$t('headings.login_text_sub_heading_1')}}</h5>
        <a-divider />
        <p v-html="$t('texts.login_text_1')"></p>
      </a-col>
      <a-col :span="8">
        <h4>{{$t('headings.login_text_heading_2')}}</h4>
        <h5>{{$t('headings.login_text_sub_heading_2')}}</h5>
        <a-divider />
        <p>{{$t('texts.login_text_2')}}</p>
      </a-col>
      <a-col :span="8">
        <h4>{{$t('headings.login_text_heading_3')}}</h4>
        <h5>{{$t('headings.login_text_sub_heading_3')}}</h5>
        <a-divider />
        <p>{{$t('texts.login_text_3')}}</p>
      </a-col>
    </a-row>
  </ProjectPageTemplate>
</template>

<script>
import ProjectPageTemplate from "../templates/ProjectPageTemplate";
import xhr from "../utils/fetch";

export default {
  components: {
    ProjectPageTemplate
  },
  data() {
    return {
      form: this.$form.createForm(this)
    };
  },
  methods: {
    login(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (err) return;
        this.$store.dispatch("login", {
          values,
          success: () => this.$router.replace("/projects"),
          error: error => this.$message.error(error),
          t: this.$t.bind(this)
        });
      });
    }
  }
};
</script>

<style scoped>
h2 {
  font-weight: 300;
}
h3 {
  font-size: 27px;
  font-weight: 300;
  text-transform: uppercase;
}
button.join {
  font-size: 20px;
  height: 100%;
  margin-left: 20px;
}
.join-container {
  margin-top: 50px;
  margin-bottom: 50px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
