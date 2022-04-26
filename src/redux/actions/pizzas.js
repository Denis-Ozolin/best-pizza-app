import axios from 'axios';

export const setLoaded = payload => ({
  type: 'SET_LOADED',
  payload,
});

export const fetchPizzas = (sortBy, category) => dispatch => {
  dispatch(setLoaded(false));
  const getCategory = category !== null ? `category=${category}` : '';
  const getOrder = sortBy === 'rating' ? 'order=desc' : 'order=asc';

  axios
    .get(`/pizzas?${getCategory}&_sort=${sortBy}&_${getOrder}`)
    .then(({ data }) => dispatch(setPizzas(data)));
};

export const setPizzas = items => ({
  type: 'SET_PIZZAS',
  payload: items,
});
