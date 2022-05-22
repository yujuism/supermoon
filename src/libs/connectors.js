import {UAuthConnector} from '@uauth/web3-react'
import {InjectedConnector} from '@web3-react/injected-connector'
import {WalletConnectConnector} from '@web3-react/walletconnect-connector'
import {AbstractConnector} from '@web3-react/abstract-connector'
import UAuth from '@uauth/js'

// Instanciate your other connectors.
export const injected = new InjectedConnector({supportedChainIds: [1]})

export const walletconnect = new WalletConnectConnector({
  infuraId: process.env.REACT_APP_INFURA_ID,
 
  qrcode: true,
})

export const uauth = new UAuthConnector({
  uauth: new UAuth({
    clientID: process.env.REACT_APP_CLIENT_ID,
    
    redirectUri: 'http://localhost:3000',
    postLogoutRedirectUri: 'http://localhost:3000',
    scope: 'openid wallet',
  }),
  // clientID: process.env.REACT_APP_CLIENT_ID,
  // redirectUri: 'http://localhost:3000',
  // shouldLoginWithRedirect:true,
  // postLogoutRedirectUri: 'http://localhost:3000',
  // Scope must include openid and wallet
  // scope: 'openid wallet',

  // Injected and walletconnect connectors are required.
  connectors: {injected, walletconnect},
})

const connectors = {
  injected,
  walletconnect,
  uauth,
}

export default connectors