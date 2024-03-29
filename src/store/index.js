import {createStore} from 'vuex'
import axios from "axios";

export default createStore({
    state: {
        campInfo: {}
    },
    getters: {
        campInfo: (state) => state.campInfo
    },
    mutations: {
        setCampInfo(state, value) {
            state.campInfo = value;
        },
    },
    actions: {
        getCampInfo({commit}) {
            return new Promise((resolve, reject) => {
                axios({
                    url: `https://demo.tst.landpro.site/camp.json`,
                    method: "GET",
                })
                    .then(({data}) => {
                        commit("setCampInfo", data);
                        resolve({
                            data:data,
                            status: true,
                        });
                    })
                    .catch((err) => {
                        reject({
                            status: false,
                            msg: err,
                        });
                    });
            });
        },
    },
})
