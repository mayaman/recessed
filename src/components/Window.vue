<template>
  <transition name="fade">
    <div
      v-if="show && !isVideo"
      @click="fadeOut()"
      id="inner-window"
      class="window"
    >
      <img
        :id="'window-image-' + name"
        class="dancerImage"
        :alt="'image of ' + name"
        :src="'https://storage.googleapis.com/recessed-assets/' + imagePath"
      />
      <!-- <img
        :id="'window-image-' + name"
        class="dancerImage"
        :alt="'image of ' + name"
        :src="'@/assets/' + imagePath"
      /> -->
    </div>

    <div
      v-if="show && isVideo"
      @click="fadeOut()"
      id="inner-window"
      class="window"
    >
      <video
        :id="'window-image-' + name"
        class="dancerImage"
        :alt="'image of ' + name"
        autoplay
        loop
        muted
        playsinline
        :src="'https://storage.googleapis.com/recessed-assets/' + imagePath"
      ></video>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Window",
  props: {
    name: String,
    index: Number,
    imagePath: String,
    active: Boolean,
    maxCellWidth: Number,
    maxCellHeight: Number,
  },
  data() {
    return {
      show: true,
      video: false,
      position: {
        x: 0,
        y: 0,
      },
    };
  },
  computed: {
    // a computed getter
    isVideo: function () {
      // `this` points to the vm instance
      return this.imagePath.split(".")[1] == "mp4";
    },
  },
  mounted() {},
  methods: {
    fadeOut(e) {
      this.show = false;
      setTimeout(() => {
        this.show = true;
      }, 300000);
    },
  },
};
</script>

<style scoped>
.dancerImage {
  max-width: 100%;
  max-height: 100%;
  height: auto;
  position: relative;
  /* z-index: 99; */
  opacity: 1;
  /* transition: 0.5s ease; */
}

.dancerImage:hover {
  /* opacity: 1;
  transform: scale(1.25);
  transition: 0.5s ease; */
  /* filter: drop-shadow(0 0 15px blue); */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.3s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
