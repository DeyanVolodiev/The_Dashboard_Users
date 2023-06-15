/* eslint-disable no-console */
import axios from 'axios'

export const state = () => ({
  currentApp: {}
})

export const actions = {
  async loadCurrentApp (context, payload) {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/apps/${payload}`
      )
      context.commit('setCurrentApp', data)
    //   return data
    } catch (err) {
      console.error('Failed to load app.')
      console.error(err)
    }
  }
}

export const mutations = {
  setCurrentApp (state, data) {
    state.currentApp = data
  }
}
