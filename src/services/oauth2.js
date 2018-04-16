// @flow
import * as React from 'react';
import SocialLogin from 'react-social-login';

type Props = {};

type State = {};

export default class OAuth extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }
  handleSocialLogin = (user: any, err: any) => {
    // console.log(user);
    // console.log(err);
  };
  render() {
    return (
      <div>
        {/* TODO  we need changing APP ID*/}
        <SocialLogin
          provider="facebook"
          appId="YOUR_APP_ID"
          callback={this.handleSocialLogin}
        >
          <button>Login with Facebook</button>
        </SocialLogin>
      </div>
    );
  }
}
