// import { createStore } from 'https://cdn.skypack.dev/redux';

// rewritten code for the createStore function
function createStore1(reducer) {
    let state = reducer(undefined, {});
    const subscribers = [];

    return {
        subscribe(subscriber) {
            subscribers.push(subscriber);
            return function unsubscribe() {
                listeners = listeners.filter(l => l !== listener);
            };
        },
        getState() {
            return state;
        },
        dispatch(action) {
            state = reducer(state, action)
            subscribers.forEach(subscriber => {
                subscriber()
            });
        }
    }
}
function createStore(reducer, initialState) {
    let state = initialState;
    let listeners = [];

    function getState() {
        return state;
    }

    function dispatch(action) {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    }

    function subscribe(listener) {
        listeners.push(listener);

        return function unsubscribe() {
            listeners = listeners.filter(l => l !== listener);
        };
    }

    return {
        getState,
        dispatch,
        subscribe
    };
}

function counter(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + action.payload
        case 'DECREMENT':
            return state - action.payload
        default:
            return state
    }
}

let store = createStore(counter, 0)

// Actions
function deposit(payload) {
    return {
        type: 'INCREMENT',
        payload
    }
}
function withdraw(payload) {
    return {
        type: 'DECREMENT',
        payload
    }
}

// DOM events
const clickDeposit = document.querySelector('#deposit');
const clickWithdraw = document.querySelector('#withdraw');


// Event handler
clickDeposit.onclick = () => {
    store.dispatch(deposit(10));
}
clickWithdraw.onclick = () => {
    store.dispatch(withdraw(10));
}

// Lister
const listener = () => {
    render();
    console.log('State changed:', store.getState());
};

const subscription = store.subscribe(listener);

// Render
function render() {
    const output = document.querySelector('#output');
    output.innerText = store.getState();
}
render();

