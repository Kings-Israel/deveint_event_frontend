<template>
    <div id="register">
        <h1>Welcome to Events.com</h1>
        <div class="centerx">
            <form>
                <vs-input color="dark" type='text' label-placeholder="Name" v-model="name"/>

                <vs-input color="dark" type='email' label-placeholder="Email" v-model="email"/>
                
                <vs-input color="dark" type='password' label-placeholder="Password" v-model="password"/>

                <vs-input color="dark" type='password' label-placeholder="Confirm Password" v-model="confirmpassword"/>

                <vs-button color="primary" type="border" class="register-button" @click.prevent="register">Register</vs-button>
            </form>
        </div>
        <div id="register-link">
            <h3>Already have an account?</h3>
            <router-link class="link" to='/'>Login Here</router-link>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'Register',
    data() {
        return {
            name: '',
            email: '',
            password: '',
            confirmpassword: ''
        }
    },
    methods: {
        register() {
            if(this.password != this.confirmpassword) {
                this.$vs.notify({
                    title:'Passwords Don\'t match',
                    color: 'danger',
                    time: 5000
                })
                return
            }

            this.$store.dispatch('register', {
                "name": this.name,
                "email": this.email,
                "password": this.password
            }).then(() => {
                this.$router.push('/dashboard')
                this.$vs.notify({
                    title:'Successfully Registered',
                    color: 'success',
                    time: 5000
                })
            })

            if(this.registered === false) {
                this.$vs.notify({
                    title: 'An error occurred',
                    text: 'Please try again',
                    color: 'danger',
                    time: 8000
                })
            }
        }
    },
    computed: {
        ...mapGetters([
            'registered'
        ])
    }
}
</script>

<style scoped>

h1 {
    color: #fff
}

#register h1 {
    display: flex;
    justify-content: center;
    padding-top: 120px;
    font-family: 'Dela Gothic One', cursive;
}

.centerx {
    margin: 0 calc(44%);
}
.register-button {
    margin: 20px 65px;
}

#register-link {
    display: flex;
    justify-content: center;
}

#register-link h3 {
    color: #fff;
    padding-right: 5px;
}

#register-link > .link:hover {
    background-color: #000;
    color: #fff;
    padding: 3px;
    border-radius: 2px;
    transition: .2s ease;
}
</style>