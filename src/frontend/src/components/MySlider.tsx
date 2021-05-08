import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

export interface SongWeight {
  Danceability: number,
  Valence: number,
  Acousticness: number,
  Energy: number,
  Instrumentalness: number
}

interface SliderProps {
  min: number,
  max: number,
  weightName: string,
  defaultValue: number,
  setWeight: any
}

export const ContinuousSlider = ({ min, max, weightName, defaultValue, setWeight }: SliderProps) => {

  function onChange(ev: React.ChangeEvent<{}>, value: number | number[]) {
    setWeight((prev: SongWeight) => ({
      ...prev,
      [weightName]: value
    }))
  }

  const marks = [
    {
      value: min,
      label: 'Very Low',
    },
    {
      value: (max + min) / 2,
      label: 'Neutral',
    },
    {
      value: max,
      label: 'Very High',
    }
  ];

  return (
    <div style={{display: 'flex', 'flexDirection': 'column', 'alignItems': 'center', margin:'.5em'}}>
      <Typography id="continuous-slider" gutterBottom>
        <h3>{weightName}</h3>
      </Typography>
      <Slider step={0.0001} value={defaultValue} min={min} max={max} onChange={onChange}
        marks={marks} aria-labelledby="continuous-slider" track={false}/>
    </div>
  );
}

export default ContinuousSlider;