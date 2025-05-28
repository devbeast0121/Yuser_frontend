export const initialState = {
    options: [],
    authUser: null,
};

export function reducer(state, action) {
    switch (action.type) {
        case "setOptions":
            return { ...state, options: action.payload };
        case "setAuthUser":
            return {...state, authUser: action.payload}
        default:
            throw new Error(`This reducer does not recognize action type of "${action.type}"`);
    }
}