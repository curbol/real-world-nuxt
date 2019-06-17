import EventService from '@/services/EventService.js'

export default {
  state() {
    return {
      events: [],
      event: {}
    }
  },
  mutations: {
    setEvents(state, events) {
      state.events = events
    },
    setEvent(state, event) {
      state.event = event
    }
  },
  actions: {
    async fetchEvents({ commit }) {
      const { data: events } = await EventService.getEvents()
      commit('setEvents', events)
    },
    async fetchEvent({ commit, getters }, id) {
      const event =
        getters.getEventById(id) || (await EventService.getEvent(id)).data
      commit('setEvent', event)
    }
  },
  getters: {
    getEventById: state => id => state.events.find(event => event.id === id)
  }
}
