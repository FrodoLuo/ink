import * as React from 'react';
import Card from 'src/components/cards';
import { Editor } from 'src/components/manage';
export default class EditPage extends React.Component {
  public render() {
    return (
      <Card>
        <Editor />
      </Card>
    );
  }
}