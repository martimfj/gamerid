// This file handles data manipulation

import store from './store'
import {EventEmitter} from 'events'

const emitter = new EventEmitter();
emitter.setMaxListeners(20)

const baseUrl = 'http://localhost:8080/api/'

var user = { 
    id : null ,
    email : null,
    username : null,
    password : null,
    riot : null,
    steam : null,
    battlenet : null,
    discord : null
}

export default window.auth = {
    login : (username,password,callback) => {
        console.log('Logging in with',username,password)
        var url = baseUrl + 'login?username=' + username + '&password=' + password;
        console.log(password)
        fetch(url).then((response) => {
            var data = response.json().then((data) => {
                if (data.username !== null) {
                    console.log( '[Auth] Auth Successful',data)
                    localStorage.setItem('user',JSON.stringify(data))
                    user = data
                } else {
                    console.log('[Auth] Auth failed,error ' + data)
                }
            callback(data)
            window.location.reload()
            })
        })
    },

    getSavedUser : (callback) => {
        let localStorageUser = localStorage.getItem('user')
        if(localStorageUser){
            user = JSON.parse(localStorageUser)
            user = localStorageUser
            console.log('[Auth] Retreived user from last session',user)
            callback(user)
        }
    },

    getUser : () => {
        return user
    },

    register : (email,username,password,steam,riot,battlenet,discord,callback) => {
        console.log('Registering with',username,password)
        fetch(baseUrl + 'addUser?username=' + username + '&password=' + password + '&email=' + email + '&steam=' + steam + '&riot=' + riot + '&battlenet=' + battlenet + '&discord=' + discord)
            .then((response) => {
            var data = response.json().then((data) => {
                if (data.username !== null) {
                    console.log( '[Auth] Register Successful ',data)
                    localStorage.setItem('user',JSON.stringify(data))
                    user = data
                } else {
                    console.log('[Auth] Auth failed,error ' + data)
                }
                // callback(data)
            })
        })
    },

    logout : () => {
        localStorage.removeItem('user')
        window.location.reload()
    }


}