<template>
  <div class="home" v-if="correctPassword">
    <Main />
      <transition name="fade">

    <Intro
    v-if="showIntro"
    @enter="onEnter"
    @toggleInstructions="toggleInstructions" />
    
     </transition>

      <transition name="fade-quick">

    <Instructions
    v-if="showInstructions"
    @toggleInstructions="toggleInstructions"/>
      </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import Main from "@/components/Main.vue";
import Intro from "@/components/Intro.vue";
import Instructions from "@/components/Instructions.vue";

export default {
  name: "Home",
  components: {
    Main,
    Intro,
    Instructions
  },
  data() {
    return {
      showIntro: true,
      showInstructions: false,
      correctPassword: false
    };
  },
  mounted() {
    let pw = prompt("Please enter the password", "");

    if (pw=="Recessed2022") {
      console.log('YOU DID IT');
      this.correctPassword = true;
    } else {
      console.log('FAIL');
      this.correctPassword = false;
    }

    // if (person == null || person == "") {
    //   text = "User cancelled the prompt.";
    // } else {
    //   text = "Hello " + person + "! How are you today?";
    //   console.log(text);
    // }
      },
  methods: {
    onEnter() {
      this.showIntro = false;
    },
    toggleInstructions() {
      this.showInstructions = !this.showInstructions;
    }
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1.0s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

