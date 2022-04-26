import produce from 'immer';

const initialState = {
  items: [],
  isLoaded: false,
};

const pizzas = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_PIZZAS':
      return produce(state, draft => {
        draft.items = payload;
        draft.isLoaded = true;
      });
    case 'SET_LOADED':
      return produce(state, draft => {
        draft.isLoaded = payload;
      });
    default:
      return state;
  }
};

export default pizzas;
