<template>
    <div>
        <vs-row>
            <vs-col vs-w="7">
                <vs-table max-items="5" pagination stripe :data="myEvents">
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
                        Start Time
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
                            {{data[indextr].start_time}}
                        </vs-td>
                        <vs-td :data="data[indextr].id">
                            <vs-button type="line" color="success" @click="change(data[indextr].id)">Update</vs-button>
                            <vs-button type="line" color="danger" @click="deleteEvent(data[indextr].id)" >Delete</vs-button>
                        </vs-td>
                        </vs-tr>
                    </template>
                </vs-table>
            </vs-col>
            <vs-col vs-w="5">
                <h2>Add/Update event</h2>
                <form>
                    <vs-row>
                        <vs-col vs-w="6">
                            <input type="hidden" name="id" v-model="id">
                            <vs-input color="dark" type='text' label-placeholder="Event Name" v-model="event_name"/>

                            <vs-input color="dark" type='date' label="Event Date" v-model="event_date"/>

                            <vs-input color="dark" type='text' label-placeholder="Venue" v-model="venue"/>
                            <br>
                            <p>Event Starts At: {{start_time}}</p>
                            <div id="time-selection">
                                <vue-timepicker v-model="start_time" format="hh:mm A" close-on-complete drop-direction="up"></vue-timepicker>
                            </div>
                        </vs-col>
                        <vs-col vs-w="6">
                            <vs-textarea color="dark" label="Event Description" width="220px" height="250px" v-model="description" />
                        </vs-col>
                        <div class="submit-buttons">
                            <vs-button id="add-button" color="success" @click.prevent="addEvent" v-if="id === ''">Add</vs-button>
                            <vs-button id="add-button" color="success" @click.prevent="updateEvent" v-else>Update</vs-button>
                            <vs-button id="cancel-button" color="danger" @click="cancel">Cancel</vs-button>
                        </div>
                    </vs-row>
                </form>
            </vs-col>
        </vs-row>
    </div>
</template>

<script>
import VueTimepicker from 'vue2-timepicker'
import { mapGetters } from 'vuex'
export default {
    name: 'MyEvents',
    components: {VueTimepicker},
    data() {
        return {
            id: '',
            start_time: '',
            event_name: '',
            event_date: '',
            venue: '',
            description: '',
        }
    },
    methods: {
        // Add new Event to database
        addEvent() {
            if (this.event_name === '' || this.start_time === '' || this.event_date === '' || this.venue === '' || this.description === '') {
                this.$vs.notify({
                    title: 'Fill all fields',
                    color: 'danger',
                    time: 4000
                })
                return
            }
            this.$store.dispatch('addEvent', {
                "event_name": this.event_name,
                "event_date": this.event_date,
                "venue": this.venue,
                "start_time": this.start_time,
                "description": this.description
            }).then(() => {
                this.event_name = '',
                this.event_date = '',
                this.venue = '',
                this.start_time = '',
                this.description = ''
            })
        },
        // Update the details of an event
        updateEvent() {
            if (this.event_name === '' || this.start_time === '' || this.event_date === '' || this.venue === '' || this.description === '') {
                this.$vs.notify({
                    title: 'Fill all fields',
                    color: 'danger',
                    time: 4000
                })
                return
            }
            this.$store.dispatch('updateEvent', {
                "id": this.id,
                "event_name": this.event_name,
                "event_date": this.event_date,
                "venue": this.venue,
                "start_time": this.start_time,
                "description": this.description
            }).then(() => {
                this.id = '',
                this.event_name = '',
                this.event_date = '',
                this.venue = '',
                this.start_time = '',
                this.description = '',
                this.$vs.notify({
                    title:'Updated Event',
                    color:'success',
                    time:4000
                })
            })
        },
        // Delete an event
        deleteEvent(id) {
            this.$store.dispatch('deleteEvent', id).then(() => {
                this.$vs.notify({
                    title: 'Event Deleted',
                    color: 'success',
                    time: 4000
                })
            })
        },
        change(id) {
            let event = this.myEvents.find(event => event.id === id)
            this.id = event.id
            this.event_name = event.event_name,
            this.event_date = event.event_date,
            this.venue = event.venue,
            this.start_time = event.start_time,
            this.description = event.description
        },
        // Clear the field selection in the form
        cancel() {
            this.id = '',
            this.event_name = '',
            this.event_date = '',
            this.venue = '',
            this.start_time ='10:05:00',
            this.description = ''
        }
    },
    mounted() {
        this.$store.dispatch('getMyEvents')
    },
    computed: {
        ...mapGetters([
            'myEvents'
        ])
    }
}
</script>

<style scoped>
.submit-buttons {
    margin-left: 10px;
    padding-top: 10px;
}
#add-button {
    margin-right: 5px;
}
</style>