<template>
  <div class="panel-wrapper">
    <span class="logo">
      <img alt src="../../images/logo_chocoplastic_miniatura.png?v=3" />
    </span>

    <div class="slogan-wrapper">
      <div class="slogan">
        <img alt src="../../images/logo_chocoplastic.png?v=3" />
      </div>
    </div>

    <div class="panel-content">
      <v-app class="login-con">
        <!-- <v-spacer></v-spacer> -->
        <v-content>
          <v-container fill-height fluid>
            <v-layout align-center justify-center>
              <v-flex class="frame">
                <h1>{{ $t('auth.login')}}</h1>
                <form action="login" method="POST">
                  <input :value="csrf_token" name="_token" type="hidden" />
                  <v-text-field
                    :label="$t('validation.attributes.email')"
                    @keyup.enter.native="login"
                    clearable
                    name="email"
                    prepend-icon="person"
                    required
                    v-model="form.email"
                  ></v-text-field>
                  <v-text-field
                    :append-icon="showPwd ? 'visibility_off' : 'visibility'"
                    :label="$t('validation.attributes.password')"
                    :type="showPwd ? 'text' : 'password'"
                    @click:append="showPwd = !showPwd"
                    @keyup.enter.native="login"
                    name="password"
                    prepend-icon="lock"
                    required
                    v-model="form.password"
                  ></v-text-field>
                  <v-layout align-end column justify-end wrap>
   
                    <v-flex>
                      <v-btn :loading="loginLoading" type="submit">
                        <span slot="loader">Loading...</span>
                        {{ $t('auth.login2') }}
                      </v-btn>
                    </v-flex>
                    <v-flex>
                      <v-label v-if="error" class="danger">
                        <span>{{error}}</span>
                      </v-label>
                    </v-flex>
                  </v-layout>
                </form>
              </v-flex>
            </v-layout>
          </v-container>
        </v-content>


      </v-app>
    </div>
  </div>
</template>

<script>
//import { isMobile } from '@/utils/util';
export default {
  props: ["error"],
  name: "Login",
  data() {
    return {
      currentYear: new Date().getFullYear(),
      showPwd: false,
      form: {
        username: "",
        password: ""
      },
      loginLoading: false,
      csrf_token: document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content")
    };
  },
  computed: {
    isMobile() {
      // return isMobile();
    }
  },
  methods: {
    login() {
      if (!this.form.password || !this.form.username) {
        return;
      }
      this.loginLoading = true;
      this.$store
        .dispatch("login", this.form)
        .then(() => {
          try {
            this.$router.push({ name: "Index" });
          } catch (err) {
            this.$router.push({ path: "/" });
          }
        })
        .catch(res => {
          console.log("login-failed", res);
          this.$message({
            type: "error",
            text: "common.invalid_password_username"
          });
        })
        .finally(() => {
          this.loginLoading = false;
        });
    },
    redirectForgotPassword() {
      console.log("redirectForgotPassword");
      this.$message({
        type: "info",
        text: "Ahem: Please add redirect function"
      });
    }
  },
  created() {
     this.$store.commit('auth/updateUser', null);
  }
};
</script>

<style lang="scss">
@import "../../sass/_login.scss";
</style>