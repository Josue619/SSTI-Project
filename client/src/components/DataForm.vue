<template>
  <transition
    name="modal-fade"
    tabIndex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-backdrop">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal Actions</h5>
            <button
              type="button"
              class="close btn-danger"
              @click="close"
              aria-label="Close modal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <div class="form-row justify-content-center">
              <form @submit.prevent="onSubmit">
                <div class="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="user.name"
                    required
                  />
                </div>

                <div class="form-group">
                  <label>Age</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="user.age"
                    required
                    min="0"
                  />
                </div>

                <div class="form-group">
                  <label>Sex</label>
                  <select class="form-control" v-model="user.sex" required>
                    <option>F</option>
                    <option>M</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Birthdate</label>
                  <datepicker
                    v-model="user.birthdate"
                    name="birthdate"
                  ></datepicker>
                </div>

                <div class="form-group">
                  <label>Married</label>
                  <br />
                  <input type="radio" value="true" v-model="user.married" />
                  <label for="uno">True</label>
                  <br />
                  <input type="radio" value="false" v-model="user.married" />
                  <label for="Dos">False</label>
                </div>

                <div class="form-group">
                  <button class="btn btn-primary btn-block">Save User</button>
                  <button id="dataForm" @click="loadData()" hidden></button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import moment from "moment";
import Datepicker from "vuejs-datepicker";
import Service from "../services/mainService";
import Swal from "sweetalert2";

export default {
  components: {
    Datepicker,
  },

  /*   props: {
    dataS: null,
  }, */

  data() {
    return {
      id: "",
      data: "",
      edit: false,
      oldData: {},
      user: {
        name: "",
        age: 0,
        sex: "",
        birthdate: new Date(),
        married: false,
      },
    };
  },

  created() {},

  methods: {
    onSubmit() {
      if (this.edit) {
        this.user.birthdate = moment(this.user.birthdate).format("DD/MM/YY");
        Service.update(this.id, this.user);
        this.showModalError();
        this.controlData();
      } else {
        this.user.birthdate = moment(this.user.birthdate).format("DD/MM/YY");
        Service.create(this.user);
        this.controlData();
      }
    },

    controlData() {
      this.clearData();
      this.close();
    },

    loadData(data) {
      const dataO = Object.assign({}, data);
      this.oldData = Service.getData(dataO);
      this.user = Service.getData(dataO);
      this.id = dataO.key;
      this.edit = true;
    },

    clearData() {
      (this.data = ""),
        (this.edit = false),
        (this.user.name = ""),
        (this.user.age = 0),
        (this.user.sex = "");
      (this.user.birthdate = new Date()), (this.user.married = false);
    },

    close() {
      this.clearData();
      this.$emit("close");
    },

    showModalError() {
      const msj = Service.validateChange(this.user, this.oldData);
    
      if (msj != "Changes detected: ") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: msj,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    },
  },
};
</script>

<style>
.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.3);
  display: block;
}

.btn-close {
  border: none;
  font-size: 20px;
  padding: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}
</style>