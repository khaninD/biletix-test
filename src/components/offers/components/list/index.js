import React, { Component } from 'react';
import './main.scss';

let List = ({price, ak, departure_time: [year, month, day, hour, minutes], duration_in_seconds}) => (
  <tr className='list-item'>
    <td>{price}</td>
    <td>{ak}</td>
    <td>
      <span className='list-item__date-time'>{`${hour}:${minutes}`}</span>
      <span className='list-item__date-year'>{` ${day}.${month}.${year}`}</span>
    </td>
    <td>{duration_in_seconds}</td>
  </tr>
);

export default List;