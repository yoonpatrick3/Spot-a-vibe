import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


const marks = [
  {
    value: 0,
    label: 'Very Low',
  },
  {
    value: .25,
    label: 'Moderately Low',
  },
  {
    value: .5,
    label: 'Neutral',
  },
  {
    value: .75,
    label: 'Moderately High',
  },
  {
    value: 1.0,
    label: 'Very High',
  }
];

export const ContinuousSlider = (props) => {

  function onChange(ev, newVal) {
    props.setWeight(prev => ({
      ...prev,
      [props.weightName]: newVal
    }))
  }

  return (
    <div>
      <Typography id="continuous-slider" gutterBottom>
        {props.weightName}
      </Typography>
      <Slider step={.01} defaultValue={.5} min={0.0} max={1.0} onChange={onChange}
          marks={marks} aria-labelledby="continuous-slider" track={false} />
    </div>
  );
}

export default ContinuousSlider;