import React from 'react';
import ProductItem from './ProductItem';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductsList = ({products, category, input}) => {

    const productsList = products.filter(item => {
        try {
            /** @namespace item.brand */
            const inputBrand = input === '' || item.brand.toLowerCase()
                .includes(input.toLowerCase());
            const categoryLocation = category === '' || item.bsr_category.toLowerCase().replace(/\s/g, "")
                .includes(category.toLowerCase());

            return inputBrand && categoryLocation
        } catch (e) {
            console.log(`Error ${e}`)
        }
    });

    /** @namespace d.price */
    return (
        <ul>
            {productsList.map((d, index) => (
                <ProductItem
                    key={index}
                    brand={d.brand}
                    price={d.price}
                    bsr_category={d.bsr_category}
                    img={d.img}
                />
            ))
            }
        </ul>
    )
};

export default ProductsList;