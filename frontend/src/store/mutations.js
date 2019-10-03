import { deleteTokenFromLocalStorage } from "../utils/LocalStorageFunctions";

export default {
  setUser(state, user) {
    state.user = { ...user };
    state.isAdmin = user.role === 0 ? true : false;
  },
  deleteUser(state) {
    state.user = null;
    deleteTokenFromLocalStorage();
  }
};
