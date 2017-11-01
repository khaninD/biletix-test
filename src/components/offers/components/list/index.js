import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './main.scss';

let List = ({price, ak, departure_time, duration_in_seconds}) => (
  <tr styleName='list-item'>
    <td>{price}</td>
    <td>{ak}</td>
    <td>{departure_time}</td>
    <td>{duration_in_seconds}</td>
  </tr>
);

List = CSSModules(List, styles);
export default List;