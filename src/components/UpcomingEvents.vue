<template>
    <div>
        <vs-table max-items="5" pagination stripe :data="events">
            <template slot="thead">
                <vs-th>
                Name
                </vs-th>
                <vs-th>
                Date
                </vs-th>
                <vs-th>
                Venue
                </vs-th>
                <vs-th>
                Action
                </vs-th>
            </template>

            <template slot-scope="{data}">
                <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
                <vs-td :data="data[indextr].event_name">
                    {{data[indextr].event_name}}
                </vs-td>

                <vs-td :data="data[indextr].event_date">
                    {{data[indextr].event_date}}
                </vs-td>

                <vs-td :data="data[indextr].venue">
                    {{data[indextr].venue}}
                </vs-td>
                <vs-td :data="data[indextr].id">
                    <vs-dropdown vs-custom-content>
                        <vs-button type="line" color="success">Event Desc.</vs-button>
                        <vs-dropdown-menu class="event-description">
                            <h4>Description:</h4>
                            {{ data[indextr].description }}
                        </vs-dropdown-menu>
                    </vs-dropdown>
                    <vs-button type="line" color="dark" @click="bookEvent(data[indextr].id)" >Book Space</vs-button>
                </vs-td>
                </vs-tr>
                
            </template>
        </vs-table>
        
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
    name: 'UpcomingEvents',
    data() {
        return {
             events: []
        }
    },
    methods: {
        // Book a space in the evennt
        bookEvent(id) {
            axios.post('/api/event/book', {'id':id}).then((response) => {
                this.$vs.notify({
                    title: response.data.success,
                    color: 'success',
                    time: 4000
                })
            }).catch(err => {
                console.log(err)
            })
        },
        // Filter to show the other user's events
        getEvents() {
            this.allEvents.forEach(event => {
                if(event.user_id != this.user.id){
                    this.events.push(event)
                }
            });
        }
    },
    mounted() {
        this.$store.dispatch('getAllEvents')
        this.getEvents()
    },
    computed: {
        ...mapGetters([
            'allEvents', 'user'
        ])
    }
}
</script>

<style scoped>
.event-description {
    width: 200px;
    padding: 5px;
}
</style>