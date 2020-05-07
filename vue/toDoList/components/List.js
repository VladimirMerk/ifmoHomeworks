const template = `
<div>
  <ol>
    <li v-for="(item, index) in list" v-bind:key="index">{{ item }}</li>
  </ol>
</div>`;

export default {
  template,
  props: {
    list: {
      type: Array
    },
  }
}