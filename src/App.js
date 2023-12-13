import React from 'react';
import ProductList from './ProductList';
import './index.css';
import data from './google.json';
import categoriesData from './catagoriesData.json';

const App = () => {
  const jsonData = data;
  const products = jsonData.feed.entry;
  const categories = categoriesData.categories.category;

  return (
    <div className='page'>
      {categories.map((category, index) => (
        <div key={index}>
          <div className='categories'>{category}</div>
          <ProductList products={products.filter((product) => product.product_type === category)} />
        </div>
      ))}
    </div>

  );
};

export default App;
