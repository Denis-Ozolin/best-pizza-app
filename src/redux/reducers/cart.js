import produce from 'immer';

const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

const getTotalPrice = (arr) => arr.reduce((summ, { price }) => summ + price, 0);

const cart = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'ADD_PIZZA_CART': {
      const currentPizzaItems = !state.items[payload.id]
        ? [payload]
        : [...state.items[payload.id].items, payload];

      const newItems = {
        ...state.items,
        [payload.id]: {
          items: currentPizzaItems,
          totalPrice: getTotalPrice(currentPizzaItems),
        },
      };

      const items = Object.values(newItems).map((obj) => obj.items);
      const allPizzas = Object.values(items).reduce((acc, item) => [...acc, ...item], []);
      const totalPrice = getTotalPrice(allPizzas);

      return produce(state, (draft) => {
        draft.items = newItems;
        draft.totalCount = allPizzas.length;
        draft.totalPrice = totalPrice;
      });
    }

    case 'CLEAR_CART': {
      return {
        items: {},
        totalPrice: 0,
        totalCount: 0,
      };
    }
    case 'REMOVE_CART_ITEM': {
      const newItems = { ...state.items };
      const currentTotalPrice = newItems[payload].totalPrice;
      const currentTotalCount = newItems[payload].items.length;
      delete newItems[payload];

      return produce(state, (draft) => {
        draft.items = newItems;
        draft.totalPrice = state.totalPrice - currentTotalPrice;
        draft.totalCount = state.totalCount - currentTotalCount;
      });
    }
    case 'MINUS_CART_ITEM': {
      const minCountPizzas = state.items[payload].items.length < 2;
      const itemsTotalPrice = state.items[payload].totalPrice;
      const itemPrice = state.items[payload].items[0].price;

      return produce(state, (draft) => {
        if (!minCountPizzas) {
          draft.items[payload].items.pop();
          draft.items[payload].totalPrice = itemsTotalPrice - itemPrice;
          draft.totalPrice -= itemPrice;
          draft.totalCount -= 1;
        }
      });
    }

    case 'PLUS_CART_ITEM': {
      const itemsTotalPrice = state.items[payload].totalPrice;
      const itemPrice = state.items[payload].items[0].price;

      return produce(state, (draft) => {
        draft.items[payload].items.push(draft.items[payload].items[0]);
        draft.items[payload].totalPrice = itemsTotalPrice + itemPrice;
        draft.totalPrice += itemPrice;
        draft.totalCount += 1;
      });
    }
    default:
      return state;
  }
};

export default cart;
