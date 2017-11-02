import React, {Component} from 'react';
import Proptypes from 'prop-types';
//styles
import './main.scss'
//components
import InputRange from 'react-input-range';
import '../../../node_modules/react-input-range/src/scss/index.scss';

const Slider = ({options}) => {

  const Caption = ({text}) => (
    <h3>{text}</h3>
  );
  return(
    options ?
      <div className='react-input-range-box'>
        <div className='input-range-item'>
          {
            options.map((item, index) => (
                <div key={index}>
                  <Caption text={item.caption} />
                  <InputRange {...item} />
                </div>
              )
            )
          }
        </div>
    </div>
      : null
  );
};

Slider.propTypes = {
  options: Proptypes.array.isRequired
};

export default Slider;