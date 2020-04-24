import * as appConstants from '../../../constantsAndUtils/AppConstants'

if (localStorage.getItem(appConstants.TRANSACTION) == null) {
    localStorage.setItem(appConstants.TRANSACTION, JSON.stringify([]))
}
let initState = {
    currentId: -1,
    list: JSON.parse(localStorage.getItem(appConstants.TRANSACTION))
}

function transactionReducer(state = initState, action) {
    let list = JSON.parse(localStorage.getItem(appConstants.TRANSACTION))
    switch (action.type) {
        case appConstants.INSERT:
            list.push(action.payload)
            localStorage.setItem(appConstants.TRANSACTION, JSON.stringify(list))
            return {list: list, currentId: -1}

        case appConstants.UPDATE:
            list[state.currentId] = action.payload
            localStorage.setItem(appConstants.TRANSACTION, JSON.stringify(list))
            return {list: list, currentId: -1}

        case appConstants.DELETE:
            list.splice(action.payload, 1)
            localStorage.setItem(appConstants.TRANSACTION, JSON.stringify(list))
            return {list: list, currentId: -1}

        case appConstants.UPDATE_INDEX:
            return {list: list, currentId: action.payload}

        case appConstants.UPDATE_LIST:
            return {list: action.payload, currentId: -1}
    }

    return state
}

export default transactionReducer