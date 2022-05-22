import React from 'react'
import {createBrowserHistory} from 'history'
import { Router, Route, Redirect,Switch } from 'react-router-dom'
import Login from './Supermoon/Login'
import Main from './Supermoon/Main'
import secureStorage from './libs/secureStorage'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import UAuth from '@uauth/js'


const theme = createTheme()


const uauth = new UAuth({
  // ... options
})


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      history:''
    }
  }
  componentDidMount(){
    uauth.user()
  .then((user) => {
    // user exists
    console.log("User information:", user)
  })
  .catch(() => {
    // user does not exist
  })
    // console.log(secureStorage.getItem('token'))
  }
  UNSAFE_componentWillMount(){
    this.setState({
      history:createBrowserHistory()
    })
  }
  getLibrary(provider) {
    return new Web3Provider(provider);
  }

  render(){
    return (
      <Web3ReactProvider getLibrary={this.getLibrary}>
        <ThemeProvider theme={theme}>
          <Router history={this.state.history}>
            <Switch>
              <Route path="/login" component={Login} />
              <PrivateRoute path="/" component={Main} />
            </Switch>
          </Router>
        </ThemeProvider>
      </Web3ReactProvider>
    )
  }
}
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>  
        secureStorage.getItem('token') ? 
        <Component {...props} />
        : 
        <Redirect to='/login' />
      }
    />
  );
}

export default App;
