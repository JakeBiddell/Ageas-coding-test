import { Dispatch } from "redux";
import { userActions } from "./slice";

export const getUsers = () => async (dispatch: Dispatch) => {
  dispatch(userActions.startGettingEntities());
  fetch("userlist.txt", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then(async (response) => {
      dispatch(userActions.finishGettingEntities(await response.json()));
    })
    .catch((er) => dispatch(userActions.errorGettingEntities(er)));
};
