import React, {Component} from 'react';
import 'whatwg-fetch'
import '../styles/main.scss';
import {dataUrl, timeAfterLoad} from "../js/constants";
import {findActives, timeFormat, getNewObject, getDate, isDiff} from "../js/utils";
//components
import Offers from '../components/offers';
import Error from '../components/error';
import Slider from '../components/slider';
import CheckBoxes from '../components/checkBoxes';

const Columns = [
  'Цена',
  'Авиакомпания',
  'Время отправления',
  'Продолжительность перелета'
];

const filterCaptions = {
  filterByPriceTicket: 'Стоимость билета',
  filterByDuration: 'Время в пути',
  filterByAk: 'Аэропорты',
  filterByDate: 'Дата вылета'
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: null,
      error: null,
      sliderOptions: null,
      checkBoxOptions: null,
      selectDate: null
    }
  }

  /**
   * Здесь получаем данные и устанавливаем начальное состояние фильтров, по полученным данным
   */
  componentDidMount() {
    fetch(dataUrl)
      .then((response) => response.json())
      .then((json) => {
      setTimeout(() => {
        const sliderOptions = this._getInitialSliderState(json);
        const checkBoxOptions = this._getInitialCheckBoxState(json);
        this.setState({
          dataList: json,
          sliderOptions,
          checkBoxOptions
        })
      }, timeAfterLoad);
      })
      .catch((ex) => this.setState({
        error: true
      }));
  }

  /**
   * Метод выборки данных для формирования компонента CheckBoxes
   * @param {Array} data - Входящий массив данных
   * @returns {Object []} - Массив обьектов с props для компонента CheckBoxes
   * @private
   */
  _getInitialCheckBoxState(data) {
    const mas = [];
    return data.map(({ak}, index) => {
      if (!mas.includes(ak)) {
        mas.push(ak);
        return {
          name: ak,
          checked: true,
          onChange: ({target: {name}}) => {
            const {checkBoxOptions} = this.state;
            // поиск кликнутого чекбокса в структуре данных по ключу: название ak
            const targetObj = checkBoxOptions.find((item, index) => item.name === name );
            if(targetObj) {
              targetObj.checked = !targetObj.checked;
              this.setState({
                checkBoxOptions
              })
            } else {
              console.warn('Не найден targetObject в структуре данных, посмотрите логику!')
            }
          }
        };
      }
    }).filter((item) => item);
  }

  /**
   * Метод выборки данных для формирования компонента Slider
   * @param {Array} data - Входящий массив данных
   * @returns {Object} - Обьект фильтров, с props для компонента Slider
   * @private
   */
  _getInitialSliderState(data) {
    // generate data for price
    const priceSortList = data.slice().sort((a, b) => a.price > b.price ? 1 : -1);
    const minPrice = priceSortList[0].price;
    const maxPrice = priceSortList[priceSortList.length - 1].price;

    // generate data for duration
    const durationSortList = data.slice().sort((a, b) => a.duration_in_seconds > b.duration_in_seconds ? 1 : -1);
    const minDuration = durationSortList[0].duration_in_seconds;
    const maxDuration = durationSortList[durationSortList.length - 1].duration_in_seconds;
    return {
      filterByPriceTicket: {
        minValue: minPrice,
        maxValue: maxPrice,
        value: {
          min: minPrice,
          max: maxPrice
        },
        caption: filterCaptions.filterByPriceTicket
      },
      filterByDuration: {
        minValue: minDuration,
        maxValue: maxDuration,
        value: {
          min: minDuration,
          max: maxDuration
        },
        caption: filterCaptions.filterByDuration
      }
    }
  }

  /**
   * Метод фильтрации данных
   * @param {Array} data - массив данных которые нужно отфильтровать
   * @returns {Object []} - массив отфильтрованных данных
   * @private
   */
  _filterData(data) {
    const {sliderOptions, checkBoxOptions, selectDate} = this.state;
    const activeAk = findActives(checkBoxOptions.slice(), 'checked', 'name');
    const {
      filterByPriceTicket: {
        value: {
          min,
          max
        }
      },
      filterByDuration: {
        value: {
          min: minDuration,
          max: maxDuration
        }
      }
    } = sliderOptions;
    return data.filter(({price, ak, departure_time, duration_in_seconds}, index) => {
      // get data how Array: [year, month, day]
      const departureDate = departure_time ? getDate(departure_time) : null;
      // get different betweeen selectDate and departure_time
      const differentDate = departureDate && selectDate ? isDiff(departureDate, selectDate) : null;
      return (
        // filter by price
        (min <= price && max >= price) &&
        // filter by duration
        (minDuration <= duration_in_seconds && maxDuration >= duration_in_seconds) &&
        // filter by airports
        (activeAk.includes(ak)) && !differentDate
      );
    })
  }

  /**
   * Method for merge with sliderOptions object. It's for split large Object options
   * @returns {Array} - Array of options
   * @private
   */
  _getSliderOptions() {
    const {sliderOptions} = this.state;
    const {filterByPriceTicket, filterByDuration} = sliderOptions;
    return [
      {
        ...filterByPriceTicket,
        onChange: (value) => {
          this.setState({
            sliderOptions: {
              ...sliderOptions,
              filterByPriceTicket: {...filterByPriceTicket, value}
            }
          })
        }
      },
      {
        ...filterByDuration,
        onChange: (value) => {
          this.setState({
            sliderOptions: {
              ...sliderOptions,
              filterByDuration: {...filterByDuration, value}
            }
          })
        }
      }
    ]
  }

  /**
   * Метод для манипуляции с данными перед их рендерингом
   * @param {Object []} data - массив данных для манипуляции
   * @returns {Object []} Новый массив с измененными данными
   * @private
   */
  _dataManipulations(data) {
    return data.map((item, index) => {
      const {duration_in_seconds, departure_time} = item;
      item.duration_in_seconds = timeFormat(duration_in_seconds);
      item.departure_time = getDate(departure_time, true);
      return item;
    });
  }

  _handlerChangeDate({target: {value}}) {
    this.setState({
      selectDate: value ? getDate(value) : null
    })
  }

  render () {
    const {dataList, error, sliderOptions, checkBoxOptions} = this.state;
    const {filterByAk, filterByDate} = filterCaptions;
    // @TODO не нравится что мержит при каждом рендеринге это неправильно все должно быть в initial state
    const options = sliderOptions ? this._getSliderOptions() : null;
    let data = dataList ? this._filterData(getNewObject(dataList)) : null;
    //this this we get manipulation with sorted data, as: timeFormat ...
    data = dataList ? this._dataManipulations(getNewObject(data)) : null;
    return (
      <div>
        {
          error ? <Error /> :
          <div>
            <div className='app__filters'>
              <div>
                <Slider options={options} />
              </div>
              <div>
                {<CheckBoxes options={checkBoxOptions} >{filterByAk}</CheckBoxes>}
              </div>
              <div>
                {data ?
                  <div className='app__filters-date'>
                    <h3>{filterByDate}</h3>
                    <input type='date' onChange={e => this._handlerChangeDate(e)} />
                  </div>
                  : null}
              </div>
            </div>
            <div className='app__dataTable'>
              <Offers initData={data} columns={Columns} />
            </div>
          </div>
        }
      </div>
    )
  }
}
export default App;