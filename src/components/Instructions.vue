<template>
  <div @click="toggleInstructions" class="instructions-container">
    <div @click.stop="" class="instructions-content">
      <div class="instructions-copy">
    <h4>For a smooth viewing experience, please...</h4>
    <ul class="intro-instructions">
      <li> Make sure you are not in full screen.</li>
      <li>Allow multiple pop up windows. <br><button class="popupTestButton" @click="testPopups">Click here</button> to trigger multiple pop up windows. If you do not see them, they are blocked and you need to allow...
        <ul>
          <li><a target="_blank" href="https://9to5mac.com/2018/12/10/how-to-allow-pop-ups-on-mac/">Instructions for Safari</a></li>
          <li><a target="_blank" href="https://support.google.com/chromebook/answer/95472?co=GENIE.Platform%3DDesktop&hl=en">Instructions for Chrome</a> </li>
        </ul>
      </li>
    </ul>
    <br>
    <button class="instructions" @click="toggleInstructions" >GOT IT</button>
    </div>
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
    testPopups() {
      let popUpWindow1 = window.open('./hello', 'popUpWindow1', 'height=250,width=234,left=0,top=0,resizable=no,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no,status=no');
      let popUpWindow2 = window.open('./hello', 'popUpWindow2', 'height=250,width=234,left=300,top=0,resizable=no,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no,status=no')
    }
  },
};
</script>

<style scoped>
.bold {
  font-weight: bold;
}

.instructions-container {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9;
  font-family: "Times New Roman", Times, serif;
  overflow: scroll;
}

.instructions-content {
  text-align: left;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 50%;
  background: white;
  overflow: scroll;
  border: 1px solid black;
  margin: auto;
  display: block;
}

.instructions-copy {
  text-align: left;
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: auto;
}


.instructions-content a {
  color: black;
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
  margin: 1em 0;
}

button.instructions {
  display: inline-block;
  font-family: 'Times New Roman', Times, serif;

}

button.popupTestButton {
  text-align: left;
background: none;
  border: none;
  text-decoration: underline;
  font-family: 'Times New Roman', Times, serif;
  font-size: inherit;
  padding: 0px;
  }
</style>
