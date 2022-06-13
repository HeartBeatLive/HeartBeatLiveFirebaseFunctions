import userCreatedHandler from '../userCreatedHandler';
import graphqlClient from '../../utils/graphqlClient';
import firebaseFunctionsTest from 'firebase-functions-test';
import { testUser } from './utils';

const { wrap } = firebaseFunctionsTest();

jest.mock('../../utils/graphqlClient');
const mockClient = graphqlClient as jest.MockedClass<typeof graphqlClient>;

describe('User Created Handler', () => {
    it('should send event to server', () => {
        const expectedRequestData = {
            user: {
                email: "email@example.com",
                emailVerified: true,
                id: "userId"
            }
        };

        wrap(userCreatedHandler)(testUser);

        expect(mockClient).toBeCalledTimes(1);
        expect(mockClient.mock.calls[0][1]).toEqual(expectedRequestData);
    });
});