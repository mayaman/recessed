<template>
  <div class="container">
    <div v-for="dancer in data" v-bind:key="dancer['name']">
      <div
        class="window-container"
        :id="'window-' + dancer['name'] + index"
        v-for="(thumbnail, index) in dancer.imagePaths"
        v-bind:key="thumbnail"
      >
        <button
          @click="doneMoving(dancer, dancer['name'] + index)"
          aria-label="Open popup window"
        >
          <Window
            :ref="dancer['name'] + index"
            class="window"
            :id="'dancer-' + dancer['name'] + index"
            :active="dancer['active']"
            :name="dancer['name']"
            :index="index"
            :imagePath="thumbnail"
            :maxCellWidth="maxCellWidth"
            :maxCellHeight="maxCellHeight"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import VueResizable from "vue-resizable";
import draggable from "vuedraggable";
import Window from "@/components/Window.vue";
import jsonData from "@/data.json";

export default {
  name: "Main",
  props: {},
  components: {
    VueResizable,
    draggable,
  },
  data() {
    return {
      data: jsonData,
      start: 0,
      grid: [],
      numRows: 7,
      numCols: 5,
      maxCellHeight: 0,
      maxPlacementWidth: 0,
      maxPlacementHeight: 0,
      myArray: [1, 2, 3, 4],
      moving: false,
      movingTime: 0,
    };
  },
  computed: {
    maxCellWidth() {
      return window.innerWidth / this.numRows;
    },
  },
  components: {
    Window,
  },
  mounted() {
    // setInterval(this.tick, 500);
    for (let r = 0; r < this.numRows; r++) {
      for (let c = 0; c < this.numCols; c++) {
        if (!this.grid[r]) {
          this.grid[r] = [];
        }
        this.grid[r][c] = false;
      }
    }
    this.maxCellHeight = window.innerHeight / this.numCols;
    this.placeDancers();
    // window.onresize = this.placeDancers();
  },
  methods: {
    goodbyeMouse(name) {
      console.log("bye mouse");
      document.getElementById("dancer-" + name).classList.remove("hover");
    },
    startMoving() {
      this.moving = true;
    },
    whileMoving(name) {
      document.getElementById("dancer-" + name).classList.add("hover");
      document.getElementById("dancer-" + name).classList.add("moving");

      this.movingTime++;
    },
    doneMoving(dancer, name) {
      if (this.movingTime < 3) {
        this.openPopup(dancer);

        console.log(this.$refs[name][0]);
        this.$refs[name][0].fadeOut();
        // Need to fade
      }
      this.moving = false;
      // document.getElementById("dancer-" + name).classList.remove("moving");

      this.movingTime = 0;
    },
    placeDancers() {
      // Set placements
      this.data.forEach((dancer) => {
        if (dancer.imagePaths) {
          for (let i = 0; i < dancer.imagePaths.length; i++) {
            let windowImage = document.getElementById(
              "window-image-" + dancer.name
            );

            let windowElt = document.getElementById(
              "window-" + dancer.name + i
            );

            let row = parseInt(Math.random() * this.numRows);
            let col = parseInt(Math.random() * this.numCols);

            while (this.grid[row][col]) {
              row = parseInt(Math.random() * this.numRows);
              col = parseInt(Math.random() * this.numCols);
            }

            this.grid[row][col] = true;

            let colWidth = window.innerWidth / this.numCols;
            let rowHeight = window.innerHeight / this.numRows;

            let newWidth = (Math.random() * colWidth) / 2; // / 7

            let newHeight = window.innerHeight / this.numRows / 100;

            if (newWidth < 50) {
              newWidth = newWidth + 50;
            }

            newWidth = 80;
            newHeight = 1;
            // if (newHeight < 100) {
            //   newHeight = newHeight + 100;
            // }

            // newWidth = (newWidth / window.innerWidth) * 70;
            // newHeight = (newHeight / window.innerHeight) * 70;

            // let leftPos =
            //   row * (window.innerWidth / this.numRows) +
            //   (colWidth / 2 - newWidth);

            // let topPos =
            //   col * (window.innerHeight / this.numCols) +
            //   (rowHeight / 2 - newWidth / 2);

            let leftPos = (row / this.numRows) * 100 + 2;

            // row * (window.innerWidth / this.numRows) +
            //   (colWidth / 2 - newWidth);
            let topPos = (col / this.numCols) * 100 + 3;
            leftPos = Math.random() * 90;
            topPos = Math.random() * 81 + 4;
            // let topPos  +=
            //   col * (window.innerHeight / this.numCols) +
            //   (rowHeight / 2 - newWidth / 2);

            // let leftPos =
            //   (Math.random() - (newWidth * 1.3) / window.innerWidth) * 100;

            // if (leftPos < 0) {
            //   leftPos = 1;
            // }

            // let topPos =
            //   (Math.random() - (newWidth * 1.3) / window.innerHeight) * 100;

            // if (topPos < 0) {
            //   topPos = 1;
            // }

            windowElt.style.left = leftPos + "%";
            windowElt.style.top = topPos + "%";
            windowElt.style.width = newWidth + "%";
            // windowElt.style.height = newHeight + "%";
            windowElt.style.maxWidth = newWidth + "px";
            // windowElt.style.maxHeight = newHeight + "px";
          }
        }
      });
    },
    tick() {
      this.mutate();
      // this.data.forEach((dancer) => {
      //   const randomNum = Math.random();
      //   if (randomNum > 0.5) {
      //     dancer.active = true;
      //   } else {
      //     dancer.active = false;
      //   }
      // });
    },
    mutate() {
      // this.data[0].active = !this.data[0].active;
    },
    openPopup(theDancer) {
      console.log("tYRING TO OPEN POPUP UP");
      for (
        let i = 0;
        i < theDancer.views[theDancer.viewIndex].windows.length;
        i++
      ) {
        let popupWindow = theDancer.views[theDancer.viewIndex].windows[i];
        let routeData = this.$router.resolve({
          name: "world",
          params: {
            name: theDancer["name"],
            viewIndex: theDancer.viewIndex,
            windowIndex: i,
          },
        });

        let popupWidth, popupHeight, popupLeft, popupTop, openDelay;

        if (popupWindow["widthScale"]) {
          popupWidth = screen.width * popupWindow["widthScale"];
        } else {
          popupWidth = popupWindow["width"];
        }

        if (popupWindow["heightScale"]) {
          popupHeight = screen.height * popupWindow["heightScale"];
        } else {
          popupHeight = popupWindow["height"];
        }

        if (popupWindow["leftScale"]) {
          popupLeft = screen.width * popupWindow["leftScale"] - popupWidth / 2;
          if (popupLeft < 0) {
            popupLeft = 1;
          }
        } else {
          popupLeft = popupWindow["left"];
        }

        if (popupWindow["topScale"]) {
          popupTop = screen.height * popupWindow["topScale"] - popupHeight / 2;
        } else {
          popupTop = popupWindow["top"];
        }

        const windowParams =
          "width=" +
          popupWidth +
          ", height=" +
          popupHeight +
          ", left=" +
          popupLeft +
          ", top=" +
          popupTop;

        if (popupWindow["openDelay"]) {
          setTimeout(() => {
            window.open(routeData.href, name, windowParams);
          }, popupWindow["openDelay"]);
        } else {
          window.open(routeData.href, name, windowParams);
        }
      }
      theDancer.viewIndex = (theDancer.viewIndex + 1) % theDancer.views.length;
    },
  },
};
</script>

<style scoped>
.testmove {
  width: 100px;
  height: 100px;
}

.container {
  width: 100vw;
  height: 100vh;
  background: white;
}

button {
  border: 0px;
  padding: 0px;
  font-size: 0px;
  background: none;
}

.window-container {
  margin: 15px;
  position: absolute;
}

.window-container:hover {
}

.window {
  padding: 0px;
  margin: 0px;
  border: 2px solid #ffffff00;
}

.moving {
  cursor: grabbing;
}

.hover,
.window:hover {
  cursor: pointer;
  /* transition: 0.5s ease; */
  /* filter: drop-shadow(0 0 5.55px #6289FB); */
  border-color: #6289FB;
}
</style>
