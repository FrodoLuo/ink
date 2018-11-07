import * as React from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from 'src/service/auth.service';


export const AuthorizedPage = (Page: any) => {
  return class extends React.Component {
    public state = {
      pass: true,
    };
    public async componentWillMount() {
      const pass = await AuthService().signInWithTokenMethod();
      console.log(pass);
      if (!pass) {
        this.setState({
          pass: false,
        });
      }
    }
    public render() {
      return this.state.pass ? <Page /> : <Redirect to="/" />;
    }
  };
};