import { createStore } from 'vuex'
import axios from 'axios'

// Vuex para criação de "global state" da aplicação
export default createStore({
    state() {
        return {
            menuVisible: true,
            user: null
        }
    },
    // {mutations} -> métodos para manipulação do estado
    mutations: {
        toggleMenu(state, visible) {
            if (!state.user) {
                state.menuVisible = false
                return
            }

            if (visible === undefined) {
                state.menuVisible = !state.menuVisible
            }
            else {
                state.menuVisible = visible
            }
        },
        setUser(state, user) {
            state.user = user
            if (user) {
                axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
                state.menuVisible = true
            } else {
                delete axios.defaults.headers.common['Authorization']
                state.menuVisible = false
            }
        }
    }
})