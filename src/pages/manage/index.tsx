import * as React from 'react';
import Card from '../../components/cards';
import { ArticleManage } from 'src/components/manage';
export default class ManagePage extends React.Component {

  public render() {
    return (
      <>
        <Card>
          <ArticleManage />
        </Card>
      </>
    );
  }
}