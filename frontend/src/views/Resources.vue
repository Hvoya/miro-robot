<template>
  <div class="res-container">
    <Navigation place="static" />
    <h1 class="res-heading">{{$t('navigation.resources')}}</h1>
    <a-tabs defaultActiveKey="1" tabPosition="left">
      <a-tab-pane key="1" :tab="$t('headings.creation_assembly')">
        <div class="res-card-container">
          <a-card
            @click="()=>goToFile(card.link)"
            v-for="card of assembly_resources"
            :key="card.label"
            hoverable
            class="card"
            :style="{width: '300px'}"
          >
            <img :style="{padding: '75px'}" alt="example" :src="card.image" slot="cover" />
            <a-card-meta :title="card.label">
              <template slot="description">{{card.link}}</template>
            </a-card-meta>
          </a-card>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" :tab="$t('headings.usage')">
        <div class="res-card-container">
          <a-card
            @click="()=>goToFile(card.link)"
            v-for="card of usage_resources"
            :key="card.label"
            hoverable
            style="width: 300px"
          >
            <img :style="{padding: '75px'}" alt="example" :src="card.image" slot="cover" />
            <a-card-meta :title="card.label">
              <template slot="description">{{card.link}}</template>
            </a-card-meta>
          </a-card>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import Navigation from "../components/Projects/Navigation";
import manufacture from "../assets/manufacture.png";
import menu from "../assets/menu.png";
import instruction from "../assets/instruction.png";
import folders from "../assets/folders.png";
import books from "../assets/books.png";

export default {
  components: {
    Navigation
  },
  data() {
    return {
      assembly_resources: [
        {
          label: this.$t("files.creation"),
          link: " https://github.com/fbezruchko/miro_production",
          image: manufacture
        },
        {
          label: this.$t("files.assembly"),
          link: "https://www.youtube.com/watch?v=BQXMmGfgRmg",
          image: menu
        }
      ],
      usage_resources: [
        {
          label: this.$t("files.begginers_guide"),
          link: "https://github.com/fbezruchko/miro_beginners_guide",
          image: instruction
        },
        {
          label: "ESP8266 firmware:",
          link: "https://github.com/fbezruchko/miro_firmware_esp",
          image: folders
        },
        {
          label: "Miro API Arduino Library & Firmware:",
          link: "https://github.com/fbezruchko/miro_library_arduino",
          image: folders
        },
        {
          label: this.$t("files.raspberry"),
          link: "https://github.com/fbezruchko/miro_rpi_images",
          image: folders
        },
        {
          label: this.$t("files.virtual_box"),
          link: "https://github.com/fbezruchko/miro_virtualbox_images",
          image: folders
        },
        {
          label: "Arduino IDE w/DFU version:",
          link: "https://github.com/fbezruchko/miro_arduino_ide_dfu",
          image: folders
        },
        {
          label: this.$t("files.lessons_collection"),
          link: "https://github.com/fbezruchko/miro_lessons",
          image: books
        }
      ]
    };
  },
  methods: {
    goToFile(link) {
      window.open(link);
    }
  }
};
</script>

<style >
.res-heading {
  text-align: center;
  margin-bottom: 30px;
}
.res-container {
  padding-top: 100px;
  max-width: 990px;
  margin: 0 auto;
  min-height: 80vh;
  margin-bottom: 100px;
}
.res-card-container {
  margin-left: 20px;
  display: flex;
  flex-wrap: wrap;
}
.res-card-container .ant-card {
  margin-bottom: 30px;
  margin-right: 30px;
}
.res-container .ant-tabs-nav-scroll {
  animation: down 0.5s ease-in 0s forwards;
  position: relative;
  transform: translateY(150px);
}
@keyframes down {
  0% {
    transform: translateY(150px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
