<template>
  <div class="container mt-5">
    <h1 class="mb-4 text-center">Registrar Contacto</h1>
    <form @submit.prevent="submitForm" class="needs-validation" novalidate>
      <div class="row mb-3">
        <div class="col-md-6">
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
        <div class="col-md-6">
          <label for="email" class="form-label">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            :class="['form-control', { 'is-invalid': errors.email }]"
            placeholder="Ingrese el correo electrónico"
            required
          />
          <div v-if="errors.email" class="invalid-feedback">
            {{ errors.email }}
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-md-6">
          <label for="phone" class="form-label">Teléfono:</label>
          <input
            type="tel"
            id="phone"
            v-model="form.phone"
            :class="['form-control', { 'is-invalid': errors.phone }]"
            placeholder="Ingrese el teléfono"
            required
          />
          <div v-if="errors.phone" class="invalid-feedback">
            {{ errors.phone }}
          </div>
        </div>
        <div class="col-md-6">
          <label for="address" class="form-label">Dirección:</label>
          <input
            type="text"
            id="address"
            v-model="form.address"
            :class="['form-control', { 'is-invalid': errors.address }]"
            placeholder="Ingrese la dirección"
            required
          />
          <div v-if="errors.address" class="invalid-feedback">
            {{ errors.address }}
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-md-6">
          <label for="city" class="form-label">Ciudad:</label>
          <input
            type="text"
            id="city"
            v-model="form.city"
            :class="['form-control', { 'is-invalid': errors.city }]"
            placeholder="Ingrese la ciudad"
            required
          />
          <div v-if="errors.city" class="invalid-feedback">
            {{ errors.city }}
          </div>
        </div>
        <div class="col-md-6">
          <label for="country" class="form-label">País:</label>
          <input
            type="text"
            id="country"
            v-model="form.country"
            :class="['form-control', { 'is-invalid': errors.country }]"
            placeholder="Ingrese el país"
            required
          />
          <div v-if="errors.country" class="invalid-feedback">
            {{ errors.country }}
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-md-6">
          <label for="grupo" class="form-label">Grupo:</label>
          <select
            id="grupo"
            v-model="form.groupId"
            :class="['form-control', { 'is-invalid': errors.groupId }]"
            required
          >
            <option
              :value="grupo.id"
              v-for="(grupo, index) in grupoList"
              :key="`grupo-${index}`"
            >
              {{ grupo.name }}
            </option>
          </select>
          <div v-if="errors.groupId" class="invalid-feedback">
            {{ errors.groupId }}
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
  name: "ContactNew",
  data() {
    return {
      grupoList: [],
      form: {
        name: null,
        email: null,
        phone: null,
        address: null,
        city: null,
        country: null,
        groupId: null,
      },
      errors: {},
    };
  },
  methods: {
    validateForm() {
      this.errors = {};
      if (!this.form.groupId) {
        this.errors.groupId = "El Grupo es obligatorio.";
      }
      if (!this.form.name) {
        this.errors.name = "El nombre es obligatorio.";
      }
      if (!this.form.email) {
        this.errors.email = "El email es obligatorio.";
      }
      if (!this.form.phone) {
        this.errors.phone = "El telefono es obligatorio.";
      }
      if (!this.form.address) {
        this.errors.address = "La dirección es obligatorio.";
      }
      if (!this.form.city) {
        this.errors.city = "La ciudad es obligatorio.";
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
      const path = this.baseUrl + "/contacts";
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
    getGroupList() {
      const vm = this;
      const path = vm.baseUrl + "/groups";
      vm.axios
        .get(path)
        .then((response) => {
          vm.grupoList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    resetForm() {
      this.form = {
        name: null,
        email: null,
        phone: null,
        address: null,
        city: null,
        country: null,
        groupId: null,
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
  mounted() {
    this.getGroupList();
  },
};
</script>
<style scoped></style>
