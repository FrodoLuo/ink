import * as React from 'react';
import Card from './cards';

export default () => {
  return (
    <div className="loading">
      <Card>
        <i className="iconfont icon-loading" />
      </Card>
    </div>
  );
};