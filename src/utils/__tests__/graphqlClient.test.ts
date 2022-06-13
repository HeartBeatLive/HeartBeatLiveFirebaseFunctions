import graphqlClient from "../graphqlClient";
import fetch, { RequestInit } from 'node-fetch';
import { logger } from "firebase-functions";
import { RequestOptions } from 'http';

jest.mock('node-fetch');
const mockFetch = fetch as jest.MockedClass<typeof fetch>;

describe('GraphQL Client', () => {
    const env = process.env;
    afterEach(() => {
        process.env = env;
    });

    it('should finish successfuly', async () => {
        mockFetch.mockReturnValueOnce(Promise.resolve({
            text: () => Promise.resolve('{}')
        }));

        await graphqlClient('query {}', { a: 1, b: 2 });

        expect(fetch).toBeCalledTimes(1);
        expect(mockFetch.mock.calls[0][0]).toEqual('http://server.com/graphql');

        const requestParams = mockFetch.mock.calls[0][1] as RequestInit;
        expect(requestParams.method).toEqual('POST')
        expect(requestParams.headers).toEqual({
            'Authorization': 'simple-firebase-function-token',
            'Content-Type': 'application/graphql+json'
        })
        expect(JSON.parse(requestParams.body!.toString()))
            .toEqual({ query: 'query {}', variables: { a: 1, b: 2 } })
        expect(requestParams.agent).not.toBeNull();
    });

    it('should log an error', async () => {
        mockFetch.mockReturnValueOnce(Promise.resolve({
            text: () => Promise.resolve('{"errors": [{"a": 1}]}')
        }));
        const mockErrorLogger = jest.spyOn(logger, "error");

        await graphqlClient('query {}', { a: 1, b: 2 });
        expect(mockErrorLogger).toBeCalledTimes(1);
    });

    it('should use different agent based on schema', async () => {
        mockFetch.mockReturnValue(Promise.resolve({
            text: () => Promise.resolve('{}')
        }));

        await graphqlClient('query {}', { a: 1, b: 2 });
        const requestInit = mockFetch.mock.calls[0][1] as RequestInit;
        const agentBuilder = requestInit.agent as ((parsedUrl: URL) => RequestOptions['agent']);

        const httpFirstAgent = agentBuilder({ protocol: 'http:' } as URL);
        const httpSecondAgent = agentBuilder({ protocol: 'http:' } as URL);
        const httpsAgent = agentBuilder({ protocol: 'https:' } as URL);

        expect(httpFirstAgent).toBe(httpSecondAgent);
        expect(httpFirstAgent).not.toBe(httpsAgent);
    });
});