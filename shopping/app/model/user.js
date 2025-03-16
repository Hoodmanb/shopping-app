import db from '../lib/firebaseClient.js';

class User {
  constructor(brandName, location, number, isVerified, accountType) {
    this.brandName = brandName;
    this.location = location;
    this.number = number;
    this.isVerified = isVerified;
    this.accountType = accountType;
  }
}

// Firestore data converter
const UserConverter = {
  toFirestore(user) {
    return {
      brandName: user.brandName,
      location: user.location,
      number: user.number,
      isVerified: user.isVerified,
      accountType: user.accountType,
    };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return new User(data.brandName, data.location, data.number, data.isVerified, data.accountType);
  },
};

export const setUserData = (userId, obj) => {
  const {
    brandName = null, location, number, isVerified = false, accountType = 'buyer',
  } = obj;

  db.collection('users').doc(userId)
    .withConverter(UserConverter)
    .set(new User(brandName, location, number, isVerified, accountType)); // Only pass provided fields
};

export const verified = (userId, bool) => {
  db.collection('users').doc(userId)
    .withConverter(UserConverter)
    .set({
      isVerified: bool,
    }, { merge: true });
};

export const modifyUserData = (userId, field, value) => {
  const updateData = {};
  updateData[field] = value;

  db.collection('users').doc(userId)
    .withConverter(UserConverter)
    .update(updateData);
};
