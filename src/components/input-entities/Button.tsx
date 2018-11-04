import * as React from 'react';
import './button.less';


interface BtnProps {
  onClick?: (event: React.MouseEvent) => void;
  children: null | Element | string | Array<Element | string>;
  loading?: boolean;
  type?: string;
}

const InkButton = (props: BtnProps) => {
  return (
    <button disabled={props.loading} onClick={props.onClick} className={`ink ${props.type}`}>
      {props.children}
      {props.loading ? <i className="iconfont icon-loading" /> : null}
    </button>
  );
};

export default InkButton;