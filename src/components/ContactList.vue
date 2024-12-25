<template>
  <div class="container">
    <h1 class="my-4">Lista de Contactos</h1>
    <div class="row mb-3">
      <div class="col">
        <input
          v-model="searchName"
          class="form-control"
          placeholder="Buscar por nombre"
          @input="filterContacts"
        />
      </div>
      <div class="col">
        <input
          v-model="searchEmail"
          class="form-control"
          placeholder="Buscar por email"
          @input="filterContacts"
        />
      </div>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Dirección</th>
          <th>Teléfono</th>
          <th>Pais</th>
          <th>Ciudad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in filteredContacts" :key="contact.id">
          <td>{{ contact.name }}</td>
          <td>{{ contact.email }}</td>
          <td>{{ contact.address }}</td>
          <td>{{ contact.phone }}</td>
          <td>{{ contact.country }}</td>
          <td>{{ contact.city }}</td>
          <td>
            <button
              class="btn btn-primary btn-sm"
              @click="$emit('edit-contact', contact)"
            >
              Editar
            </button>
            <button
              class="btn btn-danger btn-sm"
              @click="$emit('delete-contact', contact.id)"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["contacts"],
  data() {
    return {
      searchName: "",
      searchEmail: "",
      filteredContacts: this.contacts,
    };
  },
  watch: {
    contacts(newContacts) {
      this.filteredContacts = newContacts;
    },
  },
  methods: {
    filterContacts() {
      this.filteredContacts = this.contacts.filter((contact) => {
        return (
          contact.name.toLowerCase().includes(this.searchName.toLowerCase()) &&
          contact.email.toLowerCase().includes(this.searchEmail.toLowerCase())
        );
      });
    },
  },
};
</script>
