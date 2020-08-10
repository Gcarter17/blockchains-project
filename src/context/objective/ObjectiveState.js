import React, { useReducer } from "react";
import ObjectiveContext from "./objectiveContext";
import objectiveReducer from "./objectiveReducer";

import {
    SET_OBJECTIVE

} from "../types";

const ObjectiveState = ({ children }) => {
    const initialState = {
        options: false,
        populate: false,
        substringBold: false,
        inputBold: false,
        hoverHighlight: false,
        navigable: false,
        outsideClose: false
    }

    const [state, dispatch] = useReducer(objectiveReducer, initialState);

    // const setAlert = () => {
    const setObjective = (item) => {
        dispatch({
            type: SET_OBJECTIVE,
            payload: item
        });
    }

    return (
        <ObjectiveContext.Provider
            value={{
                objective: state,
                setObjective
            }}
        >
            {children}
        </ObjectiveContext.Provider>
    );
};

export default ObjectiveState;
