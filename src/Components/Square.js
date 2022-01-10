import React from "react";
import "./Square.css";
const Square = (props) => {
  return (
    <div className='square' {...props}>
      {props.x ? "x" : props.o ? "o" : ""}
    </div>
  );
};

export default Square;
