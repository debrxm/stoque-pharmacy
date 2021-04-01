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
      hasBranch: false,
      hasSubcribedBefore: false,
      isSubscribed: false,
      subExpireDate: "",
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
export const createShopCasheirProfile = async (data, shopId) => {
  const { cashierId } = data;

  const cashierRef = firestore.doc(`shop/${shopId}/cashiers/${cashierId}`);

  try {
    await cashierRef.set(data);
  } catch (error) {
    console.log("error creating user", error.message);
  }
};

const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
