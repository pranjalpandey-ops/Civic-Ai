import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore';

import { auth, db } from '../firebase/config';


// ============================================================
// COLLECTION
// ============================================================

const ACCESS_REQUESTS_COLLECTION =
  'accessRequests';

const USERS_COLLECTION =
  'users';


// ============================================================
// GET CURRENT FIREBASE USER
// ============================================================

function getCurrentUser() {

  const currentUser =
    auth.currentUser;

  if (!currentUser) {

    throw new Error(
      'You must be signed in.'
    );

  }

  return currentUser;
}


// ============================================================
// CREATE ACCESS REQUEST
// ============================================================

export async function createAccessRequest({
  name,
  email,
  requestedRole,
}) {

  const currentUser =
    getCurrentUser();

  const uid =
    currentUser.uid;


  // ----------------------------------------------------------
  // Validate role
  // ----------------------------------------------------------

  if (
    requestedRole !== 'ADMIN' &&
    requestedRole !== 'AUTHORITY'
  ) {

    throw new Error(
      'Invalid access request role.'
    );

  }


  // ----------------------------------------------------------
  // User information
  // ----------------------------------------------------------

  const userName =
    name ||
    currentUser.displayName ||
    'User';

  const userEmail =
    email ||
    currentUser.email ||
    '';


  if (!userEmail) {

    throw new Error(
      'User email is required.'
    );

  }


  // ----------------------------------------------------------
  // Firestore collection
  // ----------------------------------------------------------

  const requestsRef =
    collection(
      db,
      ACCESS_REQUESTS_COLLECTION
    );


  // ----------------------------------------------------------
  // Check duplicate pending request
  // ----------------------------------------------------------

  const existingQuery =
    query(

      requestsRef,

      where(
        'uid',
        '==',
        uid
      ),

      where(
        'requestedRole',
        '==',
        requestedRole
      ),

      where(
        'status',
        '==',
        'pending'
      )

    );


  const existingSnapshot =
    await getDocs(
      existingQuery
    );


  if (!existingSnapshot.empty) {

    throw new Error(
      `You already have a pending ${requestedRole.toLowerCase()} access request.`
    );

  }


  // ----------------------------------------------------------
  // Create request
  // ----------------------------------------------------------

  const requestData = {

    createdAt:
      serverTimestamp(),

    email:
      userEmail,

    name:
      userName,

    requestedRole:
      requestedRole,

    reviewedAt:
      null,

    reviewedBy:
      '',

    status:
      'pending',

    uid:
      uid,

  };


  const documentReference =
    await addDoc(
      requestsRef,
      requestData
    );


  return {

    id:
      documentReference.id,

    ...requestData,

  };

}


// ============================================================
// GET CURRENT USER'S REQUESTS
// ============================================================

export async function getUserAccessRequests() {

  const currentUser =
    getCurrentUser();

  const uid =
    currentUser.uid;


  const requestsRef =
    collection(
      db,
      ACCESS_REQUESTS_COLLECTION
    );


  const requestsQuery =
    query(

      requestsRef,

      where(
        'uid',
        '==',
        uid
      )

    );


  const snapshot =
    await getDocs(
      requestsQuery
    );


  return snapshot.docs.map(
    (document) => ({

      id:
        document.id,

      ...document.data(),

    })
  );

}


// ============================================================
// GET PENDING ACCESS REQUESTS
// ============================================================

export async function getPendingAccessRequests() {

  getCurrentUser();


  const requestsRef =
    collection(
      db,
      ACCESS_REQUESTS_COLLECTION
    );


  const requestsQuery =
    query(

      requestsRef,

      where(
        'status',
        '==',
        'pending'
      )

    );


  const snapshot =
    await getDocs(
      requestsQuery
    );


  return snapshot.docs.map(
    (document) => ({

      id:
        document.id,

      ...document.data(),

    })
  );

}


// ============================================================
// APPROVE ACCESS REQUEST
// ============================================================

