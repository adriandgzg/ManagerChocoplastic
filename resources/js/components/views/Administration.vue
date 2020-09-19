<template>
<v-container>
    <v-snackbar v-model="snackbar" :timeout="timeout">{{ textMsg }}
        <v-btn color="blue" text @click="snackbar = false">Cerrar </v-btn>
    </v-snackbar>
    <v-row>
        <v-col>
            <v-data-table :headers="headers" :items="users" item-key="id" class="elevation-1">
                <template v-slot:top>
                    <v-system-bar color="indigo darken-2" dark></v-system-bar>
                    <v-toolbar flat color="indigo">
                        <template v-slot:extension>
                            <v-btn fab color="cyan accent-2" bottom left absolute @click="abrirdialog()">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </template>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>

                    </v-toolbar>
                </template>
                <template v-slot:item.action="{ item }">
                    <v-btn small icon fab color="blue" @click="editar(item)" title="Editar usuario">
                        <v-icon>mdi-account-edit</v-icon>
                    </v-btn>
                    <v-btn small icon fab color="blue" @click="editarNegocio(item)" title="Editar negocio">
                        <v-icon>mdi-store-outline</v-icon>
                    </v-btn>
                    <v-btn small icon fab color="success" @click="
            selectedModel=item;
            assignRole=true;
            selectedUser=item;
            selectedRole=item.role_id;
            " title="Asignar rol">
                        <v-icon>mdi-account-key</v-icon>
                    </v-btn>
                    <!--<v-btn small icon fab color="warning" @click="
            selectedModel=item;
            selectedPermissions=item.permissions.map(a => a.id);
            editingText=item.name;
            action=saveUserPermissions;
            editingMode=true;
            " title="Editar permisos de usuario">
                        <v-icon> mdi-pencil-lock</v-icon>
                    </v-btn>-->
                    <v-btn small icon fab color="error" title="Desactivar usuario">
                        <v-icon>mdi-account-off</v-icon>
                    </v-btn>
                </template>
            </v-data-table>
        </v-col>

    </v-row>
    <v-row>
        <v-col cols="6">
            <v-card v-if="can('role')">
                <v-list dense>
                    <v-list-item-group v-model="selectedRole" color="info">
                        <v-card-title>Roles</v-card-title>
                        <v-card-subtitle v-if="selectedUser" v-text="selectedUser.name" />
                        <v-list-item two-line v-for="role in roles" :key="role.id" :value="role.id" @click="
              selectedModel=role;
              selectedPermissions=role.permissions.map(a => a.id);
              editingText=role.name;
              editingMode=false;">
                            <v-list-item-content>
                                <v-list-item-title v-text="role.name" />
                                <v-list-item-subtitle v-text="role.description" />
                            </v-list-item-content>
                            <v-list-item-icon>
                                <v-btn color="warning" icon @click.stop="
              selectedModel=role;
              selectedPermissions=role.permissions.map(a => a.id);
              editingText=role.name;
              editingMode=true;
              action=saveRolePermissions" title="Editar permisos de role">
                                    <v-icon>mdi-pencil-lock</v-icon>
                                </v-btn>
                                <v-btn color="error" icon title="Eliminar role">
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </v-list-item-icon>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
                <v-card-actions v-if="assignRole">
                    <v-btn text color="success" @click="saveUserRole">Asignar</v-btn>
                    <v-btn text color="error" @click="assignRole=false;  selectedUser=null">Cancelar</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
        <v-col>
            <v-card v-if="can('permission')">
                <v-card-title>Permisos</v-card-title>
                <v-card-subtitle v-text="editingText" />
                <v-treeview dense v-model="selectedPermissions" :items="permissions" selection-type="independent" selectable open-on-click open-all item-key="id" item-text="description" item-children="permissions" />
                <v-card-actions v-if="editingMode">
                    <v-btn color="success" text @click="action">Guardar</v-btn>
                    <v-btn color="error" text @click="editingText='';editingMode=false;selectedPermissions=[]">Cancelar</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
    <!--  Modal del diálogo para Alta y Edicion    -->
    <v-dialog v-model="dialog" max-width="640px" persistent>
        <template v-slot:activator="{ on }"></template>
        <v-card>
            <!-- para el EDICION-->
            <v-card-title class="cyan white--text">
                <span class="headline">Administración</span>
            </v-card-title>
            <v-card-text>
                <v-text-field v-model="editado.name" label="Nombre"></v-text-field>
                <v-text-field v-model="editado.email" label="Correo Electrónico"></v-text-field>
                <v-text-field v-model="editado.password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :type="show ? 'text' : 'password'" @click:append="show = !show" label="Contraseña"></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-grey" class="ma-2 white--text" @click="cancelar">
                    Cancelar
                </v-btn>
                <v-btn color="teal accent-4" class="ma-2 white--text" @click="guardar">
                    Guardar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <!--FIN-->
    <!--  Modal del diálogo para Alta y Edicion    -->
    <v-dialog v-model="dialogNegocio" max-width="640px">
        <template v-slot:activator="{ on }"></template>
        <v-card>
            <!-- para el EDICION-->
            <v-card-title class="cyan white--text">
                <span class="headline">Administración</span>
            </v-card-title>
            <v-card-text>
                <v-checkbox v-model="editadoBusiness.checkB" label="Asignar negocio"></v-checkbox>

                <v-select :items="stores" v-model="selectStore" label="Seleccione una tienda" single-line item-text="stor_name" item-value="stor_pk" return-object persistent-hint></v-select>

            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-grey" class="ma-2 white--text" @click="cancelarNegocio">
                    Cancelar
                </v-btn>
                <v-btn color="teal accent-4" class="ma-2 white--text" @click="guardarNegocio">
                    Guardar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <!--FIN-->
