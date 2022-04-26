import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Categories, SortPopup, PizzaCard, LoadingCard } from '../components';
import { setCategory, setSortBy } from '../redux/actions/filters';
import { fetchPizzas } from '../redux/actions/pizzas';
import { addPizzaToCart } from '../redux/actions/cart';

const categoryNames = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const sortItems = [
  { name: 'популярности', type: 'rating' },
  { name: 'цене', type: 'price' },
  { name: 'алфавиту', type: 'name' },
];

function Home() {
  const { items, isLoaded } = useSelector(state => state.pizzas);
  const { category, sortBy } = useSelector(state => state.filters);
  const cartItems = useSelector(state => state.cart.items);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPizzas(sortBy, category));
  }, [category, dispatch, sortBy]);

  const onSelectCategory = useCallback(
    index => {
      dispatch(setCategory(index));
    },
    [dispatch],
  );

  const onSelectSortType = useCallback(
    type => {
      dispatch(setSortBy(type));
    },
    [dispatch],
  );

  const handleAddPizzaToCart = obj => {
    dispatch(addPizzaToCart(obj));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={category}
          onClickCategory={onSelectCategory}
          items={categoryNames}
        />
        <SortPopup activeSortType={sortBy} onClickSortType={onSelectSortType} items={sortItems} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoaded
          ? items.map(obj => (
              <PizzaCard
                onClickAddPizza={handleAddPizzaToCart}
                key={obj.id}
                addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                {...obj}
              />
            ))
          : Array(12)
              .fill(0)
              .map((_, index) => <LoadingCard key={index} />)}
      </div>
    </div>
  );
}

export default Home;
