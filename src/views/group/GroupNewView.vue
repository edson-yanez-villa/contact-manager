<template>
  <div class="container mt-5">
    <h1 class="mb-4 text-center">Registrar Grupo</h1>
    <form @submit.prevent="submitForm" class="needs-validation" novalidate>
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
      <button type="submit" class="btn btn-primary w-100">Registrar</button>
    </form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "GroupNew",
  data() {
    return {
      form: {
        name: null,
      },
      errors: {},
    };
  },
  methods: {
    validateForm() {
      this.errors = {};
      if (!this.form.name) {
        this.errors.name = "El nombre del grupo es obligatorio.";
      }
      return Object.keys(this.errors).length === 0;
    },
    submitForm() {
      if (this.validateForm()) {
        this.save();
        this.resetForm();
      }
    },
    save() {
      const vm = this;
      const path = this.baseUrl + "/groups";
      this.axios
        .post(path, this.form)
        .then((response) => {
          if (response.status === 201) {
            vm.$emit("on-register", response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    resetForm() {
      this.form = {
        name: null,
      };
      this.errors = {};
    },
  },
  computed: {
    ...mapGetters(["getBaseUrl"]),
    baseUrl() {
      return this.getBaseUrl;
    },
  },
};
</script>
<style scoped></style>
