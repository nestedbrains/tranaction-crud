import React from 'react';
import TransactionList from "./components/TransactionList";
import {Provider} from 'react-redux'
import store from "./redux/store";


function App() {
    return (
        <Provider store={store}>
            <TransactionList/>
        </Provider>
    );
}

export default App;
