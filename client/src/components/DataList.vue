<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="form-inline d-flex justify-content-end">
          <button
            type="button"
            class="btn btn-success my-2 mr-sm-0"
            @click="showModal"
          >
            Crear Data
          </button>
        </div>
        <h4>List Users</h4>
        <table class="table table-striped" border="1">
          <thead class="thead-dark">
            <tr>
              <th>Data String</th>
              <th scope="col" class="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in dataStrings" :key="data.id">
              <td>{{ data.data }}</td>
              <td class="text-center">
                <button
                  class="btn btn-outline-info mr-sm-2"
                  @click="click(data)"
                >
                  Editar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <data-form v-show="isModalVisible" @close="closeModal" ref="DataForm" />
  </div>
</template>

<script>
import Service from "../services/mainService";
import DataForm from "./DataForm";

export default {
  components: { DataForm },

  data() {
    return {
      dataS: null,
      dataStrings: [],
      isModalVisible: false,
    };
  },
  created() {
    this.dataStrings = Service.getAll();
  },

  methods: {
    loadData(data) {
      this.showModal();
      this.dataS = data;
      this.dataS = Service.getData(this.dataS);
      this.click();
    },

    click: function (data) {
      this.showModal();
      this.$refs.DataForm.loadData(data);
    },

    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>

<style>
.btn-primary {
  margin-right: 12px;
}
</style>