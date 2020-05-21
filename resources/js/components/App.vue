<template>
  <v-app>

    <core-drawer />
    <core-toolbar />

    <core-view />

  </v-app>
</template>

<style lang="scss">
/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>
