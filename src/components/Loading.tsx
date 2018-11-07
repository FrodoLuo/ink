import * as React from 'react';
import Card from './cards';

export default () => {
  return (
    <Card>
      <div className="loading">
        <i className="iconfont icon-loading" />
      </div>
    </Card>
  );
};