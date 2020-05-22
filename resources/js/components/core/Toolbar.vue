<template>
  <div>
    <v-app-bar
            app
    id="core-toolbar"

    style="background: #F2436D;"
  >
    <div class="v-toolbar-title">
      <v-toolbar-title
        
      >
        <v-btn
          class="default v-btn--simple"
          light
          icon
          @click.stop="onClickBtn"
        >
          <v-icon>mdi-view-list</v-icon>
        </v-btn>
        {{ title }}
      </v-toolbar-title>
    </div>

    <v-spacer />
    <v-toolbar-items>
      <v-flex
        align-center
        layout
        py-2
      >
        <!--<v-text-field
          v-if="responsiveInput"
          class="mr-4 mt-2 purple-input"
          label="Search..."
          hide-details
          color="white"
        />-->
        <router-link
          v-ripple
          class="toolbar-items"
          to="/dashboard"
        >
          <v-icon color="white">mdi-view-dashboard</v-icon>
        </router-link>
        <v-menu open-on-hover
          bottom
          left
          offset-y
          transition="slide-y-transition">
          <template v-slot:activator="{ on }">
            <v-btn
                    color="tertiary"
                    icon
                    v-on="on"
            >
                <v-badge color="error">
                    <template slot="badge">
                        {{ notifications.length }}

                    </template>
                    <v-icon color="white">mdi-bell</v-icon>
              </v-badge>
            </v-btn>
          </template>

            <v-list dense>
              <v-list-item
                v-for="notification in notifications"
                :key="notification"
                @click="onClick"
              >
                <v-list-item-title
                  v-text="notification"
                />
              </v-list-item>
            </v-list>
        </v-menu>
          <!-- <router-link
             v-ripple
             class="toolbar-items"
             to="/user-profile"
           >
             <v-icon color="white">mdi-account</v-icon>
           </router-link>-->
      </v-flex>
    </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>

    import {mapMutations} from 'vuex'

    export default {
        data: () => ({
            notifications: [],
            title: null,
            responsive: false,
            responsiveInput: false
        }),

        watch: {
            '$route'(val) {
      this.title = val.name
    }
  },

  mounted () {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },

  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    onClickBtn () {
      this.setDrawer(!this.$store.state.app.drawer)
    },
    onClick () {
      //
    },
    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.responsive = true
        this.responsiveInput = false
      } else {
        this.responsive = false
        this.responsiveInput = true
      }
    }
  }
}
</script>

<style>
  #core-toolbar a {
    text-decoration: none;
  }
</style>
