<template>
  <div>
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="white" icon v-bind="attrs" v-on="on">
          <v-icon> mdi-plus </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5 primary--text">Ajouter un token</span>
        </v-card-title>
        <v-card-text class="py-0">
          <v-row align="center" justify="space-around">
            <v-col cols="12">
              <input
                type="file"
                accept="image"
                @change="uploadImage"
                ref="form"
              />
            </v-col>
          </v-row>
          <v-row align="center" justify="space-between" class="mt-0">
            <v-col cols="4">
              <v-avatar size="100" :tile="!rounded">
                <v-img
                  ref="toto"
                  :src="previewImageSrc"
                  class="uploading-image"
                  width="100"
                  height="100"
                />
              </v-avatar>
            </v-col>
            <v-col cols="6">
              <v-row class="my-2" justify="center">
                <v-col cols="auto">
                  <v-switch
                    v-model="rounded"
                    label="Arrondi ?"
                    color="primary"
                    value="primary"
                    hide-details
                  ></v-switch>
                </v-col>
              </v-row>
              <v-row class="my-2" justify="center">
                <v-col cols="auto">
                  <v-btn
                    @click="addToken"
                    color="primary"
                    :disabled="tokenImageLoaded"
                  >
                    Ajouter
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Fermer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    previewImage: null,
    konvasImage: null,
    tokenImageLoaded: true,
    rounded: false,
    previewImageSrc: null,
  }),
  methods: {
    addToken() {
      let width = this.$refs.toto.image.width;
      let height = this.$refs.toto.image.height;
      let ratio = width / height;
      let newWidth;
      let newHeight;
      if (ratio < 1) {
        newHeight = 100 / ratio;
        newWidth = 100;
      } else {
        newHeight = 100;
        newWidth = 100 * ratio;
      }

      let newToken = {
        data: {
          ratio: ratio,
          config: {
            image: this.konvasImage,
            x: 150,
            y: 150,
            width: newWidth,
            height: newHeight,
          },
          rounded: this.rounded,
        },
      };
      this.$store.commit("addToken", newToken);
      this.tokenImageLoaded = true;
      this.previewImageSrc = null;
      this.$refs.form.value = "";
      this.dialog = false;
    },
    uploadImage(e) {
      const previewImage = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(previewImage);
      reader.onload = (e) => {
        let src = e.target.result;
        this.previewImageSrc = src;
        const konvasImage = new window.Image();
        konvasImage.src = src;
        konvasImage.onload = () => {
          this.konvasImage = konvasImage;
          this.tokenImageLoaded = false;
        };
      };
    },
  },
};
</script>
