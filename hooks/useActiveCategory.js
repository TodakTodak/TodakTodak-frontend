/**
 * This hook is access categoryPostSlice redux store's state.
 *
 * @param {String} category the current category name
 * @param {Object} categoryInfo the category and get category info function
 *
 * categoryInfo form: { categoryName: setCategoryInfo, ... }
 * categoryName type: String or Number
 * setCategoryInfo type: function
 *
 * @returns {Array} the element active category name and set category function
 */

import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

import getCategoryNames from "../utils/getCategoryNames";

const useActiveCategory = (category, categoryInfo) => {
  const [activeCategory, setActiveCategory] = useState(category);

  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.user);
  const categoryNames = getCategoryNames(categoryInfo);

  useFocusEffect(useCallback(() => {
    dispatch(categoryInfo[activeCategory](accessToken));
  }, [activeCategory, accessToken, ...categoryNames]));

  return [activeCategory, setActiveCategory];
};

export default useActiveCategory;
