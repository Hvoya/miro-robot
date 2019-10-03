<template>
  <ProjectPageTemplate>
    <div class="singe-project">

    <h3>{{$t('headings.project')}}</h3>
    <h2>
      <span class="red-text">{{project.name}}</span>
    </h2>
    <a-card>
      <a-row :gutter="30">
        <a-col :span="14">
          <h4 class="single-project_sub-heaidng gallery-heading">{{$t('headings.gallery')}}</h4>
          <div class="carouser-wrapper">
            <a-carousel arrows>
              <div
                slot="prevArrow"
                slot-scope="props"
                class="custom-slick-arrow"
                style="left: 10px;zIndex: 1"
              >
                <a-icon type="left-circle" />
              </div>
              <div
                slot="nextArrow"
                slot-scope="props"
                class="custom-slick-arrow"
                style="right: 10px"
              >
                <a-icon type="right-circle" />
              </div>
              <!--  -->
              <div class="no-images" v-if="project.images.length === 0">
                <img :src="no_data_link" alt />
                {{$t('errors.not_images')}}
              </div>
              <div class="image-wrapper" v-for="image of project.images" :key="image.name">
                <img :src="'/api/images/' + image.name" :alt="image.name" />
              </div>
            </a-carousel>
          </div>
        </a-col>
        <a-col :span="10">
          <h4 class="single-project_sub-heaidng statistics-heading">{{$t('headings.statistics')}}</h4>
          <div class="statistics">
            <div class="statistics-item">
              <span>{{$t('headings.views')}}</span>
              <span class="icon-group">
                {{project.views || 0}} &#160;
                <a-icon type="eye" theme="twoTone" twoToneColor="rgb(251, 1, 1)" />
              </span>
            </div>
            <div class="statistics-item">
              <span>{{$t('headings.likes')}}</span>
              <span class="icon-group">
                {{project.like_count || 0}} &#160;
                <a-icon type="like" theme="twoTone" twoToneColor="rgb(251, 1, 1)" />
              </span>
            </div>
            <div class="statistics-item">
              <span>{{$t('headings.comments')}}</span>
              <span class="icon-group">
                {{project.comment_count || 0}} &#160;
                <a-icon type="message" theme="twoTone" twoToneColor="rgb(251, 1, 1)" />
              </span>
            </div>
          </div>
          <h4 class="single-project_sub-heaidng">{{$t('headings.documents')}}</h4>
          <div class="file-container">
            <div class="no-documents" v-if="project.files.length === 0">
              <img :src="no_data_link" alt />
              {{$t('errors.not_documents')}}
            </div>
            <li v-for="file of project.files" :key="file.name">
              <a
                class="file-link"
                :href="server_address + '/files/' + file.id"
              >{{file.original_name}}</a>
            </li>
          </div>
          <div class="project-actions">
            <h4 class="single-project_sub-heaidng">{{$t('headings.feedback')}}</h4>
            <div class="feedback">
              <div
                :style="{fontSize: '35px', color:'rgb(251, 1, 1)', marginLeft: '15px', cursor: 'pointer'}"
                сlass="feedback-icon-wrapper"
              >
                <a-button v-if="$store.state.user" :disabled="liked" @click="like" type="primary">
                  {{liked ? $t("buttons.liked") : $t("buttons.like")}}
                  <a-icon type="like" twoToneColor="rgb(251, 1, 1)" />
                </a-button>
                <div
                  v-else
                  :style="{fontSize: '14px', color:'#d8d8d8', textAlign: 'center'}"
                >{{$t('errors.like')}}</div>
                  <a-button
                          @click="editProject"
                          type="warning"
                          :style="{display: 'block', marginTop:'20px'}"
                          v-if="isProjectOwner"
                          icon="edit"
                  >Редактировать</a-button>
                <a-button
                  @click="isDeleteMadalOpen = true"
                  type="danger"
                  :style="{display: 'block', marginTop:'20px'}"
                  v-if="this.$store.state.isAdmin"
                >Удалить проект</a-button>
              </div>
            </div>
          </div>
        </a-col>
      </a-row>
      <a-row :style="{marginTop: '30px'}" :gutter="30">
        <a-col :span="6">
          <h4 class="single-project_sub-heaidng">{{$t('headings.creator')}}</h4>
          <a-card @click="goToUserPage" hoverable>
            <img
              v-if="project.user.image"
              :style="{height: '220px', width: '220px'}"
              alt="example"
              :src="'/api/images/' + project.user.image.name"
              slot="cover"
            />
            <img
              v-else
              :style="{height: 'auto', width: '157px', marginBottom: '20px', display: 'block'}"
              :src="logo"
              alt
            />
            <a-card-meta :title="project.user.username">
              <template
                slot="description"
              >{{project.user.first_name + ' ' + project.user.last_name}}</template>
            </a-card-meta>
          </a-card>
        </a-col>
        <a-col :span="16">
          <a-tabs defaultActiveKey="1">
            <a-tab-pane :tab="$t('headings.description_tab')" key="1">
              <div class="no-description" v-if="!project.description">
                <img :src="no_data_link" alt />
                {{$t('errors.not_description')}}
              </div>
              <div v-html="project.description"></div>
            </a-tab-pane>
            <a-tab-pane :tab="$t('headings.comments_tab')" key="2">
              <a-comment v-for="comment of project.comments" :key="comment.id">
                <router-link
                  slot="author"
                  :to="'/projects/users/' + comment.user.id"
                >{{comment.user.username}}
                </router-link>
                <a-avatar
                  @click="()=>$router.push(`/projects/users/${comment.user.id}`)"
                  v-if="comment.user.image"
                  slot="avatar"
                  :src="'/api/images/' + comment.user.image.name"
                />
                <a-avatar v-else slot="avatar" :src="logo"></a-avatar>
                <div slot="content" :style="{display: 'flex', flexDirection: 'column'}">
                  <p v-html="comment.message"></p>
                  <a-button
                    @click="()=>deleteComment(comment.id)"
                    v-if="$store.state.isAdmin || $store.state.user.id === comment.user.id"
                    type="danger"
                    :style="{alignSelf: 'flex-end'}"
                  >Удалить</a-button>
                </div>
                <a-tooltip
                  slot="datetime"
                  :title="moment(comment.created_at).format('YYYY-MM-DD HH:mm:ss')"
                >
                  <span>{{moment(comment.created_at).fromNow()}}</span>
                </a-tooltip>
              </a-comment>
              <div class="no-description" v-if="project.comment_count === 0">
                <img :src="no_data_link" alt />
                {{$t('errors.not_comments')}}
              </div>
            </a-tab-pane>
            <a-tab-pane class="save-comment-tab" :tab="$t('headings.add_comment')">
              <h4 class="comment-heading">{{$t('headings.add_comment')}}:</h4>
              <quill-editor v-model="comment" :disabled="!user" class="comment-quill"></quill-editor>
              <a-button
                @click="saveComment"
                :disabled="!user || !comment"
                class="save-comment-button"
              >{{!user ? $t('errors.only_user_comments') : $t('buttons.save')}}</a-button>
            </a-tab-pane>
          </a-tabs>
        </a-col>
      </a-row>
    </a-card>
    <a-modal v-model="isDeleteMadalOpen" @ok="deleteProject">
      <p>Уверены, что хотите удалить проект?</p>
    </a-modal>
  </div>
  </ProjectPageTemplate>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import ProjectPageTemplate from "../templates/ProjectPageTemplate";
