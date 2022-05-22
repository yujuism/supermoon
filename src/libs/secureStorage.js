import getBrowserFingerprint from 'get-browser-fingerprint'
const CryptoJS = require('crypto-js')
const SecureStorage = require('secure-web-storage')
// const isJSON = require('is-json')

// const getBrowserFingerprint = require('get-browser-fingerprint')

const SECRET_KEY = CryptoJS.SHA256(getBrowserFingerprint()).toString()
// console.log(getBrowserFingerprint())
const secureStorage = new SecureStorage(localStorage, {
    hash: function hash(key) {
        key = CryptoJS.SHA256(key, SECRET_KEY)

        return key.toString()
    },
    encrypt: function encrypt(data) {
        // data = typeof data === 'object'?JSON.stringify(data):data
        data = CryptoJS.AES.encrypt(data, SECRET_KEY)

        data = data.toString()

        return data;
    },
    decrypt: function decrypt(data) {
        data = CryptoJS.AES.decrypt(data, SECRET_KEY)
        try{
            data = data.toString(CryptoJS.enc.Utf8)
            if(!data){
                localStorage.clear()
                window.location.reload()    
            }
        }catch(err){
            localStorage.clear()
            window.location.reload()
        }
        // data = isJSON(data) ? JSON.parse(data) : data

        return data
    }
})
export default secureStorage