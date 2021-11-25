<template>
  <div>
    <v-app-bar app color="primary">
      <v-toolbar-title class="white--text">🛡️ Battle map ⚔️</v-toolbar-title>
      <v-spacer />
      <AddTokenModal></AddTokenModal>
    </v-app-bar>
    <v-row justify="center" align="center">
      <v-col cols="auto" class="pa-0 ma-0">
        <v-card elevation="12" class="mt-3" ref="canvasCard">
          <BattleMap></BattleMap>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    tokenList: [],
    rounded: false,
    previewImage: null,
    konvasImage: null,
    tokenImageLoaded: true,
  }),
  computed: {
    width() {
      return this.$store.state.width;
    },
  },
  mounted() {
    this.$nextTick(function () {
      // this.insertToken("/monster1.jpg", 50, 100);
      this.insertToken("/monster2.png", 200, 100);
      this.insertBackground("/background.png", 0, 0);
      if (this.$vuetify.breakpoint.name == "xs") {
        this.$store.commit("setDimensions", {
          width: window.innerWidth,
          height: window.innerHeight,
        });
      } else {
        this.$store.commit("setDimensions", {
          width: window.innerWidth - 100,
          height: window.innerHeight - 150,
        });
      }
    });
  },
  methods: {
    insertToken(url, x, y) {
      const konvasImage = new window.Image();
      konvasImage.src = url;
      konvasImage.onload = () => {
        this.konvasImage = konvasImage;
        let newToken = {
          data: {
            config: {
              image: this.konvasImage,
              x: x,
              y: y,
              width: 30,
              height: 30,
            },
            rounded: true,
          },
        };
        this.$store.commit("addToken", newToken);
      };
    },
    insertBackground(url, x, y) {
      const konvasImage = new window.Image();
      konvasImage.src = url;
      konvasImage.onload = () => {
        this.konvasImage = konvasImage;
        let newBackground = {
          data: {
            config: {
              image: this.konvasImage,
              x: x,
              y: y,
              width: this.width,
              height: (konvasImage.height / konvasImage.width) * this.width,
            },
            rounded: true,
          },
        };
        this.$store.commit("addBackground", newBackground);
      };
    },
  },
};
</script>
