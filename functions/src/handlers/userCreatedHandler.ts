import { auth, logger } from "firebase-functions";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import graphqlRequest from "../utils/graphqlClient";

const registerUserQuery = `
    mutation CreateUser($user: FirebaseCreateUserRequest!) {
        firebaseCreateUser(request: $user)
    }
`;

const userCreatedHandler = auth.user().onCreate(async (user: UserRecord) => {
    logger.info(`Sending info to server about registered user with id '${user.uid}'`);
    const userInput = {
        id: user.uid,
        email: user.email,
        emailVerified: user.emailVerified
    };
    return graphqlRequest(registerUserQuery, { user: userInput });
});

export default userCreatedHandler;