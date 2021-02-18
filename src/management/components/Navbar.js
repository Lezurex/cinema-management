export default {
    props: {},
    data() {
        return {
            elements: ['Movies', 'Halls']
        }
    },
    template: `
      <div id="header">
      <ul>
        <li><b>Cinema Management</b></li>
        <li v-for="element in elements" v-on:click="changePage(elements.indexOf(element))">
          {{ element }}
        </li>
      </ul>
      </div>
    `,
    methods: {
        changePage(index) {
            switch (index) {
                case 0:
                    this.$emit("changepage", "MOVIES");
                    break;
                case 1:
                    this.$emit("changepage", "HALLS");
                    break;
            }
        }
    }
}