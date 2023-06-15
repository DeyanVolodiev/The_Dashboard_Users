<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="d-flex flex-row">
    <v-card outlined shaped class="flex-grow-1 mr-2">
      <v-simple-table>
        <template #default>
          <thead>
            <tr>
              <th class="text-left">
                Title
              </th>
              <th class="text-left">
                Users
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="app in apps"
              :key="app.name"
              :class="{ 'selected': (currentApp.key == app.key ) }"
              @click="selectApp(app)"
            >
              <td>{{ app.title }}</td>
              <td>{{ app.userCount }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>

    <v-card outlined shaped class="flex-grow-1 mr-2">
      <div class="pa-2">
        App details
      </div>
      <div v-if="!isHidden" class="pa-2">
        <span>{{ currentApp.description }}</span>
        <tr>
          <span>
            Users
          </span>
          <span
            class="align-end"
            :style="{ color : (getPercentageColor(currentApp.totalUsers, currentApp.userLimit))}"
            v-text="` ${currentApp.totalUsers } out of ${ currentApp.userLimit }`"
          />
        </tr>
        <tr>
          <span>
            Usage
          </span>
          <span
            class="align-end"
            :style="{ color : getPercentageColor(currentApp.usage, currentApp.usageLimit)}"
            v-text="`${ currentApp.usage } out of ${ currentApp.usageLimit }`"
          />
        </tr>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      isHidden: true
    }
  },

  computed: {
    ...mapState('Apps', ['apps']),
    ...mapState('CurrentApp', ['currentApp'])
  },

  mounted () {
    this.$store.dispatch('Apps/loadApps')
  },

  methods: {
    selectApp (app) {
      const parsedObj = JSON.parse(JSON.stringify(app))
      this.$store.dispatch('CurrentApp/loadCurrentApp', parsedObj.key)
        .then((result) => {
          this.currentApp = result
          this.isHidden = false
        })
    },
    getPercentageColor (x, y) {
      const percentage = (x / y) * 100
      if (percentage < 70) {
        return 'green'
      } else if (percentage >= 70 && percentage < 90) {
        return 'yellow'
      } else {
        return 'red'
      }
    }
  }
}
</script>

<style scoped>
tbody tr {
  cursor: pointer;
}
</style>
