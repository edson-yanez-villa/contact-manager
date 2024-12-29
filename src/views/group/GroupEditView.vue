<template>
  <div>
    <h1>Editar Grupo</h1>
    <form @submit.prevent="submitForm">
      <div class="row mb-3">
        <div class="col-md-12">
          <label for="name" class="form-label">Nombre:</label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            :class="['form-control', { 'is-invalid': errors.name }]"
            placeholder="Ingrese el nombre"
            required
          />
          <div v-if="errors.name" class="invalid-feedback">
            {{ errors.name }}
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary w-100">Actualizar</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "GroupEdit",
  data() {
    return {
      errors: {},
    };
  },
  props: ["item"],
  methods: {
    validateForm() {
      this.errors = {};

      if (!this.item.name) {
        this.errors.name = "El nombre es obligatorio.";
      }
      return Object.keys(this.errors).length === 0;
    },

    submitForm() {
      if (this.validateForm()) {
        this.save();
      }
    },
    save() {
      const vm = this;
      this.axios
        .patch(this.baseUrl + "/groups/" + this.item.id, this.form)
        .then(function (response) {
          if (response.status == "200") {
            vm.$emit("on-update", response.data);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
  computed: {
    ...mapGetters(["getBaseUrl"]),
    baseUrl() {
      return this.getBaseUrl;
    },
    form() {
      return Object.assign({}, this.item);
    },
  },
};
</script>

<style scoped></style>
