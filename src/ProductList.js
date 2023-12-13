import React from 'react';
import './index.css';

const ProductList = ({ products }) => {
  const sizeLabels = ['S', 'M', 'L'];

  // Фильтр на категории
/*   const filteredProducts = products.filter(
    (product) => product.product_type !== 'Дополнительно' && product.product_type !== 'Комбо'
  ); */


  // меняем products на filteredProducts, если хотим убрать категорию
  const groupedProducts = products.reduce((acc, product) => {

    const isPizza = product.product_type === 'Пицца';
  
    const title = product.title.charAt(0).toUpperCase() + product.title.slice(1).toLowerCase();

    const existingProduct = acc.find((p) => p.title === title);
    if (existingProduct) {
      existingProduct.prices.push({ size: isPizza ? sizeLabels[existingProduct.prices.length] : '', price: product.price });
    } else {
      acc.push({
        title: title,
        base_description: product.description,
        image_link: product.image_link,
        prices: [{ size: isPizza ? sizeLabels[0] : '', price: product.price }],
      });
    }

    return acc;
  }, []);

  return (
    <div className='productList'>
      {groupedProducts.map((product) => (
        <div className={`productList__Item ${product.productTypeClass}`} key={product.title}>
          <div className='productList__ItemTitle'>{product.title}</div>
          <div className='productList__ItemDescription'>{product.base_description}</div>

          <div className='productList__ItemPriceList'>
            {product.prices.map((price, index) => (
              <div key={index} className='productList__ItemPrice'>
                {price.size && `${price.size} - `}{price.price}
              </div>
            ))}
          </div>
          <img className='productList__ItemImg' src={product.image_link} alt={product.title} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
