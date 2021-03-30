<template>
    <div>
        <vs-table max-items="5" pagination stripe :data="bookedEvents">
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
                    {{data[indextr][0].event_name}}
                </vs-td>

                <vs-td :data="data[indextr].event_date">
                    {{data[indextr][0].event_date}}
                </vs-td>

                <vs-td :data="data[indextr].venue">
                    {{data[indextr][0].venue}}
                </vs-td>
                <vs-td :data="data[indextr].id">
                    <vs-dropdown vs-custom-content>
                        <vs-button type="line" color="success">Event Desc.</vs-button>
                        <vs-dropdown-menu class="event-description">
                            <h4>Description:</h4>
                            {{ data[indextr][0].description }}
                        </vs-dropdown-menu>
                    </vs-dropdown>
                    <vs-button type="line" color="danger" @click="deleteBookedEvent(data[indextr][0].id)" >Delete</vs-button>
                </vs-td>
                </vs-tr>
                
            </template>
        </vs-table>
        
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'BookedEvents',
    methods: {
        // Delete a booked event and remove from list
        deleteBookedEvent(id) {
            console.log(id)
            this.$store.dispatch('deleteBookedEvent', id).then(() => {
            this.$vs.notify({
                title: 'Removed Event',
                color: 'success',
                time: 4000
            })
        })
        }
    },
    mounted() {
        this.$store.dispatch('getBookedEvents')
    },
    computed: {
        ...mapGetters([
            'bookedEvents'
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