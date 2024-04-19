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
      state.eventsInfo = value;
      //state.eventsInfo = value.map((item) => {
      //  return {
      //    ...item,
      //    finish: item.finish?.replace('Z', '').replace('T', ' '),
      //    start: item.start?.replace('Z', '').replace('T', ' '),
      //  };
      //});

      //Пример элемента расписания

      //state.eventsInfo.push({
      //  description: 'Тестовый элемент расписания Тестовый элемент расписания Тестовый элемент расписания Тестовый элемент расписания',
      //  start: '2024-04-20T12:00:00.000Z',
      //  finish: '2024-04-20T14:30:00.000Z',
      //  id: 'test',
      //  name: 'Тестовый элемент Тестовый элемент расписания Тестовый элемент расписания Тестовый элемент расписания Тестовый элемент расписания Тестовый элемент расписания',
      //  roomId: 1,
      //  speakers: [{ id: 1005, name: 'Тестовый спикер' }, { id: 1006, name: 'Тестовый спикер' }],
      //});
      //console.log(state.eventsInfo, 'state.eventsInfo')
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
          //url: `https://demo.tst.landpro.site/camp.json`,
          //url: `https://pcamp.tst.landpro.site/camp`,
          url: `https://pcamp.public.landpro.site/camp`,
          method: 'GET',
          headers: {
            Authorization: `Bearer BjQtpUS0koW1Ixw4h9aSrTEDOu2PEjjysWzt6TGfpeJlZH3eX5lqrVtYbBgYZ2B8`,
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
          //url: `https://demo.tst.landpro.site/rooms.json`,
          //url: `https://pcamp.tst.landpro.site/halls`,
          url: `https://pcamp.public.landpro.site/halls`,
          method: 'GET',
          headers: {
            Authorization: `Bearer BjQtpUS0koW1Ixw4h9aSrTEDOu2PEjjysWzt6TGfpeJlZH3eX5lqrVtYbBgYZ2B8`,
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
          //url: `https://demo.tst.landpro.site/events.json`,
          //url: `https://pcamp.tst.landpro.site/events`,
          url: `https://pcamp.public.landpro.site/events`,
          method: 'GET',
          headers: {
            Authorization: `Bearer BjQtpUS0koW1Ixw4h9aSrTEDOu2PEjjysWzt6TGfpeJlZH3eX5lqrVtYbBgYZ2B8`,
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

    /**
     * Проверка подписки пользователя
     * @param {commit} commit
     *
     * @returns {void}
     */
    checkSubscribeUser({ commit }, payload) {
      const { eventId, chatId } = payload;
      return new Promise((resolve, reject) => {
        axios({
          url: `https://pcamp.tst.landpro.site/subscriptions/check`,
          method: 'GET',
          headers: {
            Authorization: `Bearer BjQtpUS0koW1Ixw4h9aSrTEDOu2PEjjysWzt6TGfpeJlZH3eX5lqrVtYbBgYZ2B8`,
          },
          params: {
            eventId: eventId,
            chatId: chatId,
          },
        })
          .then(({ data }) => {
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
     * Создание подписки на событие
     * @param {commit} commit
     *
     * @returns {void}
     */
    createSubscribeUser({ commit }, payload) {
      const { eventId, chatId, email } = payload;
      return new Promise((resolve, reject) => {
        axios({
          url: `https://pcamp.tst.landpro.site/subscriptions`,
          method: 'POST',
          headers: {
            Authorization: `Bearer BjQtpUS0koW1Ixw4h9aSrTEDOu2PEjjysWzt6TGfpeJlZH3eX5lqrVtYbBgYZ2B8`,
          },
          data: {
            eventId: +eventId,
            chatId: +chatId,
						email: email,
          },
        })
          .then(({ data }) => {
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
     * Обновление подписки
     * @param {commit} commit
     *
     * @returns {void}
     */
    updateSubscribeUser({ commit }, payload) {
      const { eventId, chatId, email, updateAnotherSubscriptions } = payload;
      return new Promise((resolve, reject) => {
        axios({
          url: `https://pcamp.tst.landpro.site/subscriptions`,
          method: 'PUT',
          headers: {
            Authorization: `Bearer BjQtpUS0koW1Ixw4h9aSrTEDOu2PEjjysWzt6TGfpeJlZH3eX5lqrVtYbBgYZ2B8`,
          },
          data: {
            eventId: +eventId,
            chatId: +chatId,
						email: email,
						updateAnotherSubscriptions: updateAnotherSubscriptions,
          },
        })
          .then(({ data }) => {
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
     * Отзыв для пользователя
     * @param {commit} commit
     *
     * @returns {void}
     */
    feedBackUser({ commit }, payload) {
      const { eventId, chatId } = payload;
      return new Promise((resolve, reject) => {
        axios({
          url: `https://pcamp.tst.landpro.site/feedback`,
          method: 'POST',
          headers: {
            Authorization: `Bearer BjQtpUS0koW1Ixw4h9aSrTEDOu2PEjjysWzt6TGfpeJlZH3eX5lqrVtYbBgYZ2B8`,
          },
          data: {
            eventId: +eventId,
            chatId: +chatId,
          },
        })
          .then(({ data }) => {
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
