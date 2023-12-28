import { Slider } from "@mui/material";

function RangeSlider({ width = "40%", handleSliderChange }) {
  return (
    <Slider
      defaultValue={50}
      aria-label="Default"
      valueLabelDisplay="auto"
      step={50}
      min={50}
      max={1000}
      style={{ width: width }}
      onChange={handleSliderChange}
    />
  );
}

export default RangeSlider;
