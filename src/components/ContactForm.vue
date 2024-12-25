<template>
  <div>
    <h1>{{ editing ? "Editar Contacto" : "Agregar Contacto" }}</h1>
    <form @submit.prevent="saveContact">
      <div class="mb-3">
        <label for="name" class="form-label">Nombre</label>
        <input
          v-model="localContact.name"
          id="name"
          class="form-control"
          placeholder="Nombre"
          required
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Correo Electrónico</label>
        <input
          v-model="localContact.email"
          id="email"
          class="form-control"
          placeholder="Correo Electrónico"
          required
        />
      </div>
      <div class="mb-3">
        <label for="address" class="form-label">Dirección</label>
        <input
          v-model="localContact.address"
          id="address"
          class="form-control"
          placeholder="Dirección"
        />
      </div>
      <div class="mb-3">
        <label for="phone" class="form-label">Teléfono</label>
        <input
          v-model="localContact.phone"
          id="phone"
          class="form-control"
          placeholder="Teléfono"
        />
      </div>
      <div class="mb-3">
        <label for="country" class="form-label">País</label>
        <input
          v-model="localContact.country"
          id="country"
          class="form-control"
          placeholder="País"
        />
      </div>
      <div class="mb-3">
        <label for="city" class="form-label">Ciudad</label>
        <input
          v-model="localContact.city"
          id="city"
          class="form-control"
          placeholder="Ciudad"
        />
      </div>
      <button type="submit" class="btn btn-success">
        {{ editing ? "Guardar Cambios" : "Agregar Contacto" }}
      </button>
      <button type="button" class="btn btn-secondary" @click="$emit('cancel')">
        Cancelar
      </button>
    </form>
  </div>
</template>

<script>
export default {
  props: ["contact", "editing"],
  data() {
    return {
      localContact: { ...this.contact },
    };
  },
  methods: {
    saveContact() {
      this.$emit("save-contact", this.localContact);
    },
  },
  watch: {
    contact(newContact) {
      this.localContact = { ...newContact };
    },
  },
};
</script>
