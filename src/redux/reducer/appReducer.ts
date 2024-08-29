import { ReducerAction, ReducerActionType } from '../utils/ReducerUtils';

export interface AppReducer {
    loggedIn: boolean;
    username: string;
}

const INITIAL_STATE: AppReducer = {
    loggedIn: false,
    username: '',
};

const appReducer = (state: AppReducer = INITIAL_STATE, action: ReducerAction) => {
    switch (action?.type) {
        case ReducerActionType.LOGIN:
            return {
                ...state,
                loggedIn: action?.payload?.loggedIn,
            };
        case ReducerActionType.UPDATE_USERNAME:
            return {
                ...state,
                username: action?.payload?.username,
            };
        case ReducerActionType.RESET_APP_PREFERENCES:
            return INITIAL_STATE;
        default:
            return state;
    }
};

export default appReducer;
