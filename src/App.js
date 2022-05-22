import React from 'react'
import {createBrowserHistory} from 'history'
import { Router, Route, Redirect,Switch } from 'react-router-dom'
import Login from './Supermoon/Login'
import Main from './Supermoon/Main'
import secureStorage from './libs/secureStorage'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import {uauth} from './libs/connectors'


const theme = createTheme()




class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      history:'',
      user:'',
    }
  }
  componentDidMount(){
    uauth.uauth.user()
  .then((user) => {
    // user exists
    console.log({user})
    secureStorage.setItem('user',user)
    this.setState({user})
  })
  .catch(err => {
    console.log(err)
    secureStorage.removeItem('user')
    this.setState({user:''})
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
              
              {/* <Route path="/" render={props=>
                this.state.user?
                <Main {...props} />
                :
                <Redirect to='/login' />
              } /> */}
            </Switch>
          </Router>
        </ThemeProvider>
      </Web3ReactProvider>
    )
  }
}
function PrivateRoute({ component: Component, ...rest }) {
  console.log('test1')
  return (
    <Route
      {...rest}
      render={props =>  
        secureStorage.getItem('user') ? 
        <Component {...props} />
        : 
        <Redirect to='/login' />
      }
    />
  );
}

export default App;
