export default function(query: string, variables: Record<string, any>) {
    const url = process.env.GRAPHQL_ENDPOINT as string;
    const token = process.env.GRAPHQL_ENDPOINT_TOKEN as string

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/graphql+json',
            'Authorization': token
        },
        body: JSON.stringify({ query, variables })
    });
}