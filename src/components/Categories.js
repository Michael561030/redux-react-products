import React from 'react';
import {Link} from "react-router-dom";
import StyledButton from '../common/StyledButton'


//filtering list of our items & find unique category therefore displayed them as buttons
const Categories = ({products, currentLocation, reset, handleChange}) => {

    /** @namespace product.bsr_category */
    let categoryList = products && products
        .map(product => product.bsr_category.toLowerCase())
        .filter((item, pos, self) => self.indexOf(item) === pos);

    //Adding another one button in the beginning which will display all products
    categoryList && categoryList.unshift('all');

    //Displaying each item as button
    let mappedCategoryList;
    mappedCategoryList = categoryList && categoryList.map((item) => {
        let result;
        result = item === 'all' ?
            <Link to={''}>
                <StyledButton active={!(currentLocation)}
                              item={''}
                              onClick={reset}>all</StyledButton>
            </Link> :
            <Link to={item.replace(/\s/g, "")}>
                <StyledButton active={currentLocation === item.replace(/\s/g, "")}
                              type="button"
                              value={item}
                              onClick={handleChange}>
                    {item}
                </StyledButton>
            </Link>;
        return result

    });
    return mappedCategoryList
};

export default Categories