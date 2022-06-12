import React from 'react';
import './header.css';
import Pic from '../../images/liugezhou.png';
const Header = () => {
  return (
    <div className="main">
      <div className="left">
        <img className="dib w3 h3 br-100" alt="logo" src={Pic}/>
      </div>
      <div className="right">
        我们在这个世界上辛苦劳作，来回奔波是为了什么？<br />所有这些贪婪和欲望，所有这些对财富、权利和名声的追求，其目的到底何在呢？<br/>归根结底，是为了得到他人的爱和认同。
      </div>
    </div>
  );
};

export default Header;
