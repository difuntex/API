"use strict";
const isAdminHelper = async (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (user.profile) {
        if (user.profile != 1) {
          resolve(false);
        }
      }
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
};
const isSalesmanHelper = async (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (user.profile) {
        if (user.profile != 2) {
          resolve(false);
        }
      }
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  isAdminHelper,
  isSalesmanHelper,
};
