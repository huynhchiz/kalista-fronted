import store from "../redux/store";

import errorSlice from "../slices/errorSlice";

export const dispatchSetError = (status) =>  {
    store.dispatch(errorSlice.actions.setStatus(status))
}