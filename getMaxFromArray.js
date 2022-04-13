
const getCount = (arr) => {

  let setFromArr = new Set(arr);
  let itemsCountArray = [];

  setFromArr.forEach((item) => {
    let count = arr.filter((val) => {
      return val == item
    }).length

    itemsCountArray.push({ item, count })
  })

  return itemsCountArray
}

const getMax = (arr) => {
  let max = { item: "", count: 0 }
  for (let i of arr) {
    if (i.count > max.count) {
      max.item = i.item;
      max.count = i.count;
    }
  }
  return max
}

const getMaxFromArray = (arr) => getMax(getCount(arr));

module.exports = getMaxFromArray



