const initialState = {
    loader: false,
};
const loaderReducer = (state = initialState, action) => {
    switch (action.type) {
        // case type.TOGGLE_LOADER:
        //     return {
        //         ...state,
        //         loader: !state.loader,
        //     };

        default:
            return state;
    }
};

export default loaderReducer;
