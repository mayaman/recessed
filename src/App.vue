<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
</script>

<style>
body {
  margin: 0px;
  overflow: hidden;
}

#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  overflow: hidden;
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

button:hover,
a:hover {
  cursor: pointer;
}

::selection {
  color: white;
  background: #6289FB;
}
</style>
