<template>
  <ProjectPageTemplate>
    <h2>{{$t("headings.registration")}}</h2>
    <a-row type="flex" justify="space-between">
      <a-col
        :style="{ height: '670px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}"
        span="11"
      >
        <div class="card">
          <div class="avatar-wrapper">
            <img class="avatar" :src="avatarLink" alt="ne" />
          </div>
          <avatar-cropper
            :cropper-options="{
              aspectRatio: 1,
              viewMode:1,
            }"
            :labels="{submit: 'Ok', cancel: 'Cancel'}"
            trigger="#pick-avatar"
            upload-url="/api/images"
            @uploaded="handleUploadAvatar"
          />
          <a-divider></a-divider>
          <a-button
            type="dashed"
            class="btn btn-primary btn-sm"
            id="pick-avatar"
          >{{avatarSelected ? $t('form_labels.change_avatar') : $t('form_labels.select_avatar')}}</a-button>
        </div>
      </a-col>
      <a-col span="11">
        <a-form :form="form" @submit="registrate">
          <a-form-item :label="$t('form_labels.username')">
            <a-input
              v-decorator="[
                'username',
                {rules:[
                  { required: true, message: $t('form_errors.required')}
                ]}
              ]"
            />
          </a-form-item>
          <a-form-item :label="$t('form_labels.first_name')">
            <a-input
              v-decorator="[
                'first_name',
                {rules:[
                  { required: true, message: $t('form_errors.required')}
                ]}
              ]"
            />
          </a-form-item>
          <a-form-item :label="$t('form_labels.last_name')">
            <a-input
              v-decorator="[
                'last_name',
                {rules:[
                  { required: true, message: $t('form_errors.required')}
                ]}
              ]"
            />
          </a-form-item>
          <a-form-item label="Email">
            <a-input
              v-decorator="[
                'email',
                {rules:[
                  { type: 'email', message: $t('form_errors.email')},
                  { required: true, message: $t('form_errors.required')},
                ]}
              ]"
            />
          </a-form-item>
          <a-form-item :label="$t('form_labels.password')">
            <a-input
              type="password"
              v-decorator="[
                'password',
                {rules:[
                  { required: true, message: $t('form_errors.required')},
                  { min: 8, message: $tc('form_errors.min', 8)}
                ]}
              ]"
            />
          </a-form-item>
          <a-form-item :label="$t('form_labels.password_confirm')">
            <a-input
              type="password"
              v-decorator="[
                'password_confirm',
                {rules:[
                  { required: true, message: $t('form_errors.required')},
                  {
                    validator: comparePasswords
                  }
                ]}
              ]"
            />
          </a-form-item>
          <a-row :style="{marginTop: '20px'}" type="flex" justify="center">
            <a-col>
              <a-button type="primary" html-type="submit">{{$t("buttons.registrate")}}</a-button>
            </a-col>
          </a-row>
        </a-form>
      </a-col>
    </a-row>
    <a-modal v-model="noAvatarModalOpen" @ok="registrate">
      <p>{{$t("modals.creation_user_with_no_avatar")}}</p>
    </a-modal>
  </ProjectPageTemplate>
</template>

<script>
import ProjectPageTemplate from "../templates/ProjectPageTemplate";
import AvatarCropper from "vue-avatar-cropper";
import xhr from "../utils/fetch";
import logo from "../assets/logo.png";

export default {
  components: {
    ProjectPageTemplate,
    AvatarCropper
  },
  data() {
    return {
      form: this.$form.createForm(this),
      avatarLink: logo,
      avatarSelected: false,
      avatar_id: null,
      noAvatarModalOpen: false,
      no_avatar_confirmed: false
    };
  },
  methods: {
    handleUploadAvatar(response) {
      this.avatarLink = "/api/images/" + response.data.name;
      this.avatarSelected = true;
      this.avatar_id = response.data.id;
    },
    openNoAvatarModal() {
      this.noAvatarModalOpen = true;
    },
    closeNoAvatarModal() {
      this.noAvatarModalOpen = false;
    },
    registrate(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (err) return;
        if (!this.avatar_id && !this.no_avatar_confirmed) {
          this.openNoAvatarModal();
          this.no_avatar_confirmed = true;
          return;
        }
        xhr
          .post("/users", { ...values, avatar_id: this.avatar_id })
          .then(() => {
            this.$message.success("Пользователь успешно зарегистрирован!");
            this.$router.replace("/projects/login");
          });
      });
    },
    comparePasswords(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback(this.$t("form_errors.confirm_password"));
      } else {
        callback();
      }
    }
  }
};
</script>

<style scoped>
.card {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  border: 1px solid #e8e8e8;
}
.avatar-wrapper {
  padding: 20px;
  margin-bottom: 30px;
  max-width: 250px;
  max-height: 250px;
  /* border: 1px solid #e8e8e8; */
}
.avatar {
  height: 100%;
  width: 100%;
}
h2 {
  font-size: 30px;
  margin-bottom: 40px;
}
</style>
