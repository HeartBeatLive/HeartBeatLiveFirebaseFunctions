import { UserRecord } from 'firebase-functions/v1/auth';

const testUser: UserRecord = {
    uid: 'userId',
    email: 'email@example.com',
    emailVerified: true,
    displayName: undefined,
    photoURL: undefined,
    phoneNumber: undefined,
    disabled: false,
    metadata: {
        creationTime: '2022-05-13T12:00',
        lastSignInTime: '2022-05-13T12:00',
        lastRefreshTime: null,
        toJSON() {
            return {};
        }
    },
    providerData: [],
    passwordHash: 'passwordHash',
    passwordSalt: 'passwordSalt',
    customClaims: {},
    tenantId: null,
    tokensValidAfterTime: undefined,
    multiFactor: undefined,
    toJSON() {
        return {};
    }
};

export { testUser };