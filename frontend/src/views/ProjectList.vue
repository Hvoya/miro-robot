<template>
  <ProjectPageTemplate>
    <h2 v-html="$t('headings.miro_projects')"></h2>
    <a-input-search
      :style="{width: '300px', marginBottom: '20px'}"
      @search="handleSearch"
      enterButton
      :placeholder="$t('form_labels.name_search')"
    >

    </a-input-search>
    <a-table
      :dataSource="projects"
      :columns="columns"
      :pagination="pagination"
      @change="handleTableChange"
    >
      <!-- <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a> -->
      <router-link slot="name" slot-scope="text, record" :to="'/projects/' + record.id">{{text}}</router-link>
      <p slot="date" slot-scope="value">{{formatDate(value)}}</p>
      <router-link
        slot="creator"
        slot-scope="value, record"
        :to="'/projects/users/' + record.user.id"
      >{{record.user.username}}</router-link>
    </a-table>
  </ProjectPageTemplate>
</template>

<script>
import ProjectPageTemplate from "../templates/ProjectPageTemplate";
import xhr from "../utils/fetch";
import { formatDateForTable } from "../utils/dates";
import { Pagination } from 'ant-design-vue';

export default {
  components: {
    ProjectPageTemplate,Pagination
  },
  data() {
    return {
      projects: [],
      sorter: {
        field: "created_at",
        order: "descend"
      },
      pagination: {
        current: 1,
        pageSize: 10
      },
      filters:{},
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
          dataIndex: "like_count",
          sorter: true
        },
        {
          title: this.$t("tables.comments"),
          dataIndex: "comments",
          width: "10%",
          dataIndex:'comment_count',
          sorter: true
          // scopedSlots: { customRender: "comments" }
        },
        {
          title: this.$t("tables.creator"),
          dataIndex: "created_at",
          width: "20%",
          scopedSlots: { customRender: "creator" }
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
    handleSearch(v){
      const filters = {search: v}
      this.handleTableChange(this.pagination, filters, this.sorter)
    },
    fetch() {
      xhr
        .getList("/projects", {
          sorter: this.sorter,
          filters: this.filters,
          pagination: {...this.pagination}
        })
        .then(response => {
          this.projects = response.data;
          this.pagination = {...response.pagination, current: this.pagination.current};
          console.log(this.pagination)
        })
        .catch(() => {
          this.$message.error(this.$t("errors.server_error"));
        });
    },
    handleTableChange(pagination, filters, sorter) {
      this.sorter = sorter;
      this.pagination = {...pagination};
      this.filters = filters;
      this.fetch();
    }
  },
  mounted() {
    this.fetch();
  },
  // updated() {
  //   console.log(this.pagination)
  // }
};
</script>

<style scoped>
h2 {
  font-size: 30px;
  margin-bottom: 30px;
  text-align: left;
}
</style>
