import { deleteTokenFromLocalStorage } from "../utils/LocalStorageFunctions";

export default {
  setUser(state, user) {
    state.user = { ...user };
  },
  deleteUser(state) {
    state.user = null;
    deleteTokenFromLocalStorage();
  }
};
