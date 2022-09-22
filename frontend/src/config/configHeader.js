export const jsonHeaderConfig = (token) => {
  if (token !== null) {
    return {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  }

  return {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
};

export const formDataHeaderConfig = (token) => {
  return {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
};