import xhr from "../utils/fetch";
import { SERVER_ADDRESS } from "../main";
import no_data from "../assets/no_data.svg";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import moment from "moment";
import logo from "../assets/logo.png";

export default {
  components: {
    ProjectPageTemplate,
    quillEditor
  },
  data() {
    return {
      isDeleteMadalOpen: false,
      logo,
      liked: false,
      moment,
      isProjectOwner: null,
      comment: "",
      user: this.$store.state.user,
      no_data_link: no_data,
      project: {},
      server_address: SERVER_ADDRESS
    };
  },
  mounted() {
    xhr
      .get(
        `/projects/${this.$route.params.id}${
          this.$store.state.user ? `?user_id=${this.$store.state.user.id}` : ""
        }`
      )
      .then(response => {
        this.project = response.data;
        this.isProjectOwner = this.user.id === response.data.user_id;
        this.liked = response.data.liked;
      });
  },
  methods: {
    deleteComment(id) {
      xhr
        .del(`/comments/${id}`)
        .then(() => this.$message.success("Комментарий удален"))
        .catch(() => this.$message.error(this.$t("errors.server_error")));
    },
    editProject(){
      this.$router.push(`/projects/${this.project.id}/edit`);
    },
    deleteProject() {
      xhr
        .del(`/projects/${this.$route.params.id}`)
        .then(() => {
          this.$message.success("Проект удален!");
          this.$router.push("/projects");
        })
        .catch(() => this.$message.error("Ошибка сервера"));
    },
    goToUserPage() {
      this.$router.push("/projects/users/" + this.project.user.id);
    },
    saveComment() {
      xhr
        .post("/comments", {
          comment: this.comment,
          project_id: this.$route.params.id
        })
        .then(() => {
          this.$message.success(this.$t("success.comment_saved"));
          this.$router.push("/projects");
        })
        .catch(() => {
          this.$message.error(this.$t("errors.server_error"));
        });
    },
    like() {
      xhr
        .post("/likes", {
          project_id: this.$route.params.id
        })
        .then(() => {
          this.project = {
            ...this.project,
            like_count: this.project.like_count + 1
          };
          this.liked = true;
          this.$message.success(this.$t("success.liked"));
        });
    }
  }
};
</script>

