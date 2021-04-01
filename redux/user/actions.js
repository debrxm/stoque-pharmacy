import { ActionTypes } from "./types";

export const toggleHasNoty = (hasNoty) => ({
  type: ActionTypes.TOGGLE_HAS_NOTY,
  payload: hasNoty,
});
export const setCurrentUser = (user) => ({
  type: ActionTypes.SET_CURRENT_USER,
  payload: user,
});
