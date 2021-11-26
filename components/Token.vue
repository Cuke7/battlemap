<template>
  <v-group
    :config="data.rounded ? groupConfigRounded : groupConfigNotRounded"
    @dblclick="selected"
  >
    <v-image :config="data.config"></v-image>
  </v-group>
</template>

<script>
export default {
  props: ["data"],
  data: () => ({}),
  computed: {
    groupConfigRounded() {
      let config = {
        clipFunc: (ctx) => {
          ctx.arc(
            this.data.config.x + this.data.config.width / 2,
            this.data.config.y + this.data.config.height / 2,
            this.data.config.width < this.data.config.height
              ? this.data.config.width / 2
              : this.data.config.height / 2,
            0,
            Math.PI * 2,
            true
          );
        },
        draggable: true,
      };
      return config;
    },
    groupConfigNotRounded() {
      let config = {
        draggable: true,
      };
      return config;
    },
  },
  methods: {
    selected() {
      console.log(this.data.name);
    },
  },
};
</script>
