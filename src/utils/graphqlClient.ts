import { logger } from "firebase-functions";
import fetch from "node-fetch";
import * as http from 'node:http';
import * as https from 'node:https';

const agentOptions = { keepAlive: true };
const httpAgent = new http.Agent(agentOptions);
const httpsAgent = new https.Agent(agentOptions);

export default async function(query: string, variables: Record<string, any>) {
    const endpointUrl = process.env.GRAPHQL_ENDPOINT as string;
    const token = process.env.GRAPHQL_ENDPOINT_TOKEN as string;

    const resp = await fetch(endpointUrl, {
        method: 'POST',
        body: JSON.stringify({ query, variables }),
        headers: {
            'Content-Type': 'application/graphql+json',
            'Authorization': token
        },
        agent: parsedUrl => parsedUrl.protocol === 'http:' ? httpAgent : httpsAgent
    });

    const respBody = await resp.text();
    const json: any = JSON.parse(respBody);
    if (json.errors != undefined && json.errors != null && json.errors.length > 0) {
        logger.error(`Server returned an error response: ${respBody}`);
    }
}