"use strict";
const is = async (user, type) => {
  return new Promise(async (resolve, reject) => {
    try {
      switch (user.profile) {
        case 1:
          if (type === "admin") {
            resolve(true);
          } else {
            resolve(false);
          }
          break;
        case 2:
          if (type === "salesman") {
            resolve(true);
          } else {
            resolve(false);
          }
          break;
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  is,
};
