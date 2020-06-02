<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <ColorRange
      identifier="r"
      v-bind:value="color.r"
      v-on:change-value="onChangeValue"
    />
    <ColorRange
      identifier="g"
      v-bind:value="color.g"
      v-on:change-value="onChangeValue"
    />
    <ColorRange
      identifier="b"
      v-bind:value="color.b"
      v-on:change-value="onChangeValue"
    />
  </div>
</template>

<script>
import ColorRange from './components/ColorRange.vue';

export default {
  name: 'App',
  components: {
    ColorRange,
  },
  data() {
    return {
      color: {
        r: 255,
        g: 255,
        b: 255,
      },
    };
  },
  methods: {
    onChangeValue(e) {
      this.color[e.identifier] = e.value;
      document.documentElement.style.backgroundColor = `
      rgb(
        ${this.color.r},
        ${this.color.g},
        ${this.color.b}
      )`;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
