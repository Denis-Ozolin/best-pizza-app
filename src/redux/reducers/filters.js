import produce from 'immer';

const initialState = {
  category: null,
  sortBy: 'rating',
};

const filters = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_SORT_BY':
      return produce(state, draft => {
        draft.sortBy = payload;
      });
    case 'SET_CATEGORY':
      return produce(state, draft => {
        draft.category = payload;
      });
    default:
      return state;
  }
};

export default filters;
