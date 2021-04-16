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
};
export const CompleteStoreSetup = async (data, userId) => {
  const userRef = firestore.doc(`users/${userId}`);

  try {
    await userRef.update(data);
  } catch (error) {
    console.log("error", error.message);
  }
};
export const CreateShopCasheirProfile = async (data) => {
  const { id, shopId } = data;
  const employeeRef = firestore.doc(`cashiers/${shopId}/cashiers/${id}`);
  try {
    await employeeRef.set(data);
  } catch (error) {
    console.log("error creating cashier", error.message);
  }
};
