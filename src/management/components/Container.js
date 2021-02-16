export default {
    props: {
        page: {
            type: String,
            required: true
        },
        movies: Array,
        halls: Array
    },
    data() {
        return {

        }
    },
    template: `<movies :halls="halls" :movies="movies" v-if="page === 'MOVIES'"></movies>
    <halls :halls="halls" v-if="page === 'HALLS'"></halls>`,
}