import { SET_OBJECTIVE } from '../types'

const initialState = {}

export default (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case SET_OBJECTIVE:
            return { ...payload }
        default:
            return state;
    }
}

