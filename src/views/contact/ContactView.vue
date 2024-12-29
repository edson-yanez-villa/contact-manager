<template>
  <div class="container mt-5">
    <!-- Modal para Editar Contacto -->
    <Modal v-model:modelValue="showModalEdit">
      <ContactEditView @on-update="onUpdate($event)" :item="itemToEdit" />
    </Modal>
    <!-- Modal para Nuevo Contacto -->
    <Modal v-model:modelValue="showModalNuevo">
      <ContactNewView @on-register="onRegister" />
    </Modal>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="display-4">Lista de Contactos</h1>
      <button @click="showModalNuevo = true" class="btn btn-primary">
        <i class="fas fa-plus"></i> Nuevo
      </button>
    </div>
    <div class="row mb-3">
      <div class="col-md-6">
        <input
          type="search"
          v-model="textToSearch"
          class="form-control"
          placeholder="Buscar"
          @input="buscar()"
        />
      </div>
      <div class="col-md-6 text-end">
        <button @click="buscar()" class="btn btn-secondary">
          <i class="fas fa-search"></i> Buscar
        </button>
      </div>
    </div>
    <table class="table table-hover table-bordered">
      <thead class="table-dark">
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>Direccion</th>
          <th>Ciudad</th>
          <th>País</th>
          <th>Grupo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in itemList" :key="contact.id">
          <td>{{ contact.name }}</td>
          <td>{{ contact.email }}</td>
          <td>{{ contact.phone }}</td>
          <td>{{ contact.address }}</td>
          <td>{{ contact.city }}</td>
          <td>{{ contact.country }}</td>
          <td>{{ contact.group.name }}</td>
          <td>
            <button class="btn btn-primary btn-sm" @click="edit(contact)">
              <i class="fas fa-edit"></i> Editar
            </button>
            <button
              class="btn btn-danger btn-sm"
              @click="deleteContact(contact.id)"
            >
              <i class="fas fa-trash"></i> Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Modal from "../../components/Modal.vue";
import ContactNewView from "./ContactNewView.vue";
import ContactEditView from "./ContactEditView.vue";

export default {
  name: "ContactView",
  data() {
    return {
      path: "",
      showModalNuevo: false,
      itemList: [],
      itemToEdit: null,
      showModalEdit: false,
      textToSearch: "",
    };
  },
  watch: {
    contacts(newContacts) {
      this.filteredContacts = newContacts;
    },
  },
  components: {
    Modal,
    ContactNewView,
    ContactEditView,
  },
  methods: {
    buscar() {
      this.getList();
    },
    onRegister(event) {
      this.getList();
      this.showModalNuevo = false;
    },
    edit(contact) {
      this.itemToEdit = Object.assign({}, contact);
      this.showModalEdit = true;
    },
    onUpdate(event) {
      this.getList();
      this.showModalEdit = false;
      this.itemToEdit = null;
    },
    deleteContact(id) {
      if (confirm("Estas seguro de eliminar el contacto?")) {
        const vm = this;
        const path = this.baseUrl + "/contacts/" + id;
        this.axios
          .delete(path)
          .then((response) => {
            if (response.status === 200) {
              vm.getList();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    getList() {
      const vm = this;
      this.path =
        this.baseUrl + "/contacts?_expand=group&q=" + this.textToSearch;
      this.axios
        .get(this.path)
        .then((response) => {
          vm.itemList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    ...mapGetters(["getBaseUrl"]),
    baseUrl() {
      return this.getBaseUrl;
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
