import * as React from 'react';

import './card-style.less';

interface CardProps {
  children: React.ReactElement<any> |
  Element[] |
  Array<React.ReactElement<any>> |
  null;
}
export default (props: CardProps) => {
  return (
    <div className="ink card-wrapper">
      <div className="ink card-body">
        <div className="ink card-content">
          {props.children}
        </div>
      </div>
    </div>
  );
};