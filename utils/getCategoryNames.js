/**
 * This function is get Category name for useActiveCategory dependency
 * If the category name is not a string or numeric string, it may be excluded.
 *
 * @param {Object} categoryInfo the Object of category name and category function
 *
 * categoryInfo form: { categoryName: setCategoryInfo, .... }
 * categoryName type: String or Number
 * setCategoryInfo type: function
 *
 * @returns {Array} the category name list
 *
 * @example
 *
 * const categoryInfo = {
 *   "category1": function () {},
 *   "category2": function () {},
 *   "category3": function () {}
 * };
 *
 * const categoryNames = getCategoryNames(categoryInfo);
 *
 * the categoryNames is ["category1", "category2", "category3"]
 */

const getCategoryNames = (categoryInfo) => {
  const categoryNames = Object.keys(categoryInfo);
  const filteredCategoryNames = categoryNames.filter((categoryName) =>
    (typeof categoryName === "string" || typeof categoryNames === "number")
  );

  return filteredCategoryNames;
};

export default getCategoryNames;
