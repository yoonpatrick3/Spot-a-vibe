import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 200,
  },
});

export const ContinuousSlider = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(30);
  
  const handleChange = (ev, newVal) => {
    props.handleWeightChange(props.weightName, newVal);
    setValue(newVal);
  }

  return (
    <div className={classes.root}>
      <Typography id="continuous-slider" gutterBottom>
        {props.weightName}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs>
          <Slider value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
        </Grid>
      </Grid>
    </div>
  );
}

export default ContinuousSlider;