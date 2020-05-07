const template = `
    <div>
      <form name="addForm" v-on:submit.prevent="onSubmit">
        <input name="addField" v-bind:style="styleObject" v-bind:class="{ error: isError }" v-model="itemText" type="text" placeholder="путое" />
        <button>Добавить</button>
      </form>
    </div>`;

export default {
  template,
  data() {
    return {
      itemText: '',
      isError: false,
    };
  },
  computed: {
    styleObject: function () {
      return {
        borderColor: this.isError ? 'red' : 'initial',
      };
    },
  },
  methods: {
    onSubmit() {
      this.itemText = this.itemText.trim();
      this.isError = !this.itemText;
      if (this.isError) return;

      this.$emit('new-element', this.itemText);
      this.itemText = '';
    },
  },
};
