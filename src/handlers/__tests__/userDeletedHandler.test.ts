import userDeletedHandler from '../userDeletedHandler';
import graphqlClient from '../../utils/graphqlClient';
const firebaseFunctionsTest = require('firebase-functions-test');
import { testUser } from './utils';

const { wrap } = firebaseFunctionsTest();

jest.mock('../../utils/graphqlClient');
const mockClient = graphqlClient as jest.MockedFunction<typeof graphqlClient>;

describe('User Delete Handler', () => {
    it('should send event to server', () => {
        const expectedRequestData = { userId: 'userId' };

        wrap(userDeletedHandler)(testUser);

        expect(mockClient).toBeCalledTimes(1);
        expect(mockClient.mock.calls[0][1]).toEqual(expectedRequestData);
    });
});