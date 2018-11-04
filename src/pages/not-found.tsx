import * as React from 'react';
import Card from '../components/cards';

const s:React.CSSProperties = {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  height: '50vh',
  justifyContent: 'center',
};

const NotFoundPage = () => {
  return (
    <Card>
      <div style={s}>
      <h1><i style={{fontSize: 72}} className="iconfont icon-empty" /></h1>
      <h1>哦豁, 页面不存在.</h1>
      <h2>Oops, Page not found.</h2>
    </div>
    </Card>
  );
};

export default NotFoundPage;