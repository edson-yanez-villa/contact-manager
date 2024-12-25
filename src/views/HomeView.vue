<template>
  <div class="home">
    <ContactList
      :contacts="contacts"
      @edit-contact="editContact"
      @delete-contact="deleteContact"
    />
    <button class="btn btn-primary" @click="addContact">
      Agregar Contacto
    </button>
    <ContactForm
      v-if="showForm"
      :contact="currentContact"
      :editing="editing"
      @save-contact="saveContact"
      @cancel="cancelForm"
    />
  </div>
</template>

<script>
import ContactList from "../components/ContactList.vue";
import ContactForm from "../components/ContactForm.vue";

export default {
  name: "HomeView",
  components: {
    ContactList,
    ContactForm,
  },
  data() {
    return {
      contacts: [
        {
          id: 1,
          name: "Juan Pérez",
          email: "juan@example.com",
          address: "Calle 1",
          phone: "123456789",
          country: "Bolivia",
          city: "Cochabamba",
        },
        {
          id: 2,
          name: "Ana Gómez",
          email: "ana@example.com",
          address: "Calle 2",
          phone: "987654321",
          country: "Bolivia",
          city: "La Paz",
        },
      ],
      currentContact: {},
      editing: false,
      showForm: false,
    };
  },
  methods: {
    addContact() {
      this.currentContact = {};
      this.editing = false;
      this.showForm = true;
    },
    editContact(contact) {
      this.currentContact = contact;
      this.editing = true;
      this.showForm = true;
    },
    saveContact(contact) {
      if (this.editing) {
        const index = this.contacts.findIndex((c) => c.id === contact.id);
        if (index !== -1) {
          this.contacts.splice(index, 1, contact);
        }
      } else {
        contact.id = this.contacts.length + 1;
        this.contacts.push(contact);
      }
      this.showForm = false;
    },
    deleteContact(id) {
      this.contacts = this.contacts.filter((contact) => contact.id !== id);
    },
    cancelForm() {
      this.showForm = false;
    },
  },
};
</script>
