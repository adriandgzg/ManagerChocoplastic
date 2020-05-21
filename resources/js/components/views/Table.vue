<template>
    <v-container
            fill-height
            fluid
            grid-list-xl
    >
        <v-layout
                justify-center
                wrap
        >
            <v-flex
                    md12
            >
                <material-card
                        color="green"
                        text="Here is a subtitle for this table"
                        title="Simple Table"
                >
                    <v-data-table
                            :headers="headers"
                            :items="items"
                            hide-default-footer
                    >
                        <template
                                slot="headerCell"
                                slot-scope="{ header }"
                        >
              <span
                      class="subheading font-weight-light text-success text--darken-3"
                      v-text="header.text"
              />
                        </template>
                        <template
                                slot="items"
                                slot-scope="{ item }"
                        >
                            <td>{{ item.name }}</td>
                            <td>{{ item.country }}</td>
                            <td>{{ item.city }}</td>
                            <td class="text-xs-right">{{ item.salary }}</td>
                        </template>
                    </v-data-table>
                </material-card>
            </v-flex>
            <v-flex
                    md12
            >
                <material-card
                        color="green"
                        flat
                        full-width
                        text="Here is a subtitle for this table"
                        title="Table on Plain Background"
                >
                    <v-data-table
                            :headers="headers"
                            :items="items.slice(0, 7)"
                            hide-default-footer
                    >
                        <template
                                slot="headerCell"
                                slot-scope="{ header }"
                        >
              <span
                      class="subheading font-weight-light text--darken-3"
                      v-text="header.text"
              />
                        </template>
                        <template
                                slot="items"
                                slot-scope="{ item }"
                        >
                            <td>{{ item.name }}</td>
                            <td>{{ item.description }}</td>
                            <td>{{ item.profession_id}}</td>
                            <td class="text-xs-right">{{ item.user_id }}</td>
                        </template>
                    </v-data-table>
                </material-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data: () => ({
            headers: [
                {
                    sortable: false,
                    text: 'Nombre',
                    value: 'name'
                },
                {
                    sortable: false,
                    text: 'Descripción',
                    value: 'description'
                },
                {
                    sortable: false,
                    text: 'Categoría',
                    value: 'profession_id'
                },
                {
                    sortable: false,
                    text: 'User',
                    value: 'user_id',
                    align: 'right'
                }
            ],
            items: []
        }),
        beforeMount() {
            axios
                .get('/api/projects')
                .then(response => (this.user = response.data))
        }
    }
</script>
