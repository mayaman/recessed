<template>
  <div class="intro-container">
    <div class="intro-content">
      <h1 class="title cursive">Recessed</h1>

      <div class="intro-copy">
        A collaboration between Heidi Latksy and Maya Man, featuring Sabrina
        Bennette, Desmond Cadogan, Meredith Fages, Jillian Hollis, Donald Lee, Claude-Andrée Louissaint, and Sora Sol
      </div>
      <button @click="onEnter" class="enter cursive">✧ Enter ✧</button>
      <!-- <br />
        <button class="instructions" @click="toggleInstructions">
          If this is your first viewing, read this first
        </button> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Intro",
  props: {},
  mounted() {
    console.log("intro mounted");
  },
  methods: {
    onEnter(event) {
      this.$emit("enter");
    },

    toggleInstructions(event) {
      this.$emit("toggleInstructions");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Monsieur+La+Doulaise&display=swap");

h1.title {
  font-size: 172px;
  font-weight: normal;
  margin: 0px;
  /* text-shadow: 0 0 10px #ffffff; */
}

.cursive {
  font-family: "Monsieur La Doulaise", cursive;
}

.intro-container {
  width: 100vw;
  height: 100vh;
  background: #ffffff;
  /* background: white; */
  color: black;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9;
  font-family: sans-serif;
  overflow: scroll;
  opacity: 0.9;
}

.intro-content {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* width: 500px; */
  width: 100%;
  overflow: scroll;
  /* margin: 50px 0px; */
  padding-bottom: 50px;
}

.intro-content a {
  color: black;
  /* color: white; */
}

.intro-copy {
  text-align: center;
  margin: auto;
  width: 50%;
  font-size: 18px;
  line-height: 24px;
  padding: 0px 0 20px 0;
}

.intro-instructions {
  padding: 0px;
  padding-left: 1em;
}

.intro-instructions li {
  margin: 10px 0;
}

button.enter {
  display: inline-block;
  font-family: inherit;
  background: none;
  border: none;
  color: black;
  padding: 5px;
  margin: 10px 0px;
  font-size: 18px;
  line-height: 24px;
}

button.enter:hover,
button.instructions:hover {
  color: #6289FB;
}

button.instructions {
  background: none;
  border: none;
  text-decoration: none;
  font-family: inherit;
  color: black;
  font-size: 12px;
  line-height: 18px;
  /* font-style: italic; */
}
</style>
