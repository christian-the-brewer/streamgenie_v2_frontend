import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState, Fragment, useEffect } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

const RadioToggle = ({user, onSearch,radioValue,setRadioValue}) => {

        const [checked, setChecked] = useState(false);
        console.log('RadioToggle.js:radiovalue:',radioValue);
      
        const radios = [
          { name: 'Movies', value: '1' },
          { name: 'TV', value: '2' },
        ];
     
        return (
          <Fragment >           
            <ButtonGroup className="marginL-20px">
              {radios.map((radio, idx) => (
                <ToggleButton
                  className = "btn-sm grayBlueColor height30px " 
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant={idx % 2 ? 'outline-secondary' : 'outline-secondary'}
                  name="radio"
                  value={radio.value}
                  checked={radioValue === radio.value}
                  onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </Fragment>
        )
      }


export default RadioToggle