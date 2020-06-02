<template>
  <div class="color-range">
    <i>{{ identifier }}: </i>
    <input
      type="number"
      v-bind:min="min"
      v-bind:max="max"
      v-bind:value="currentValue"
      v-on:keyup="emit"
      v-on:change="emit"
    />
    <input
      type="range"
      v-bind:min="min"
      v-bind:max="max"
      v-bind:value="currentValue"
      v-on:input="emit"
      v-on:change="emit"
    />
  </div>
</template>
<script>
export default {
  name: 'color-range',
  data() {
    return {
      min: 0,
      max: 255,
    };
  },
  props: ['identifier', 'value'],
  computed: {
    currentValue: function() {
      let value = parseInt(this.value) || 0;
      if (value < this.min) value = this.min;
      if (value > this.max) value = this.max;
      return value;
    },
  },
  methods: {
    emit: function({ target: { value } }) {
      const data = { identifier: this.identifier, value };
      this.$emit('change-value', data);
    },
  },
};
</script>
<style scoped>
.color-range i {
  text-transform: uppercase;
}
.color-range {
  font: bold 15px sans-serif;
}
</style>
