const redux = require('redux');
const createStore = redux.createStore
const combine = redux.combineReducers
console.log('index.page')

const BUY_CAKE = "BUY";
const BUY_ICECREAM = "ICE"

function buyCake(){
    return{
        type:"BUY",
        info : 'First redux action'
    }
}

function buyIce(){
    return{
        type:"ICE",
        info : 'Second redux action'
    }
}

// const initialState = {
//     numOfcakes:10,
//     numOfIceCream:20
// }

// Multiple Reducers
const initialCakeCream = {
    numOfCake : 10,
}

const initialIceCream = {
    numOfIceCream : 20,
}

// const reducer = (state = initialState,action)=>{
//     switch(action.type){
//         case BUY_CAKE:return{
//             ...state,
//             numOfcakes : state.numOfcakes-1,
//         }

//         case BUY_ICECREAM:return{
//             ...state,
//             numOfIceCream : state.numOfIceCream-1,
//         }

//         default : return state
//     }
// }

const Cakereducer = (state = initialCakeCream,action)=>{
    switch(action.type){
        case BUY_CAKE:return{
            ...state,
            numOfcakes : state.numOfcakes-1,
        }
        default : return state
    }
}

const Icereducer = (state = initialIceCream,action)=>{
    switch(action.type){
        case BUY_ICECREAM:return{
            ...state,
            numOfIceCream : state.numOfIceCream-1,
        }
        default : return state
    }
}


const root = combine({iceCream:Icereducer,cake:Cakereducer})
const store = createStore(root)
console.log("Initial State ",store.getState())
const unsubscribe = store.subscribe(()=>console.log("Updated ",store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIce())
store.dispatch(buyIce())
unsubscribe()  


