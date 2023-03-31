import React from "react";
import { ImLocation2 } from 'react-icons/im';

const Marker = ({  tooltip }) => {
 
  return (
    <div className= "circle">
      <span className="circleText" title={tooltip}>
        <ImLocation2 />
      </span>
    </div>
  );
};

export default Marker;