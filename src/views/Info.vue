<template>
  <div class="intro-container">
    <div class="intro-content">
      <h1>Info</h1>
    <h4>It worked!</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "Info",
  props: {},
  mounted() {
    console.log("intro mounted");
  },
  methods: {
  }
};
</script>

<style scoped>
.bold {
  /* font-weight: bold; */
}

.intro-container {
  width: 100vw;
  height: 100vh;
  background: #fffffff5;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9;
  overflow: scroll;
}

.intro-content {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  overflow: scroll;
  /* margin: 50px 0px; */
  padding-bottom: 50px;
}


.intro-content a {
  color: black;
}


.intro-copy {
  text-align: center;
  margin: auto;
  width: 100%;
}

.intro-copy {
  text-align: center;
  margin: auto;
  width: 100%;
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
    font-family: 'Times New Roman', Times, serif;

}

button.instructions {
  background: none;
  border: none;
  text-decoration: underline;
  font-family: 'Times New Roman', Times, serif;
}
</style>
