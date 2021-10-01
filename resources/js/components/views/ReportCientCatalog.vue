<template>
  <v-container>
    <v-alert
      v-model="alert"
      dismissible
      transition="fade-transition"
      type="info"
      timeout="5000"
      >{{ textMsg }}</v-alert
    >
    <v-row>
      <v-col>
        <v-card justify="end">
          <v-btn
            color="success"
            class="mr-4"
            @click="GenerarReporte"
            >Generar</v-btn
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      enabledStore: false,
      menu1: false,
      menu2: false,
      textMsg: "",
      alert: false,
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    getUsers() {

       this.users = this.$store.getters['auth/user']
       if (this.users.store_id > 0) {
          this.enabledStore = true;
          this.select_stores = this.users.store_id;
       } else {
          this.enabledStore = false;
       }

    },


    GenerarReporte() {
      axios;

      window.open(
        "http://3.217.161.164:777/?pRep=3" +
        "&pUser_PK=" +
         this.users.id,
        "_blank"
      );
    },
    hide_alert: function (event) {
      console.log("Hide");
      // `event` is the native DOM event
      window.setInterval(() => {
        this.alert = false;
      }, 7000);
    },
  },
  mounted: function () {
    if (alert) {
      this.hide_alert();
    }
  },
};
</script> 