export default {
    props: {
        halls: Array,
        movies: Array
    },
    data() {
        return {}
    },
    template: `
      <main>
      <h1>Movies</h1>
      <p>Here you can manage all the movies playing in the cinema.</p>
      <div class="card">
        <div class="card-header">
          Add a new movie
        </div>
        <div class="card-body">
          <form class="form-floating">
            <input type="text" class="form-control" id="add-title" placeholder="Movie title" required>
            <label for="add-title">Movie title</label>
          </form>
          <br>
          <div class="form-floating">
            <textarea maxlength="1000" class="form-control" placeholder="Description" id="add-description"
                      style="height: 100px"></textarea>
            <label for="add-description">Movie description</label>
          </div>
          <br>
          <div class="form-floating">
            <select class="form-select" id="add-hall" aria-label="Floating label select example">
              <option v-for="hall in halls" value="hall.uuid">Hall {{ hall.number }} ({{ hall.seatsX }} x {{ hall.seatsZ }}) ({{ hall.seatsX * hall.seatsZ }} Seats)</option>
            </select>
            <label for="add-hall">Works with selects</label>
          </div>
        </div>
      </div>
      </main>`,
    methods: {},
    mounted: function () {

    }
}