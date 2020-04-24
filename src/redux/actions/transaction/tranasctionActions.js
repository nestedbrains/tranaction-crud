import * as appConstants from '../../../constantsAndUtils/AppConstants'

export const insert = data => {
    return {
        type: appConstants.INSERT,
        payload: data
    }
}
export const update = data => {
    return {
        type: appConstants.UPDATE,
        payload: data
    }
}

export const remove = data => {
    return {
        type: appConstants.DELETE,
        payload: data
    }
}


export const updateIndex = data => {
    return {
        type: appConstants.UPDATE_INDEX,
        payload: data
    }
}

export const updateList = data => {
    return {
        type: appConstants.UPDATE_LIST,
        payload: data
    }
}