</v-container>
</template>

<script>
import {
    mapGetters
} from "vuex";
import CripNotice from "crip-vue-notice";
export default {
    data() {
        return {
            headers: [{
                text: 'ID',
                value: 'id'
            }, {
                text: 'Nombre',
                value: 'name'
            }, {
                text: 'Correo',
                value: 'email'
            }, {
                text: 'Perfil',
                value: 'role.name'
            }, {
                text: '',
                value: 'action'
            }, ],
            show: false,
            users: [],
            user: [],
            roles: [],
            permissions: [],
            selectedPermissions: [],
            errors: [],
            editingText: '',
            editingMode: false,
            action: null,
            selectedModel: null,
            selectedRole: null,
            selectedUser: null,
            assignRole: false,
            dialog: false,
            dialogNegocio: false,
            snackbar: false,
            textMsg: '',
            timeout: 2000,
            idAdminBusiness: 0,
            selectStore: 0,
            stores: '',
            editado: {
                id: '',
                name: '',
                email: '',
                password: '',
            },
            editadoTemp: {
                id: '',
                name: '',
                email: '',
                password: '',
            },
            editadoDefault: {
                id: '',
                name: '',
                email: '',
                password: '',
            },
            editadoBusiness: {
                id: '',
                name: '',
                email: '',
                password: '',
                checkB: false,
                idBusiness: 0,
            },
            business: [],
            selectBusiness: '',
        }
    },
    created() {
        this.getUser();
        this.getUsers();
        this.getRoles();
        this.getPermissions();
        this.getstores();
    },
    methods: {
        abrirdialog() {
            this.editado = this.editadoTemp;
            this.dialog = true;
            this.editado.email = '';
            console.log(this.editado)
        },
        getstores() {
            axios.get('/storeget')
                .then(response => {
                    this.stores = response.data.data
                    console.log(this.stores)
                })
                .catch(e => {
                    this.errors.push(e)
                })
        },
        getUser() {
            axios.get('/listUser')
                .then(response => {
                    this.user = response.data.data
                })
                .catch(e => {
                    console.log(e);
                })
        },
        getBusiness(idStore) {

            if (!idStore) {
                idStore = 0;
            }

            axios.get('/getBusiness/' + idStore)
                .then(response => {
                    this.business = response.data.data
                    console.log(this.business)
                })
                .catch(e => {
                    console.log(e);
                })
        },
        changeBusiness(a) {

            this.getBusiness(a)

        },
        getUserBusiness($id) {
            axios.get('/usuarioBusiness/' + $id)
                .then(response => {
                    this.idAdminBusiness = response.data.data.store_id

                    console.log(this.idAdminBusiness)
                    if (this.idAdminBusiness == 0)
                        this.editadoBusiness.checkB = false
                    else {
                        this.editadoBusiness.checkB = true
                        this.selectStore = this.idAdminBusiness
                    }

                    this.dialogNegocio = true

                })
                .catch(e => {
                    console.log(e);
                })
        },
        saveUserRole() {
            axios.post('/admins/' + this.selectedUser.id + '/role', {
                    'role_id': this.selectedRole
                })
                .then(response => {
                    //Vue.set(this.users, this.users.indexOf(this.users.find(item => item.id === this.selectedUser.id)), response.data.data);
                    this.users.splice(this.users.indexOf(this.users.find(item => item.id === this.selectedUser.id)), 1, response.data.data)
                    this.assignRole = false;
                    this.selectedUser = null;
                    this.selectedRole = false;
                })
                .catch(e => {
                    this.errors.push(e)
                });
        },
        saveUserPermissions() {
            axios.post('/admins/' + this.selectedModel.id + '/permissions', this.selectedPermissions)
                .then(response => {
                    this.users.splice(this.users.indexOf(this.users.find(item => item.id === this.selectedModel.id)), 1, response.data.data)
                })
                .catch(e => {
                    this.errors.push(e)
                });
            this.editingMode = false;
        },
        saveRolePermissions() {
            axios.post('/roles/' + this.selectedModel.id + '/permissions', this.selectedPermissions)
                .then(response => {
                    this.roles.splice(this.users.indexOf(this.users.find(item => item.id === this.selectedModel.id)), 1, response.data.data)
                })
                .catch(e => {
                    this.errors.push(e)
                })
            this.editingMode = false;
        },
        getUsers() {
            axios.get('/users')
                .then(response => {
                    this.users = response.data.data
                })
                .catch(e => {
                    this.errors.push(e)
                })
        },

        getRoles() {
            axios.get('/roles')
                .then(response => {
                    this.roles = response.data.data
                })
                .catch(e => {
                    this.errors.push(e)
                })
        },
        getPermissions() {
            axios.get('/permissions')
                .then(response => {
                    this.permissions = response.data.data
                })
                .catch(e => {
                    this.errors.push(e)
                })
        },
        cancelar() {
            this.dialog = false
            this.editado = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
        },
        guardar() {
            if (this.editedIndex > -1) {
                //Guarda en caso de Edición
                this.textMsg = '¡Actualización Exitosa!'
                this.snackbar = true
                this.editarAdmin()
                this.cancelar()
            } else {
                //Guarda el registro en caso de Alta            
                this.textMsg = '¡Alta exitosa!'
                this.snackbar = true
                this.addAdmin()
                this.cancelar()
            }
            this.cancelar()
        },
        editar(item) {
            this.editedIndex = this.users.indexOf(item)
            this.editadoTemp = Object.assign({}, item)

            this.editado.id = this.editadoTemp.id
            this.editado.name = this.editadoTemp.name
            this.editado.email = this.editadoTemp.email
            this.editado.password = ''

            console.log(this.editado)
            this.dialog = true
        },

        editarNegocio(item) {
            this.editedIndex = this.users.indexOf(item)
            this.editadoTemp = Object.assign({}, item)
            this.getUserBusiness(this.editadoTemp.id)
            this.editadoBusiness.id = this.editadoTemp.id
            this.editadoBusiness.name = this.editadoTemp.name
            this.editadoBusiness.email = this.editadoTemp.email
            this.editadoBusiness.password = ''

        },
        cancelarNegocio() {
            this.dialogNegocio = false
            this.editado = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
        },
        guardarNegocio() {
            this.editarBusAdmin()
            this.cancelarNegocio()
        },
        //Procedimiento Alta de moviles.
        addAdmin: function () {
            axios.post('/admin/add', this.editado).then(response => {
                this.getUsers();
            });
        },
        editarAdmin: function () {
            console.log(this.editado)
            axios.put('/admin/update', this.editado).then(response => {
                this.getUsers();
            });
        },
        editarBusAdmin: function () {
            if (this.editadoBusiness.checkB)
                this.editadoBusiness.idBusiness = this.selectStore.stor_pk
            else
                this.editadoBusiness.idBusiness = 0

            console.log(this.editadoBusiness)
            axios.put('/admin/updateBusiness', this.editadoBusiness).then(response => {
                this.normal('Notificación', '¡Actualizado correctamente!', "success");
            });
        },
        normal(Title, Description, Type) {
            this.notice = new CripNotice({
                title: Title,
                description: Description,
                className: "open-normal",
                closable: true,
                duration: 3,
                type: Type,
            })
        },
    },
    computed: {
        ...mapGetters('auth', ['can'])
    },
}
</script>
