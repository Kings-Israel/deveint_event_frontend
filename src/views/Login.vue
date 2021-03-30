<template>
    <div id="login">
        <h1>Welcome to Events.com</h1>
        <div class="centerx">
            <form>
                <vs-input color="dark" type='email' label-placeholder="Email" v-model="email"/>
                
                <vs-input color="dark" type='password' label-placeholder="Password" v-model="password"/>
                
                <vs-button color="primary" class="login-button" @click.prevent="login">Login</vs-button>
            </form>

        </div>
        <div id="login-link">
            <h3>Don't have an account?</h3>
            <router-link class="link" to='/register'>Register Here</router-link>
        </div>
        <div class="error" v-if="loggedIn === false">
            <p>Invalid email or password</p>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: "Login",
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login() {
            this.$store.dispatch('login', {
                "email": this.email,
                "password": this.password
            }).then(() => {
                if (this.loggedIn) {
                    this.$router.push('/dashboard')
                    this.$vs.notify({
                        title:'Successful Login',
                        color:'success',
                        time:4000
                    })
                } 
            })
        }
    },
    computed: {
        ...mapGetters([
            'loggedIn'
        ])
    }
}
</script>

<style scoped>

h1 {
    color: #fff
}

#login h1 {
    display: flex;
    justify-content: center;
    padding-top: 150px;
    font-family: 'Dela Gothic One', cursive;
}

.centerx {
    margin: 0 calc(44%);
}
.login-button {
    margin: 20px 70px;
}

#login-link {
    display: flex;
    justify-content: center;
}

#login-link h3 {
    color: #fff;
    padding-right: 5px;
}

#login-link > .link:hover {
    background-color: #000;
    color: #fff;
    padding: 3px;
    border-radius: 2px;
    transition: .2s ease;
}
.error {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    color: red;
    font-size: 20px;
}
</style>