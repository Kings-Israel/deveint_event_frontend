<template>
    <div id="dashboard">
        <vs-row vs-justify="center">
            <vs-navbar class="nabarx">
            <div slot="title">
                <vs-navbar-title>
                <h1>{{user.name}}</h1>
                </vs-navbar-title>
            </div>

            <vs-navbar-item>
                <span id="logout-link" @click="logout">Logout</span>
            </vs-navbar-item>
            </vs-navbar>
            <vs-tabs alignment="center">
                <vs-tab label="My Events">
                    <my-events />
                </vs-tab>
            <vs-tab label="Upcoming Events">
                <div>
                    <upcoming-events />
                </div>
            </vs-tab>
            <vs-tab label="Booked Events">
                <div>
                    <booked-events />
                </div>
            </vs-tab>
            </vs-tabs>
        </vs-row>
    </div>
</template>

<script>
import MyEvents from '../components/MyEvents.vue'
import UpcomingEvents from '../components/UpcomingEvents.vue'
import BookedEvents from '../components/BookedEvents.vue'
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
    name: "Dashboard",
    components: {
        MyEvents, UpcomingEvents, BookedEvents
    },
    data() {
        return {
            
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('logout').then(() => {
                this.$router.push('/')
            })
            this.$vs.notify({
                title: 'Logged Out',
                color: 'success',
                time: 3000
            })
        }
    },
    mounted() {
        
        
    },
    computed: {
        ...mapGetters([
            'user'
        ])
    },
    created() {
        axios.interceptors.response.use(undefined, (err) => {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
            axios.post('/logout')
        }
        throw(err)
        })
    }
}
</script>

<style scoped>
#dashboard {
    background-color: #fff;
    color: #000;
    margin: 0 200px;
}

#logout-link {
    padding: 5px;
    font-size: 18px;
    font-weight: 700;
}

#logout-link:hover {
    background-color: #000;
    color: #fff;
    padding: 3px;
    border-radius: 2px;
    transition: .3s ease;
    cursor: pointer;
}
</style>