/*
import logo from './logo.svg';
import './App.css';




function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

*/



import React from 'react';
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
//import awsconfig from './aws-exports';

Amplify.configure({
    "aws_project_region": "ap-northeast-1",
    "aws_cognito_identity_pool_id": "ap-northeast-1:ce1c5c83-08ff-4c2e-9cb3-079bba140182",
    "aws_cognito_region": "ap-northeast-1",
    "aws_user_pools_id": "ap-northeast-1_hiBcqkdQd",
    "aws_user_pools_web_client_id": "r5e71s19c2lbcsi8si71uads8",
    "oauth": {},
    "aws_appsync_graphqlEndpoint": "https://3hxchkwbdjc6bhoilgnscj4dfi.appsync-api.ap-northeast-1.amazonaws.com/graphql",
    "aws_appsync_region": "ap-northeast-1",
    "aws_appsync_authenticationType": "API_KEY",
    "aws_appsync_apiKey": "da2-zexfka3a3be4xdsouwg7gxnw3m"
});


const App = () => {
    const [authState, setAuthState] = React.useState();
    const [user, setUser] = React.useState();

    React.useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData)
        });
    }, []);

  return authState === AuthState.SignedIn && user ? (
      <div className="App">
          <div>Hello, {user.username}</div>
          <AmplifySignOut />
      </div>
    ) : (
      <AmplifyAuthenticator>
        <AmplifySignUp
          slot="sign-up"
          formFields={[
            { type: "username" },
            { type: "password" },
            { type: "email" }
          ]}
        />
      </AmplifyAuthenticator>
  );
}

export default App;
