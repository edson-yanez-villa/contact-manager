<template>
  <div class="container mt-5">
    <!-- Modal para Editar Contacto -->
    <Modal v-model:modelValue="showModalEdit">
      <GroupEditView @on-update="onUpdate($event)" :item="itemToEdit" />
    </Modal>
    <!-- Modal para Nuevo Grupo -->
    <Modal v-model:modelValue="showModalNuevo">
      <GroupNewView @on-register="onRegister" />
    </Modal>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="display-4">Lista de Grupos</h1>
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
          placeholder="Buscar por nombre"
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
        </tr>
      </thead>
      <tbody>
        <tr v-for="group in itemList" :key="group.id">
          <td>{{ group.name }}</td>
          <td>
            <button class="btn btn-primary btn-sm" @click="edit(group)">
              <i class="fas fa-edit"></i> Editar
            </button>
            <button
              class="btn btn-danger btn-sm"
              @click="deleteGroup(group.id)"
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
import GroupNewView from "./GroupNewView.vue";
import GroupEditView from "./GroupEditView.vue";

export default {
  name: "GroupView",
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
  components: {
    Modal,
    GroupNewView,
    GroupEditView,
  },
  methods: {
    buscar() {
      this.getList();
    },
    onRegister(event) {
      this.getList();
      this.showModalNuevo = false;
    },
    edit(group) {
      this.itemToEdit = Object.assign({}, group);
      this.showModalEdit = true;
    },
    onUpdate(event) {
      this.getList();
      this.showModalEdit = false;
      this.itemToEdit = null;
    },
    deleteGroup(id) {
      if (confirm("Estas seguro de eliminar el grupo?")) {
        const vm = this;
        const path = this.baseUrl + "/groups/" + id;
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
      this.path = this.baseUrl + "/groups?q=" + this.textToSearch;
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
