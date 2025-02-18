const redux = require('redux');
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const thunk = require('redux-thunk').default
const axios = require('axios');


const initialState = {
    loading:false,
    users:[],
    error:''
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

const fetchuserRequest=()=>{
    return{
        type:FETCH_USERS_REQUEST
    }
}

const fetchuserSuccess=()=>{
    return{
        type:FETCH_USERS_SUCCESS,
        users: payload
    }
}

const fetchuserFailure=()=>{
    return{
        type:FETCH_USERS_FAILURE,
        payload:error
    }
}
const reducer=(state = initialState,action)=>{
    switch(action.type){
        case FETCH_USERS_REQUEST:
            return{
                ...state,
                loading:true
            }
        case FETCH_USERS_SUCCESS : 
            return{
                loading:false,
                users:action.payload,
                error:''
            }
        case FETCH_USERS_FAILURE:
            return{
                 loading:false,
                 users:[],
                 error:action.payload
            }
    }
}

const fetchUsers =()=>{
    return function(dispatch){
        axios.get('https://jsonplaceholder.typicode.com/users').then(response=>{
            const users = response.data.map(user=>user.id)
            dispatch(fetchuserSuccess(users));
        }).catch(error=>{
            dispatch(fetchuserFailure(users));
        })
    }
}
const store = createStore(reducer,applyMiddleware(thunk));
store.subscribe(()=>{console.log(store.getState())})
store.dispatch(fetchUsers);