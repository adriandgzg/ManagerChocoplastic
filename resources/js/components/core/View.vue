<template>
  <v-content>
    <v-container fluid>
    <div id="core-view">
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </div>
    </v-container>
  </v-content>
</template>

<script>
export default {
  metaInfo () {
    return {
      title: 'GS Innovation Dashboard1'
    }
  }

}
</script>

<style>
#core-view {
  padding-bottom: 100px;
}
</style>
