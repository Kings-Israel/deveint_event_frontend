import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        registered: null,
        loggedIn: null,
        user: {},
        myEvents: [],
        allEvents: [],
        bookedEvents: [],
    },
    mutations: {
        REGISTER_SUCCESS(state) {
            state.registered = true
        },
        REGISTER_FAILED(state) {
            state.registered = false
        },
        AUTH_SUCCESS(state) {
            state.loggedIn = true
        },
        AUTH_FAILED(state) {
            state.loggedIn = false
        },
        USER_INFO(state, user) {
            state.user = user
        },
        ADD_EVENT(state, event) {
            state.myEvents.unshift(event);
        },
        UPDATE_EVENT(state, events) {
            state.myEvents = events.reverse()
        },
        MY_EVENTS(state, myEvents) {
            state.myEvents = myEvents.reverse()
        },
        ALL_EVENTS(state, events) {
            state.allEvents = events
        },
        DELETE_EVENT(state, event) {
            let index = state.myEvents.findIndex(item => item.id === event.id)
            state.myEvents.splice(index, 1)
        },
        BOOKED_EVENTS(state, events) {
            let bookedEvents = JSON.parse(events)
            state.bookedEvents = bookedEvents
        },
        DELETE_BOOKED_EVENT(state, id) {
            let index = state.bookedEvents.findIndex(item => item[0].id === id)
            state.bookedEvents.splice(index, 1)
        },
        LOGOUT(state) {
            state.loggedIn = null
        }
    },
    actions: {
        register({commit}, user) {
            return new Promise((resolve, reject) => {
                axios.get('/sanctum/csrf-cookie').then(() => {
                    axios.post('/register', user).then(response => {
                        commit('REGISTER_SUCCESS')
                        const token = 'loggedIn'
                        localStorage.setItem('token', token)
                        resolve(response)
                    }).then(() => {
                        axios.get('/api/user').then(response => {
                            commit('USER_INFO', response.data)
                        })
                    })
                    .catch(err => {
                        commit('REGISTER_FAILED')
                        commit('LOGOUT')
                        reject(err)
                    })
                })
            })
        },
        login({commit}, user) {
            return new Promise((resolve, reject) => 
                axios.post('/login', user).then(response => {
                    commit('AUTH_SUCCESS')
                    const token = 'loggedIn'
                    localStorage.setItem('token', token)
                    resolve(response)
                }).then(() => {
                    axios.get('/api/user').then(response => {
                        commit('USER_INFO', response.data)
                    })
                })
                .catch(err => {
                    commit('AUTH_FAILED')
                    localStorage.removeItem('token')
                    reject(err)
                })
            )
        },
        logout({commit}) {
            axios.post('/logout').then(() => {
                commit('LOGOUT')
            })
            localStorage.removeItem('token')
        },
        getMyEvents({commit}) {
            axios.get('/api/events/me').then(response => {
                commit('MY_EVENTS', response.data.events)
            }).catch(err => {
                console.log(err)
            })
        },
        getAllEvents({commit}) {
            axios.get('/api/events/all').then(response => {
                commit('ALL_EVENTS', response.data.events)
            }).catch(err => {
                console.log(err)
            })
        },
        addEvent({commit}, event) {
            axios.post('/api/event/add', event).then(() => {
                commit('ADD_EVENT', event)
            }).catch(err => {
                console.log(err)
            })
        },
        updateEvent({commit}, event) {
            axios.post('/api/event/update', event).then((response) => {
                commit('UPDATE_EVENT', response.data.events)
            }).catch(err => {
                console.log(err)
            })
        },
        deleteEvent({commit}, event) {
            console.log(event)
            axios.delete(`/api/event/delete/${event}`).then(() => {
                commit('DELETE_EVENT', event)
            }).catch(err => {
                console.log(err)
            })
        },
        getBookedEvents({commit}) {
            axios.get('/api/events/booked').then(response => {
                commit('BOOKED_EVENTS', response.data.events)
            }).catch(err => {
                console.log(err)
            })
        },
        deleteBookedEvent({commit}, id) {
            axios.delete(`/api/events/booked/delete/${id}`).then(() => {
                commit('DELETE_BOOKED_EVENT', id)
            }).catch((err) => {
                console.log(err)
            })
        }
    },
    getters: {
        registered: state => state.registered,
        user: state => state.user,
        loggedIn: state => state.loggedIn,
        myEvents: state => state.myEvents,
        allEvents: state => state.allEvents,
        bookedEvents: state => state.bookedEvents,
    }
})