export async function approveAccessRequest(
  requestId
) {

  if (!requestId) {

    throw new Error(
      'Request ID is required.'
    );

  }


  const currentUser =
    getCurrentUser();


  // ----------------------------------------------------------
  // Get request
  // ----------------------------------------------------------

  const requestRef =
    doc(
      db,
      ACCESS_REQUESTS_COLLECTION,
      requestId
    );


  const requestSnapshot =
    await getDoc(
      requestRef
    );


  if (!requestSnapshot.exists()) {

    throw new Error(
      'Access request not found.'
    );

  }


  const requestData =
    requestSnapshot.data();


  // ----------------------------------------------------------
  // Make sure request is still pending
  // ----------------------------------------------------------

  if (
    requestData.status !==
    'pending'
  ) {

    throw new Error(
      'This access request has already been reviewed.'
    );

  }


  // ----------------------------------------------------------
  // Validate requested role
  // ----------------------------------------------------------

  const requestedRole =
    requestData.requestedRole;


  if (
    requestedRole !== 'ADMIN' &&
    requestedRole !== 'AUTHORITY'
  ) {

    throw new Error(
      'Invalid requested role.'
    );

  }


  // ----------------------------------------------------------
  // Applicant UID
  // ----------------------------------------------------------

  const applicantUid =
    requestData.uid;


  if (!applicantUid) {

    throw new Error(
      'Applicant user ID is missing.'
    );

  }


  // ----------------------------------------------------------
  // Prevent approving yourself
  // ----------------------------------------------------------

  if (
    applicantUid ===
    currentUser.uid
  ) {

    throw new Error(
      'You cannot approve your own access request.'
    );

  }


  // ----------------------------------------------------------
  // Get applicant profile
  // ----------------------------------------------------------

  const applicantRef =
    doc(
      db,
      USERS_COLLECTION,
      applicantUid
    );


  const applicantSnapshot =
    await getDoc(
      applicantRef
    );


  if (!applicantSnapshot.exists()) {

    throw new Error(
      'Applicant user profile was not found.'
    );

  }


  // ----------------------------------------------------------
  // Prepare batch
  // ----------------------------------------------------------
  //
  // TWO things happen together:
  //
  // 1. accessRequests/{requestId}
  //      status = approved
  //
  // 2. users/{applicantUid}
  //      role = ADMIN / AUTHORITY
  //
  // ----------------------------------------------------------

  const batch =
    writeBatch(db);


  // Update request

  batch.update(
    requestRef,
    {

      status:
        'approved',

      reviewedBy:
        currentUser.uid,

      reviewedAt:
        serverTimestamp(),

    }
  );


  // Update applicant role

  batch.update(
    applicantRef,
    {

      role:
        requestedRole,

    }
  );


  // ----------------------------------------------------------
  // Commit both changes
  // ----------------------------------------------------------

  await batch.commit();


  return {

    success:
      true,

    uid:
      applicantUid,

    role:
      requestedRole,

  };

}


// ============================================================
// REJECT ACCESS REQUEST
// ============================================================

export async function rejectAccessRequest(
  requestId
) {

  if (!requestId) {

    throw new Error(
      'Request ID is required.'
    );

  }


  const currentUser =
    getCurrentUser();


  const requestRef =
    doc(
      db,
      ACCESS_REQUESTS_COLLECTION,
      requestId
    );


  const requestSnapshot =
    await getDoc(
      requestRef
    );


  if (!requestSnapshot.exists()) {

    throw new Error(
      'Access request not found.'
    );

  }


  const requestData =
    requestSnapshot.data();


  if (
    requestData.status !==
    'pending'
  ) {

    throw new Error(
      'This access request has already been reviewed.'
    );

  }


  await updateDoc(
    requestRef,
    {

      status:
        'rejected',

      reviewedBy:
        currentUser.uid,

      reviewedAt:
        serverTimestamp(),

    }
  );


  return {

    success:
      true,

  };

}