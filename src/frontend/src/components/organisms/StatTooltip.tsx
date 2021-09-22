import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import HelpIcon from "@material-ui/icons/Help";

const useStyles = makeStyles((theme) => ({
  relative: {
    position: "relative",
    left: theme.spacing(1),
  },
}));

interface StatTooltipProps {
  setOpen: any;
}

export default function StatTooltip({ setOpen }: StatTooltipProps) {
  const classes = useStyles();

  return (
    <Tooltip
      title="Click for more information"
      aria-label="info"
      className={classes.relative}
    >
      <Button onClick={() => setOpen(true)}>
        <HelpIcon color="disabled" />
      </Button>
    </Tooltip>
  );
}
