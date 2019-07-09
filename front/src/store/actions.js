const jwt = require("jsonwebtoken");

import xhr from "../utils/fetch";
import { setTokenToLocalStorage } from "../utils/LocalStorageFunctions";

export default {
  login(context, { values, success, error, t }) {
    xhr
      .post("/login", values).then(response => {
        const token = response.token;

        const payload = jwt.decode(token);
        setTokenToLocalStorage(token);
        context.commit("setUser", payload);
        success();
      })
      .catch((err) => {
        if (err.status === 500) {
          error(t("errors.server_error"));
          return;
        } else if (err.response.error === "not found") {
          error(t("errors.user_not_found"));
          return;
        } else {
          error(t("errors.wrong_password"));
          return;
        }
      })
  }
}
