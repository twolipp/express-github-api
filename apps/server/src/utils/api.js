const GITHUB_GQL_ENDPOINT = "https://api.github.com/graphql";
const gqlFetch = require("graphql-fetch")(GITHUB_GQL_ENDPOINT);

async function githubFetch(query, token) {
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });

  return gqlFetch(
    query,
    {},
    {
      headers,
      method: "POST",
    }
  );
}

async function githubFetchContributorsForPage(repoOwner, repoName, token) {
  const res = await githubFetch(
    `
    query {
      repository(owner:"${repoOwner}", name:"${repoName}") {
        issues(last:2, states:CLOSED) {
          edges {
            node {
              title
              url
                     }
                }
            }
        }
    }
    `,
    token
  );


  // if data is not as expected (usually from a Github API error) just return an empty array
  if (
    !(
      res &&
      res.data &&
      res.data.repository &&
      res.data.repository.issues.edges &&
      Array.isArray(res.data.repository.issues.edges)
    )
  ) {
    console.warn(
      `The Github API didn't return the expected data, returning an empty contributor array. res: ${JSON.stringify(
        res,
        null,
        2
      )}`
    );
    return [];
  }
  const { edges } = res.data.repository.issues;
  return edges;
}


module.exports = {
  githubFetch,
  githubFetchContributorsForPage,
};
