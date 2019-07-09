<template>
  <ProjectPageTemplate>
    <h2 v-html="$t('headings.new_project')"></h2>
    <a-card>
      <div class="files-container">
        <a-row :gutter="20">
          <a-col :span="13">
            <div class="images">
              <h4>{{$t("headings.upload_images")}}</h4>
              <a-upload
                :fileList="imageList"
                @preview="handlePreview"
                @change="handleChange"
                action="/api/images"
                listType="picture-card"
              >
                <div>
                  <a-icon type="plus" />
                  <div class="ant-upload-text">{{$t('buttons.upload')}}</div>
                </div>
              </a-upload>
            </div>
          </a-col>
          <a-col :span="10">
            <div class="documents">
              <h4>{{$t("headings.attach_files")}}</h4>
              <a-upload @change="handleFilesChange" action="/api/files">
                <a-button>
                  <a-icon type="upload" />
                  {{$t('buttons.attach')}}
                </a-button>
              </a-upload>
            </div>
          </a-col>
        </a-row>
      </div>
      <div class="text-container">
        <a-form :form="form" @submit="handleSubmit">
          <a-form-item
            v-if="imageList.length > 0"
            :label="$t('form_labels.main_image_id')"
            :wrapperCol="{span: 12}"
            :labelCol="{span: 24}"
          >
            <a-input-number
              :min="1"
              :max="imageList.length"
              v-decorator="[
                'main_image_number', {initialValue: 1}
                ]"
            />
          </a-form-item>
          <a-form-item
            :label="$t('form_labels.project_name')"
            :wrapperCol="{span: 12}"
            :labelCol="{span: 24}"
          >
            <a-input
              v-decorator="[
                'heading',
                {rules: [{ required: true, message: $t('form_errors.required') }]}
                ]"
            />
          </a-form-item>
          <a-form-item :label="$t('form_labels.project_description')">
            <quill-editor v-model="description"></quill-editor>
          </a-form-item>
          <a-row type="flex" justify="center">
            <a-button type="primary" html-type="submit">{{$t('buttons.create_project')}}</a-button>
          </a-row>
        </a-form>
      </div>
    </a-card>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
    <a-modal
      @ok="createProject"
      :visible="noImageModalVisible"
      @cancel="handleCancel"
    >{{$t("modals.creation_project_with_no_images")}}</a-modal>
  </ProjectPageTemplate>
</template>

<script>
import { quillEditor } from "vue-quill-editor";

import xhr from "../utils/fetch";
import ProjectPageTemplate from "../templates/ProjectPageTemplate";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  components: {
    ProjectPageTemplate,
    quillEditor
  },
  data() {
    return {
      previewVisible: false,
      noImageModalVisible: false,
      previewImage: "",
      imageList: [],
      fileList: [],
      form: this.$form.createForm(this),
      description: ""
    };
  },
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.imageList = fileList;
    },
    handleFilesChange({ fileList }) {
      this.fileList = fileList;
    },
    handleSubmit(e) {
      e.preventDefault();
      if (this.imageList.length === 0) {
        this.noImageModalVisible = true;
        return;
      }
      this.createProject();
    },
    createProject() {
      this.noImageModalVisible = false;
      console.log(this.fileList);
      this.form.validateFields((err, values) => {
        if (err) return;
        const images = this.imageList.map(item => item.response.data.id);
        const files = this.fileList.map(item => item.response.data.id);

        xhr
          .post("/projects", {
            name: values.heading,
            description: this.description,
            images,
            files,
            main_image_id:
              images.length > 0 ? images[values.main_image_number - 1] : null
          })
          .then(r => {
            this.$message.success(this.$t("success.project_created"));
            this.$router.push("/projects");
          })
          .catch(() => {
            this.$message.error(this.$t("errors.server_error"));
          });
      });
    }
  }
};
</script>

<style scoped>
h2 {
  font-size: 30px;
  margin-bottom: 30px;
}
h4 {
  margin-bottom: 20px;
}
.files-container {
  min-height: 400px;
}
</style>