<style>
.no-description {
  margin-top: 20px;
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: #aaaaaa;
}
.no-images {
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: #aaaaaa;
}
.no-documents {
  display: flex;
  flex-direction: column;
  align-items: center;

  color: #aaaaaa;
}
.feedback {
  margin-top: 15px;
  display: flex;
  flex-direction: row-reverse;
}
.project-actions {
  margin-top: 30px;
}
.file-link {
  display: block;
  border-bottom: 1px solid rgb(251, 1, 1);
  margin-bottom: 3px;
}
.file-container {
  margin-top: 15px;
}
.statistics {
  max-width: 210px;
  margin-bottom: 30px;
}
.icon-group {
  display: flex;
  align-items: center;
}
.statistics-item {
  font-family: "Exo 2", "Chinese Quote", sans-serif;
  font-size: 18px;

  display: flex;
  justify-content: space-between;
}
.single-project_sub-heaidng {
  padding-bottom: 10px;
  border-bottom: 1px solid #e8e8e8;
}
.single-project_sub-heaidng.statistics-heading {
  margin-bottom: 20px;
}
.single-project_sub-heaidng.gallery-heading {
  margin-bottom: 20px;
}
.single-project h3 {
  text-align: center;
  font-size: 25px;
  margin-bottom: -10px;
}
.single-project h2 {
  margin-bottom: 30px;
}
.carouser-wrapper {
  height: 450px;
}
.single-project img {
  width: unset;
  max-width: 100%;
  max-height: 100%;
}
.ant-carousel {
  height: 100%;
}
.slick-list {
    width: 100%!important;
}

.ant-carousel .slick-slider,
.slick-list,
.slick-track,
.slick-slide div {
    display: flex!important;
    justify-content: center!important;
    align-items: center!important;
  height: 100% !important;
}
/*.ant-carousel .slick-slider,*/
/*.slick-list,*/
/*.slick-track,*/
.slick-slide img {
    max-width: 100%;
    max-height: 100%;
}
.single-project .image-wrapper {
  background-color: rgba(0, 0, 0, 0.01);
  /* text-align: center !important; */
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

.ant-carousel .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: rgb(251, 1, 1) !important;
  /* background-color: rgba(31, 45, 61, 0.11); */
  opacity: 0.7;
}
.ant-carousel .custom-slick-arrow:before {
  display: none;
}
.ant-carousel .custom-slick-arrow:hover {
  opacity: 0.5;
}
.comment-heading {
  margin-bottom: 15px;
}
.comment-quill {
  margin-bottom: 15px;
}
.save-comment-tab {
  display: flex;
  flex-direction: column;
}
.save-comment-button {
  align-self: center;
}

/* .image-wrapper img {
  display: inline !important;
} */
</style>
