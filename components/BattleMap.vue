<template>
  <v-stage
    ref="stage"
    :config="configKonva"
    @touchmove="touchmove"
    @touchend="touchend"
    @wheel="wheel"
  >
    <v-layer ref="layer">
      <Background v-if="background" :data="background.data"></Background>
      <Token
        v-for="(token, index) in tokenList"
        :key="index"
        :data="token.data"
      />
    </v-layer>
  </v-stage>
</template>

<script>
const Konva = require("konva/cmj").default;

export default {
  data: () => ({
    configKonva: {
      width: 200,
      height: 200,
      draggable: true,
    },
    // Pinch zoom
    lastCenter: null,
    lastDist: 0,
    // Scroll zoom
    scaleBy: 1.1,
  }),
  mounted() {
    this.$nextTick(function () {
      Konva.hitOnDragEnabled = true;
      this.configKonva.width = window.innerWidth - 100;
      this.configKonva.height = window.innerHeight - 56 - 32 - 20 - 40;
    });
  },
  computed: {
    tokenList() {
      return this.$store.state.tokens;
    },
    background() {
      return this.$store.state.background;
    },
  },
  methods: {
    // Scroll zoom
    wheel(e) {
      let stage = this.$refs.stage.getStage();

      e.evt.preventDefault();
      var oldScale = stage.scaleX();

      var pointer = stage.getPointerPosition();

      var mousePointTo = {
        x: (pointer.x - stage.x()) / oldScale,
        y: (pointer.y - stage.y()) / oldScale,
      };

      var newScale =
        e.evt.deltaY < 0 ? oldScale * this.scaleBy : oldScale / this.scaleBy;

      stage.scale({ x: newScale, y: newScale });

      var newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale,
      };
      stage.position(newPos);
    },

    // Pinch zoom
    getDistance(p1, p2) {
      return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    },
    getCenter(p1, p2) {
      return {
        x: (p1.x + p2.x) / 2,
        y: (p1.y + p2.y) / 2,
      };
    },
    touchmove(e) {
      let stage = this.$refs.stage.getStage();
      e.evt.preventDefault();
      var touch1 = e.evt.touches[0];
      var touch2 = e.evt.touches[1];

      if (touch1 && touch2) {
        // if the stage was under Konva's drag&drop
        // we need to stop it, and implement our own pan logic with two pointers

        this.configKonva.draggable = false;

        var p1 = {
          x: touch1.clientX,
          y: touch1.clientY,
        };
        var p2 = {
          x: touch2.clientX,
          y: touch2.clientY,
        };

        if (!this.lastCenter) {
          this.lastCenter = this.getCenter(p1, p2);
          return;
        }
        var newCenter = this.getCenter(p1, p2);

        var dist = this.getDistance(p1, p2);

        if (!this.lastDist) {
          this.lastDist = dist;
        }

        // local coordinates of center point
        var pointTo = {
          x: (newCenter.x - stage.x()) / stage.scaleX(),
          y: (newCenter.y - stage.y()) / stage.scaleX(),
        };

        var scale = stage.scaleX() * (dist / this.lastDist);

        stage.scaleX(scale);
        stage.scaleY(scale);

        // calculate new position of the stage
        var dx = newCenter.x - this.lastCenter.x;
        var dy = newCenter.y - this.lastCenter.y;

        var newPos = {
          x: newCenter.x - pointTo.x * scale + dx,
          y: newCenter.y - pointTo.y * scale + dy,
        };

        stage.position(newPos);

        this.lastDist = dist;
        this.lastCenter = newCenter;
      }
    },

    touchend() {
      this.lastDist = 0;
      this.lastCenter = null;
      this.configKonva.draggable = true;
    },
  },
};
</script>
