"use client"
// Function to handle Firebase errors
export default function handleSignupError(code){
    switch (code) {
    case 'auth/invalid-email':
      return 'The email address is not valid.';
    case 'auth/email-already-in-use':
      return 'This email is already in use.';
    case 'auth/user-disabled':
      return 'This user account has been disabled.';
    case 'auth/user-not-found':
      return 'No user found with this email.';
    case 'auth/wrong-password':
      return 'The password is incorrect.';
    case 'auth/weak-password':
      return 'The password is too weak.';
    case 'auth/operation-not-allowed':
      return 'Operation not allowed. Please contact support.';
    case 'auth/network-request-failed':
      return 'Network error. Please try again later.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';
    case 'auth/popup-closed-by-user':
      return 'The popup was closed before completing the sign-in.';
    case 'auth/cancelled-popup-request':
      return 'Popup request was canceled. Try again.';
    case 'auth/invalid-verification-code':
      return 'The verification code is not valid.';
    case 'auth/invalid-verification-id':
      return 'The verification ID is not valid.';
    case 'auth/requires-recent-login':
      return 'Please re-authenticate and try again.';
    case 'auth/credential-already-in-use':
      return 'This credential is already associated with another account.';
    case 'auth/account-exists-with-different-credential':
      return 'An account already exists with the same email but different sign-in credentials.';
    case 'auth/invalid-credential':
      return 'The credential is invalid.';
    case 'auth/missing-email':
      return 'Email address is required.';
    default:
      return `Unknown error: ${code}`;
  }
};