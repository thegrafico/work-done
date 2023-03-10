// /**
//  * Filter array with
//  * @param {Array} projects
//  * @param {String} filterTearm
//  * @returns {Array}
//  */
const filterArray = (arr, filterTearm) => {
  // if filterTearm is empty
  if (typeof filterTearm != "string" || filterTearm.length === 0) {
    return arr;
  }

  // if not array or empty
  if (!Array.isArray(arr) || arr.length === 0) {
    return [];
  }

  // check if the current item title math what the user entered
  const tempFilteredArr = arr.filter((item) => {
    return item.title.toLowerCase().includes(filterTearm);
  });

  return tempFilteredArr;
};

const filterByTerm = (arr, term, value) => {
  return arr.filter((item) => {
    return item[term] === value;
  });
};

/**
 * Sort task points
 * @param {Array} points
 * @returns {Array} - Sorted array
 */
const sortTaskPoints = (points) => {
  return points.sort((a, b) =>
    a.value > b.value ? -1 : b.value > a.value ? +1 : 0
  );
};

const sortByTerm = (arr, term) => {
  return arr.sort((a, b) =>
    a[term] > b[term] ? -1 : b[term] > a[term] ? +1 : 0
  );
};

module.exports = {
  filterArray,
  filterByTerm,
  sortTaskPoints,
  sortByTerm,
};
