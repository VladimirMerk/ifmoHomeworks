const template = `
<div>
  <ul>
    <li v-for="n in counter" v-bind:key="n" :set="exp = 9 + n">
      <h1><span>2</span><sup>{{ exp }}</sup> = {{ 2 ** exp }}</h1>
    </li>
  </ul>
</div>`;

export default {
  template,
  props: {
    counter: {
      type: Number,
      default: 5
    },
  }
}