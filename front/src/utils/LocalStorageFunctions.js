export const setTokenToLocalStorage = token => {
  localStorage.setItem("token", token);
};
export const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};
export const deleteTokenFromLocalStorage = () => {
  return localStorage.removeItem("token");
}