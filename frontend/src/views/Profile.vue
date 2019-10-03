<template>
  <ProjectPageTemplate>
    <h3>{{me ? $t('headings.my_profile') : $t('headings.user')}}</h3>
    <h2>
      <span v-if="!me" class="red-text">{{user.username}}</span>
    </h2>
    <a-card>
      <a-row :gutter="30" :style="{marginBottom:'30px'}">
        <a-col :span="6">
          <h4 class="profile_sub-heaidng">{{$t('form_labels.avatar')}}:</h4>
          <div class="profile_avatar-wrapper">
            <img v-if="user.image" class="profile_avatar" :src="'/api/images/' + user.image.name " alt />
            <img class="profile_avatar" v-else :src="logo" alt="">
          </div>
        </a-col>
        <a-col :span="18">
          <h4 class="profile_sub-heaidng">{{$t('headings.information')}}</h4>
          <div class="information">
            <a-row>
              <a-col :span="12">{{$t('form_labels.first_name') + ': ' + user.first_name}}</a-col>
              <a-col :span="12">{{$t('form_labels.last_name') + ': ' + user.last_name}}</a-col>
            </a-row>
            <a-row :style="{marginTop:'30px'}">
              <a-col :span="12">{{$t('form_labels.username') + ': ' + user.username}}</a-col>
              <a-col :span="12">{{'Email'+ ': ' + user.email}}</a-col>
            </a-row>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <h4 class="profile_sub-heaidng">{{me ? $t('navigation.my_projects') : $t('headings.user_projects')}}</h4>
          <a-table
            :dataSource="projects"
            :columns="columns"
            :pagination="pagination"
            @change="handleTableChange"
          >
            <!-- <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a> -->
            <router-link
              slot="name"
              slot-scope="text, record"
              :to="'/projects/' + record.id"
            >{{text}}</router-link>
            <p slot="date" slot-scope="value">{{formatDate(value)}}</p>
          </a-table>
        </a-col>
      </a-row>
    </a-card>
  </ProjectPageTemplate>
</template>

<script>
import ProjectPageTemplate from "../templates/ProjectPageTemplate";
import xhr from "../utils/fetch";
import { formatDateForTable } from "../utils/dates";
import logo from '../assets/logo.png'

export default {
  components: {
    ProjectPageTemplate
  },
  data() {
    return {
      logo,
      me: false,
      user: {},
      projects: [],
      pagination: {
        page: 0,
        pageSize: 20
      },
      sorter: {
        field: "created_at",
        order: "DESC"
      },
      columns: [
        {
          title: this.$t("tables.name"),
          dataIndex: "name",
          width: "30%",
          key: "name",
          scopedSlots: { customRender: "name" }
        },
        {
          title: this.$t("tables.views"),
          dataIndex: "views",
          width: "10%",
          sorter: true
        },
        {
          title: this.$t("tables.likes"),
          dataIndex: "likes",
          width: "10%",
          dataIndex: 'like_count',
          sorter: true
        },
        {
          title: this.$t("tables.comments"),
          dataIndex: "comments",
          width: "10%",
          dataIndex: 'comment_count',
          sorter: true
        },
        {
          title: this.$t("tables.created_at"),
          dataIndex: "created_at",
          sorter: true,
          width: "14%",
          scopedSlots: { customRender: "date" }
        }
      ]
    };
  },
  methods: {
    formatDate(date) {
      return formatDateForTable(date);
    },
    fetch(user_id) {
      xhr
        .getList("/projects", {
          sorter: this.sorter,
          filters: {
            user_id
          },
          pagination: this.pagination
        })
        .then(response => {
          this.projects = response.data;
          this.pagination = response.pagination;
        })
        .catch(() => {
          this.$message.error(this.$t("errors.server_error"));
        });
    },
    handleTableChange(pagination, filters, sorter) {
      this.sorter = sorter;
      this.pagination = pagination;
      this.fetch(this.user_id);
    }
  },
  mounted() {
    const user_id = this.$route.params.id === 'me' ? this.$store.state.user.id : this.$route.params.id;
    this.user_id = user_id;
    xhr
      .get("/users/" + user_id)
      .then(response => {
        this.user = response.data
        if(!this.$store.state.user) return;
          if(this.$route.params.id === 'me' || this.$route.params.id === (this.$store.state.user.id + '')) this.me = true;
        })
      .catch(() => {
        this.$message.error(this.$t("errors.server_error"));
      });
    this.fetch(user_id);
  }
};
</script>

<style scoped>
.information {
  margin-top: 30px;
}
.profile_avatar-wrapper {
  margin-top: 30px;
  widows: 220px;
  height: 220px;
}
.profile_avatar {
  width: 100%;
  height: 100%;
}
.profile_sub-heaidng {
  padding-bottom: 10px;
  border-bottom: 1px solid #e8e8e8;
}
h3 {
  text-align: center;
  font-size: 25px;
  margin-bottom: -10px;
}
h2 {
  margin-bottom: 30px;
}
</style>
