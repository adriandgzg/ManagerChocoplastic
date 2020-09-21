<template>
<v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
        <v-flex md4 sm12 lg4>
            <v-card>
                <v-card color="info" tile>
                    <chartist ratio="ct-major-second" :data="dailySalesChart.data" :options="dailySalesChart.options" type="Line" />
                </v-card>

                <v-card tile>
                    <v-card-title>Transacciones por días</v-card-title>
                    <v-card-text class="category d-inline-flex font-weight-light">
                        <v-icon color="green" small>
                            mdi-arrow-up
                        </v-icon>
                        <span class="green--text">55%</span>&nbsp;
                        increase in today's sales
                    </v-card-text>

                    <v-card-actions>
                        <v-icon class="mr-2" small>
                            mdi-clock-outline
                        </v-icon>
                        <span class="caption grey--text font-weight-light">updated 4 minutes ago</span>
                    </v-card-actions>
                </v-card>
            </v-card>
        </v-flex>
        <v-flex md4 sm12 lg4>
            <v-card>
                <v-card color="info">
                    <chartist ratio="ct-major-second" type="Bar" :data="emailsSubscriptionChart.data" :options="emailsSubscriptionChart.options" :responsive-options="emailsSubscriptionChart.responsiveOptions">
                    </chartist>
                </v-card>
                <v-card tile>
                    <v-card-title>Transacciones por mes</v-card-title>
                    <v-card-text class="category d-inline-flex font-weight-light">
                        Resultados de ultima campaña
                    </v-card-text>

                    <v-card-actions>
                        <v-icon class="mr-2" small>
                            mdi-clock-outline
                        </v-icon>
                        <span class="caption grey--text font-weight-light">updated 14 minutes ago</span>
                    </v-card-actions>
                </v-card>
            </v-card>
        </v-flex>
        <v-flex md4 sm12 lg4>
            <v-card>
                <v-card color="info">

                    <chartist ratio="ct-major-second" :data="dataCompletedTasksChart.data" :options="dataCompletedTasksChart.options" type="Line">
                    </chartist>
                </v-card>
                <v-card tile>
                    <v-card-title>Promedio por hora</v-card-title>
                    <v-card-text class="category d-inline-flex font-weight-light">
                        Resultados de ultima campaña
                    </v-card-text>

                    <v-card-actions>
                        <v-icon class="mr-2" small>
                            mdi-clock-outline
                        </v-icon>
                        <span class="caption grey--text font-weight-light">updated 14 minutes ago</span>
                    </v-card-actions>
                </v-card>
            </v-card>
        </v-flex>
        <v-flex sm6 xs6 md6 lg6>
            <v-card>
                <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                        <v-card-title class="headline">$34,245.00</v-card-title>
                        <v-card-subtitle>Ultimas 24 hrs</v-card-subtitle>
                    </div>

                    <v-icon color="info" class="ma-3" size="60" tile>mdi-currency-usd</v-icon>
                </div>
            </v-card>
        </v-flex>
        <v-flex sm6 xs6 md6 lg6>
            <v-card>
                <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                        <v-card-title class="headline">$1,325.00</v-card-title>
                        <v-card-subtitle>Transacciones canceladas</v-card-subtitle>
                    </div>

                    <v-icon color="info" class="ma-3" size="60" tile>mdi-cancel</v-icon>
                </div>
            </v-card>
        </v-flex>

    </v-layout>
</v-container>
</template>

<script>
export default {
    data() {
        return {
            dailySalesChart: {
                data: {
                    labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
                    series: [
                        [12, 17, 7, 17, 23, 18, 38]
                    ]
                },
                options: {
                    lineSmooth: this.$chartist.Interpolation.cardinal({
                        tension: 0
                    }),
                    low: 0,
                    high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                    chartPadding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }
                }
            },
            dataCompletedTasksChart: {
                data: {
                    labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
                    series: [
                        [230, 750, 450, 300, 280, 240, 200, 190]
                    ]
                },
                options: {
                    lineSmooth: this.$chartist.Interpolation.cardinal({
                        tension: 0
                    }),
                    low: 0,
                    high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                    chartPadding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }
                }
            },
            emailsSubscriptionChart: {
                data: {
                    labels: ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De'],
                    series: [
                        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

                    ]
                },
                options: {
                    axisX: {
                        showGrid: false
                    },
                    low: 0,
                    high: 1000,
                    chartPadding: {
                        top: 0,
                        right: 5,
                        bottom: 0,
                        left: 0
                    }
                },
                responsiveOptions: [
                    ['screen and (max-width: 640px)', {
                        seriesBarDistance: 5,
                        axisX: {
                            labelInterpolationFnc: function (value) {
                                return value[0]
                            }
                        }
                    }]
                ]
            },
            headers: [{
                    sortable: false,
                    text: 'ID',
                    value: 'id'
                },
                {
                    sortable: false,
                    text: 'Name',
                    value: 'name'
                },
                {
                    sortable: false,
                    text: 'Salary',
                    value: 'salary',
                    align: 'right'
                },
                {
                    sortable: false,
                    text: 'Country',
                    value: 'country',
                    align: 'right'
                },
                {
                    sortable: false,
                    text: 'City',
                    value: 'city',
                    align: 'right'
                }
            ],
            items: [{
                    name: 'Dakota Rice',
                    country: 'Niger',
                    city: 'Oud-Tunrhout',
                    salary: '$35,738'
                },
                {
                    name: 'Minerva Hooper',
                    country: 'Curaçao',
                    city: 'Sinaai-Waas',
                    salary: '$23,738'
                }, {
                    name: 'Sage Rodriguez',
                    country: 'Netherlands',
                    city: 'Overland Park',
                    salary: '$56,142'
                }, {
                    name: 'Philip Chanley',
                    country: 'Korea, South',
                    city: 'Gloucester',
                    salary: '$38,735'
                }, {
                    name: 'Doris Greene',
                    country: 'Malawi',
                    city: 'Feldkirchen in Kārnten',
                    salary: '$63,542'
                }
            ],
            tabs: 0,
            list: {
                0: false,
                1: false,
                2: false
            }
        }
    },
    methods: {
        complete(index) {
            this.list[index] = !this.list[index]
        }
    }
}
</script>
