<template>
    <div class="panel-wrapper">
    <span class="logo">
      <img alt=""
           src="../../images/site/ic_logo.png">
    </span>

        <div class="slogan-wrapper">
            <div class="slogan">
                <img alt=""
                     src="../../images/site/login_background.svg">
            </div>
        </div>

        <div class="panel-content">
            <v-app class="login-con">
                <!-- <v-spacer></v-spacer> -->
                <v-content>
                    <v-container fill-height
                                 fluid>
                        <v-layout align-center
                                  justify-center>
                            <v-flex class="frame">
                                <h1>
                                    {{ $t('passwords.recovery')}}
                                </h1>

                                <v-layout align-end
                                          column
                                          justify-end
                                          wrap v-if="status">
                                    <v-flex>
                                        <v-alert type="success" >
                                            <span >{{status}}</span>
                                        </v-alert>
                                    </v-flex>
                                </v-layout>
                                <form action="/password/reset" method="POST" v-if="status==undefined">
                                    <input :value="csrf_token" name="_token" type="hidden">
                                    <input type="hidden" name="token" :value="token">
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
                                    <v-text-field
                                            :append-icon="showPwd ? 'visibility_off' : 'visibility'"
                                            :label="$t('validation.attributes.password_confirmation')"
                                            :type="showPwd ? 'text' : 'password'"
                                            @click:append="showPwd = !showPwd"
                                            @keyup.enter.native="login"
                                            name="password_confirmation"
                                            prepend-icon="lock"
                                            required
                                            v-model="form.password_confirmation"
                                    ></v-text-field>
                                    <v-layout align-end
                                              column
                                              justify-end
                                              wrap>
                                        <v-flex>
                                            <v-btn :loading="loginLoading" type="submit">
                                                <span slot="loader">Loading...</span>
                                                {{ $t('passwords.recovery') }}
                                            </v-btn>
                                        </v-flex>

                                    </v-layout>
                                </form>
                                <v-layout column v-if="errors_messages!=undefined">
                                    <v-alert type="error" v-for="error in errors_messages" :key="error">
                                        {{error}}
                                    </v-alert>
                                </v-layout>
                                <v-layout column v-if="status!=undefined">
                                    <v-alert type="success" v-for="error in errors_messages" :key="error">
                                        {{status}}
                                    </v-alert>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-content>

                <v-footer color="#fbfbfb"
                          height="auto">
                    <v-layout>
                        <v-flex text-xs-center>
                            <!-- {{ ('common.copyrightMessage', { currentYear }) }} -->
                        </v-flex>
                    </v-layout>
                </v-footer>
            </v-app>
        </div>
    </div>
</template>

<script>
    //import { isMobile } from '@/utils/util';
    export default {
        props:['status','errors','token','email'],
        name: 'Login',
        data() {
            return {
                currentYear: new Date().getFullYear(),
                showPwd: false,
                form: {
                    email: this.email,
                    password: '',
                    password_confirmation: '',
                },
                errors_messages: JSON.parse(this.errors),
                loginLoading: false,
                csrf_token: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),

            };
        },
        methods: {
            login() {
                if (!this.form.password || !this.form.email || !this.form.password_confirmation
                    || this.form.password_confirmation != this.form.password || this.form.password.length < 8) {
                    return;
                }
                this.loginLoading = true;
                this.$store
                    .dispatch('login', this.form)
                    .then(() => {
                        try {
                            this.$router.push({name: 'Index'});
                        } catch (err) {
                            this.$router.push({path: '/'});
                        }
                    })
                    .catch((res) => {
                        console.log('reset-password-failed', res);
                        this.$message({
                            type: 'error',
                            text: ('common.invalid_password_username'),
                        });
                    })
                    .finally(() => {
                        this.loginLoading = false;
                    });
            },
        },
        created() {
        },
    };
</script>

<style lang="scss">
    @import '../../sass/_login.scss';
</style>