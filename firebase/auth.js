import firebase, { auth, firestore } from "./config";

export const createShopAdminProfile = async (userAuth, otherProps) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { fullname, phone } = otherProps;
    const { email, emailVerified, uid, photoUri } = userAuth;
    const createdAt = Date.now();
    const userData = {
      id: uid,
      firstName: fullname.split(" ")[0],
      lastName: fullname.split(" ")[1],
      phone,
      email,
      createdAt: createdAt,
      profileImage: photoUri || "",
      isProfileSetupCompleted: false,
      hasSubcribedBefore: false,
      isSubscribed: false,
      subExpireDate: "",
      subExpireTimestamp: "",
      emailVerified,
    };
    try {
      auth.currentUser.sendEmailVerification();
      await userRef.set(userData);
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};
export const CompleteStoreSetup = async (data, userId) => {
  const userRef = firestore.doc(`users/${userId}`);

  try {
    await userRef.update(data);
  } catch (error) {
    console.log("error", error.message);
  }
};
export const UpdateShopInfo = async (data, userId) => {
  const userRef = firestore.doc(`users/${userId}`);
  try {
    await userRef.update(data);
  } catch (error) {
    console.log("error", error.message);
  }
};
export const CreateShopCasheirProfile = async (data, shopId) => {
  const { id } = data;
  const cashierRef = firestore.doc(`cashiers/${shopId}/cashiers/${id}`);
  try {
    await cashierRef.set(data);
  } catch (error) {
    console.log("error creating cashier", error.message);
  }
};
export const UpdateCashierProfile = async (data, shopId) => {
  const { id } = data;
  const cashierRef = firestore.doc(`cashiers/${shopId}/cashiers/${id}`);
  try {
    await cashierRef.update(data);
  } catch (error) {
    console.log("error creating cashier", error.message);
  }
};
export const OnArchiveCashier = async (data, shopId, navigation) => {
  const batch = firestore.batch();
  const { id } = data;
  const cashierRef = firestore.doc(`cashiers/${shopId}/cashiers/${id}`);
  const archiveRef = firestore.doc(
    `archived_cashiers/${shopId}/archived_cashiers/${id}`
  );
  batch.set(archiveRef, data).delete(cashierRef);
  try {
    await batch.commit();
    navigation.goBack();
  } catch (error) {
    console.log(
      "An error occured while trying to archive cashier",
      error.message
    );
  }
};
export const OnDeleteCashier = async (id, shopId) => {
  const batch = firestore.batch();
  const cashierRef = firestore.doc(`cashiers/${shopId}/cashiers/${id}`);
  const cashierStatsRef = firestore.doc(`cashier_stats/${id}`);
  batch.delete(cashierRef).delete(cashierStatsRef);
  try {
    await batch.commit();
  } catch (error) {
    console.log(
      "An error occured while trying to delete cashier",
      error.message
    );
  }
};
