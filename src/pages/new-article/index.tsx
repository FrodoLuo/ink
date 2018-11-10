import * as React from 'react';
import Card from 'src/components/cards';
import { Editor } from 'src/components/manage';
import { RouteComponentProps, withRouter } from 'react-router';

const editor = (props: RouteComponentProps<{ id: string }>) => {
  console.log(props);
  return (
    <Editor modify={false} id={props.match.params.id} />
  );
};

export default withRouter(editor);