import validator from "validator";

export const trim = (value) => value.replace(/\s/gi, "");
export const validateUser = (user) => {
  const errors = [];
  if (!validator.isEmail(trim(user.email))) {
    errors.push("invalid email !!");
  }

  if (!validator.isMobilePhone(user.phone)) {
    errors.push("Invalid phone number");
  }
  if (errors.length) {
    return { errors, isError: true };
  } else {
    return { errors, isError: false };
  }
};

export const validateLoginUser = (user) => {
  const errors = [];
  if (!trim(user.email) || !trim(user.password)) {
    errors.push("all input are required!");
  }
  if (!validator.isEmail(trim(user.email))) {
    errors.push("invalid email !!");
  }

  if (errors.length) {
    return { errors, isError: true };
  } else {
    return { errors, isError: false };
  }
};
