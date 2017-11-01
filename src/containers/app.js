import React, {Component} from 'react';
import CSSModules from 'react-css-modules';
import 'whatwg-fetch'
import styles from '../styles/main.scss';
import {dataUrl, timeAfterLoad} from "../js/constants";
import Offers from '../components/offers';
import Error from '../components/error';

const Columns = [
  'Цена',
  'Авиакомпания',
  'Время отправления',
  'Продолжительность перелета'
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: null,
      error: null
    }
  }

  componentDidMount() {
    fetch(dataUrl)
      .then((response) => response.json())
      .then((json) => {
      setTimeout(() => {
        this.setState({
          dataList: json
        })
      }, timeAfterLoad);
      })
      .catch((ex) => this.setState({
        error: true
      }));
  }

  render () {
    const {dataList, error} = this.state;
    return (
      <div>
        {error ? <Error /> : <Offers data={dataList} columns={Columns} />}
      </div>
    )
  }
}

App = CSSModules(App, styles);
export default App;