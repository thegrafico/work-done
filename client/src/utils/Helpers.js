// /**
//  * Filter array with
//  * @param {Array} projects
//  * @param {String} filterTearm
//  * @returns {Array}
//  */
const filterArray = (arr, filterTearm) => {

    // if filterTearm is empty
    if (typeof (filterTearm) != "string" || filterTearm.length === 0) {
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

module.exports = {
    filterArray,
};