import {createStore} from 'vuex'
import axios from "axios";

export default createStore({
    state: {
        campInfo: {},
        hallsInfo: [],
        eventsInfo: []
    },
    getters: {
        campInfo: (state) => state.campInfo,
        hallsInfo: (state) => state.hallsInfo,
        eventsInfo: (state) => state.eventsInfo
    },
    mutations: {
        setCampInfo(state, value) {
            state.campInfo = value;
        },
        setHallsInfo(state, value) {
            state.hallsInfo = value;
        },
        setEventsInfo(state, value) {
            state.eventsInfo = value;
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
        getHallsInfo({commit}) {
            return new Promise((resolve, reject) => {
                axios({
                    url: `https://demo.tst.landpro.site/rooms.json`,
                    method: "GET",
                })
                    .then(({data}) => {
                        commit("setHallsInfo", data);
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
        getEventsInfo({commit}) {
            return new Promise((resolve, reject) => {
                axios({
                    url: `https://demo.tst.landpro.site/events.json`,
                    method: "GET",
                })
                    .then(({data}) => {
                        commit("setEventsInfo", data);
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
