enum ReducerActionType {
    RESET_APP_PREFERENCES = 'RESET_APP_PREFERENCES',
    LOGIN = 'LOGIN',
    UPDATE_USERNAME = 'UPDATE_USERNAME',
}

interface ReducerAction {
    type: ReducerActionType;
    payload?: any;
}

const Reducers = {
    app: 'app',
    session: 'session',
};

export { ReducerActionType, type ReducerAction, Reducers };
