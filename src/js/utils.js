/**
 * Function
 * @param d
 * @param prop
 * @returns {Array}
 */
const findActives = (d, prop, targetProp) =>
  d.filter((item, index) => item[prop]).
    map((item, index) => item[targetProp]);

/**
 * Function for generate hours and minutes from seconds
 * @param sec
 * @returns {string}
 */
const timeFormat = sec => {
  const hours = sec / 3600  % 24;
  const minutes = sec / 60 % 60;

  const numParse = val => {
    val = Math.floor(val);
    return val < 10 ? '0' + val : val;
  };

  return numParse(hours) + ":" + numParse(minutes)
};

const getNewObject = data => data.map((item, index) => Object.assign({}, item));

const getDate = (date, flag) => {
  date = new Date(date);
  const restDate = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
  const fullDate = [...restDate, date.getHours(), date.getMinutes()];
  return flag ? fullDate : restDate;
};

const diff = (a, b) => a.filter((i) => b.indexOf(i) < 0);

const isDiff = (a, b) => !!diff(a, b).length;

export {
  findActives,
  timeFormat,
  getNewObject,
  getDate,
  isDiff
}