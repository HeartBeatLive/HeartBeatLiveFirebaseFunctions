import { auth, logger } from "firebase-functions";
import { UserRecord } from "firebase-functions/v1/auth";
import graphqlRequest from "../utils/graphqlClient";

const deleteUserQuery = `
    mutation DeleteUser($userId: ID!) {
        firebaseDeleteUser(userId: $userId)
    }
`;

const userDeletedHandler = auth.user().onDelete(async (user: UserRecord) => {
    logger.info(`Sending info to server, that user ${user.displayName || '<no_name>'} [${user.uid}] was deleted.`)
    return graphqlRequest(deleteUserQuery, { userId: user.uid });
});

export default userDeletedHandler;
