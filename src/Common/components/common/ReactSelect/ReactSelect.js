import React from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { colourOptions } from '../../../fixtures/colorsData';

const animatedComponents = makeAnimated();

export default function ReactSelect() {
  return (
    <div>
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      defaultValue={[colourOptions[4], colourOptions[5]]}
      isMulti
      options={colourOptions}
      data-testid="colors"
    />
    </div>
  );
}