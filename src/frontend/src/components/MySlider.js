import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


export const ContinuousSlider = (props) => {

  function onChange(ev, newVal) {
    props.setWeight(prev => ({
      ...prev,
      [props.weightName]: newVal
    }))
  }

  const marks = [
    {
      value: props.min,
      label: 'Very Low',
    },
    {
      value: (props.max + props.min) / 2,
      label: 'Neutral',
    },
    {
      value: props.max,
      label: 'Very High',
    }
  ];

  return (
    <div>
      <Typography id="continuous-slider" gutterBottom>
        <h3>{props.weightName}</h3>
      </Typography>
      <Slider step={0.0001} defaultValue={props.defaultValue} min={props.min} max={props.max} onChange={onChange}
          marks={marks} aria-labelledby="continuous-slider" track={false} />
    </div>
  );
}

export default ContinuousSlider;