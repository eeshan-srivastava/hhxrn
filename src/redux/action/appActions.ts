import { AppReducer } from '../reducer/appReducer';
import { store } from '../store';
import { ReducerActionType } from '../utils/ReducerUtils';

const resetAppPreferences = () => {
    store.dispatch({
        type: ReducerActionType.RESET_APP_PREFERENCES,
    });
};

const logIn = () => {
    store.dispatch({
        type: ReducerActionType.LOGIN,
        payload: {
            loggedIn: true,
        },
    });
};

const updateUsername = (username: string) => {
    store.dispatch({
        type: ReducerActionType.UPDATE_USERNAME,
        payload: {
            username: username,
        },
    });
};

const getUsername = () => {
    const app = store.getState()?.app as any;
    return app?.username;
};

const isLoggedIn = () => {
    const app = store.getState()?.app as any;
    return app?.loggedIn;
};

export default {
    resetAppPreferences,
    logIn,
    updateUsername,
    getUsername,
    isLoggedIn,
};
