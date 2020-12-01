import React from 'react';

import {ListingWithEventPageSelector, ListingWithActivityPageSelector } from '../../listing/Listing';

const ListingParagraph = ({categoryFilters, showDateFilters}: {categoryFilters: string, showDateFilters: boolean}) => {
    switch(categoryFilters) {
        case "activities":
            return <ListingWithActivityPageSelector categoryFilter={'activities'} showDateFilters={showDateFilters} />;
        case "events":
            return <ListingWithEventPageSelector categoryFilter={'events'} showDateFilters={showDateFilters} />;
        default: 
            return null;
    }
};


export default ListingParagraph;