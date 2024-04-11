import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    campInfo: {},
    hallsInfo: [],
    eventsInfo: [],
  },
  getters: {
    campInfo: (state) => state.campInfo,
    hallsInfo: (state) => state.hallsInfo,
    eventsInfo: (state) => state.eventsInfo,
  },
  mutations: {
    setCampInfo(state, value) {
      state.campInfo = value;

      //Пример информации о расписании

      //state.campInfo = {
      //  dates: [
      //    { date: '2023-08-19' },
      //    { date: '2023-08-20' },
      //    { date: '2023-08-21' },
      //    { date: '2023-08-22' },
      //    { date: '2023-08-23' },
      //  ],
      //  id: '2908e87d-ff36-4ff4-bef0-b19490768fce',
      //  name: 'ProductCamp Summer 2023',
      //};
    },
    setHallsInfo(state, value) {
      state.hallsInfo = value;

      //Пример информации о залах

      //state.hallsInfo = [
      //  {
      //    id: 1,
      //    name: 'Зал 1',
      //  },
      //  {
      //    id: 2,
      //    name: 'Зал 2',
      //  },
      //  {
      //    id: 3,
      //    name: 'Зал 3',
      //  },
      //];
    },
    setEventsInfo(state, value) {
      state.eventsInfo = value.map((item) => {
        return {
          ...item,
          finish: item.finish?.replace('Z', '').replace('T', ' '),
          start: item.start?.replace('Z', '').replace('T', ' '),
        };
      });

      //Пример элемента расписания

			//state.eventsInfo.push({
      //  description: 'Тестовый элемент расписания Тестовый элемент расписания Тестовый элемент расписания Тестовый элемент расписания',
      //  start: '2023-08-21 12:00:00',
      //  finish: '2023-08-21 12:30:00',
      //  id: 'test',
      //  name: 'Тестовый элемент Тестовый элемент расписания Тестовый элемент расписания Тестовый элемент расписания Тестовый элемент расписания Тестовый элемент расписания',
      //  roomId: 3,
      //  speakers: [{ id: 1005, name: 'Тестовый спикер' }],
      //});
    },
  },
  actions: {
    /**
     * Получаем информацию о расписании
     * @param {commit} commit
     *
     * @returns {void}
     */
    getCampInfo({ commit }) {
      return new Promise((resolve, reject) => {
        axios({
          url: `https://demo.tst.landpro.site/camp.json`,
          method: 'GET',
					headers: {
            Authorization: `Bearer BjQtpUS0koW1Ixw4h9aSrTEDOu2PEjjysWzt6TGfpeJlZH3eX5lqrVtYbBgYZ2B8`
          },
        })
          .then(({ data }) => {
            commit('setCampInfo', data);

            resolve({
              data: data,
              status: true,
            });
          })
          .catch((err) => {
            reject({
              status: false,
              data: err,
            });
          });
      });
    },

    /**
     * Получаем список залов
     * @param {commit} commit
     *
     * @returns {void}
     */
    getHallsInfo({ commit }) {
      return new Promise((resolve, reject) => {
        axios({
          url: `https://demo.tst.landpro.site/rooms.json`,
          method: 'GET',
					headers: {
            Authorization: `Bearer BjQtpUS0koW1Ixw4h9aSrTEDOu2PEjjysWzt6TGfpeJlZH3eX5lqrVtYbBgYZ2B8`
          },
        })
          .then(({ data }) => {
            commit('setHallsInfo', data);

            resolve({
              data: data,
              status: true,
            });
          })
          .catch((err) => {
            reject({
              status: false,
              data: err,
            });
          });
      });
    },

    /**
     * Получаем список элементов расписания
     * @param {commit} commit
     *
     * @returns {void}
     */
    getEventsInfo({ commit }) {
      return new Promise((resolve, reject) => {
        axios({
          url: `https://demo.tst.landpro.site/events.json`,
          method: 'GET',
					headers: {
            Authorization: `Bearer BjQtpUS0koW1Ixw4h9aSrTEDOu2PEjjysWzt6TGfpeJlZH3eX5lqrVtYbBgYZ2B8`
          },
        })
          .then(({ data }) => {
            commit('setEventsInfo', data);

            resolve({
              data: data,
              status: true,
            });
          })
          .catch((err) => {
            reject({
              status: false,
              data: err,
            });
          });
      });
    },
  },
});
