import React from "react";
import "./privateConvo.scss";

export default function Private() {
  return (
    <div className="privateConvo">
      <div className="privateConvo-user">
      <div className="privateConvo-img-container">
        <img
          className="privateConvo-img"
          src="https://cdn.fanbyte.com/wp-content/uploads/2020/05/picture3-2-scaled.jpg?x60655"
          alt=""
        />
        <div className='onlineBadge'></div>
      </div>
      <span className='username'>Sephiroth</span>
      </div>
    </div>
  );
}
