export default {
    props: {
        movies: Array,
        halls: Array
    },
    data() {
        return {
            elements: []

        }
    },
    template: `
      <div id="header">
      <ul>
        <li><b>Cinema</b></li>
        <li v-for="element in elements" v-on:click="changePage(elements.indexOf(element))">
          {{ element }}
        </li>
      </ul>
      </div>
    `,
    methods: {

    },

}