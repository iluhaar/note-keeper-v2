const checkIsLoggedIn = () => {
  const user = localStorage.getItem("user");
  if (user) {
    return true;
  }

  return false;
};

const mainRoute = () => {
  const isLoggedIn = checkIsLoggedIn();

  return { isLoggedIn };
};

export { mainRoute };
