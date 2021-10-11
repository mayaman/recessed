<template>
  <div class="world-container">
    <video
      v-if="videoPath"
      class="video centered"
      :id="name + windowIndex + '-video'"
      muted="muted"
    >
      <source
        :src="'https://storage.googleapis.com/recessed-assets/' + videoPath"
        type="video/mp4"
      />
      Your browser does not support HTML video.
    </video>
    <!-- <video
      v-if="videoPath"
      class="video centered"
      :id="name + windowIndex + '-video'"
      muted="muted"
    >
      <source
        :src="'/assets/' + videoPath"
        type="video/mp4"
      />
      Your browser does not support HTML video.
    </video> -->
    <button
      :id="name + windowIndex + '-link'"
      class="hide progress-button"
      @click="openNewWindow(nextLink)"
    >
      progress
    </button>
  </div>
</template>

<script>
import jsonData from "@/data.json";

export default {
  name: "Popup",
  props: ["viewIndex", "windowIndex"],
  components: {},
  data() {
    return {
      name: this.$route.params.name,
      // index: this.$route.params.index,
      id: "",
      videoPath: "other/test.mp4",
      videoWidth: "0px",
      nextLink: "",
      currentDancer: null,
      fadeOut: 2,
      endTime: 60,
    };
  },
  computed: {},
  mounted() {
    this.id = this.name + this.windowIndex + "-video";
    let linkID = this.name + this.windowIndex + "-link";

    let videoElt = document.getElementById(this.id);

    videoElt.addEventListener("timeupdate", () => {
      if (videoElt.currentTime >= this.endTime) {
        videoElt.pause();
      }
    });

    videoElt.onpause = () => {
      // Once video has ended
      if (this.fadeOut == 2) {
        videoElt.classList.add("fade-out-2s");
      } else if (this.fadeOut == 0) {
        videoElt.classList.add("fade-out-0s");
      } else if (this.fadeOut == 5) {
        videoElt.classList.add("fade-out-5s");
      } else if (this.fadeOut == 10) {
        videoElt.classList.add("fade-out-10s");
      } else if (this.fadeOut == 4) {
        videoElt.classList.add("fade-out-4s");
      }

      if (this.nextLink == "open") {
      }

      if (this.nextLink == "close") {
        // Close window
        setTimeout(() => {
          window.close();
        }, 1250 * this.fadeOut);
      } else {
        // Show link... not going to use this actually I think
        setTimeout(() => {
          document.getElementById(linkID).classList.remove("hide");
        }, 2500);
      }
    };

    videoElt.onended = () => {
      // Once video has ended
      if (this.fadeOut == 2) {
        videoElt.classList.add("fade-out-2s");
      } else if (this.fadeOut == 0) {
        videoElt.classList.add("fade-out-0s");
      } else if (this.fadeOut == 5) {
        videoElt.classList.add("fade-out-5s");
      }

      if (this.nextLink == "close") {
        // Close window
        setTimeout(() => {
          window.close();
        }, 1250 * this.fadeOut);
      } else {
        // Show link... not going to use this actually I think
        setTimeout(() => {
          document.getElementById(linkID).classList.remove("hide");
        }, 2500);
      }
    };

    jsonData.forEach((dancer) => {
      if (dancer.name == this.name) {
        this.currentDancer = dancer;

        let currentWindow =
          dancer.views[this.viewIndex].windows[this.windowIndex];

        this.videoPath = currentWindow.videoPath;
        this.videoWidth = currentWindow.videoWidth + "px;";
        videoElt.width = currentWindow.videoWidth;

        this.nextLink = currentWindow.nextLink;
        if (currentWindow.fadeOut != undefined) {
          this.fadeOut = currentWindow.fadeOut;
        }

        if (currentWindow.fadeIn != undefined) {
          this.fadeIn = currentWindow.fadeIn;
          if (this.fadeIn == 0) {
            videoElt.classList.add("fade-in-0s");
          } else if (this.fadeIn == 2) {
            videoElt.classList.add("fade-in-2s");
          } else if (this.fadeIn == 5) {
            videoElt.classList.add("fade-in-5s");
          }
        }

        if (currentWindow.playbackRate != undefined) {
          this.playbackRate = currentWindow.playbackRate;
          videoElt.playbackRate = this.playbackRate;
        }

        if (currentWindow.endTime != undefined) {
          this.endTime = currentWindow.endTime;
        }
        videoElt.play();
      }
    });
  },
  methods: {
    openNewWindow(nextLink) {
      let nextDetails = nextLink.split(",");
      let nextDancer;
      jsonData.forEach((dancer) => {
        if (dancer.name.toLowerCase() == nextDetails[0].toLowerCase()) {
          nextDancer = dancer;
        }
      });

      let nextViewIndex = parseInt(nextDetails[1]);

      for (let i = 0; i < nextDancer.views[nextViewIndex].windows.length; i++) {
        let popupWindow = nextDancer.views[nextViewIndex].windows[i];

        let routeData = this.$router.resolve({
          name: "world",
          params: {
            name: nextDancer["name"],
            viewIndex: nextViewIndex,
            windowIndex: i,
          },
        });

        const windowParams =
          "width=" +
          popupWindow["width"] +
          ", height=" +
          popupWindow["height"] +
          ", left=" +
          popupWindow["left"] +
          ", top=" +
          popupWindow["top"];

        window.open(routeData.href, name, windowParams);
      }

      window.close();
    },
  },
};
</script>

<style scoped>
.world-container {
  margin: 0;
}

.progress-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.progress-button:hover {
  cursor: pointer;
}

.fade-out-0s {
  transition: opacity 0.1s;
  -webkit-transition: opacity 0.1s;
  opacity: 0;
}

.fade-out-2s {
  transition: opacity 2s;
  -webkit-transition: opacity 2s;
  opacity: 0;
}

.fade-out-5s {
  transition: opacity 5s;
  -webkit-transition: opacity 5s;
  opacity: 0;
}

.fade-out-10s {
  transition: opacity 10s;
  -webkit-transition: opacity 10s;
  opacity: 0;
}

.fade-in-0s {
  -webkit-animation: fadein 0.1s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 0.1s; /* Firefox < 16 */
  -ms-animation: fadein 0.1s; /* Internet Explorer */
  -o-animation: fadein 0.1s; /* Opera < 12.1 */
  animation: fadein 0.1s;
}

.fade-in-2s {
  -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 2s; /* Firefox < 16 */
  -ms-animation: fadein 2s; /* Internet Explorer */
  -o-animation: fadein 2s; /* Opera < 12.1 */
  animation: fadein 2s;
}

.fade-in-5s {
  -webkit-animation: fadein 5s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 5s; /* Firefox < 16 */
  -ms-animation: fadein 5s; /* Internet Explorer */
  -o-animation: fadein 5s; /* Opera < 12.1 */
  animation: fadein 5s;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Firefox < 16 */
@-moz-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Internet Explorer */
@-ms-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.hide {
  display: none;
}
</style>
