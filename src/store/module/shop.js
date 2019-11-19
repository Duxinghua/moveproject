
export default {
    namespaced: true,
    state: {
        scrollTop: 0,
        addressData:{}
    },
    mutations: {
        saveTabList(state, payload) {
            state.scrollTop = 0;
        },
        saveAddressData(state, payload) {
            state.addressData = payload;
        }
    },
    getters: {

    },
    actions: {

    }
}
