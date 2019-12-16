import fetch from 'node-fetch';
import url from 'url';

export async function getGithubData(filePath: string, parsedMarkdown: any) {
  const since = new Date('2018-06-01').toISOString();

  try {
    const request = await fetch(url.format({
      protocol: 'https',
      hostname: 'api.github.com',
      pathname: 'repos/telekom/telements/commits',
      query: {
        access_token: process.env.GITHUB_TOKEN,
        since: since,
        path: filePath
      }
    }));

    const commits = await request.json();

    console.log('commits', commits)

    const contributors = Array.from(new Set(commits.map(commit => {
      if (commit && commit.author && commit.author.login) {
        return commit.author.login;
      }
      return null;
    }))).filter(l => typeof l === 'string');

    // const contributors = Array.from(new Set(commits.map(commit => commit.author.login)));
    const lastUpdated = commits.length ? commits[0].commit.author.date : since;

    const attributes = parsedMarkdown.attributes = parsedMarkdown.attributes || {};
    attributes.lastUpdated = lastUpdated;

    attributes.contributors = attributes.contributors || [];

    contributors.forEach(contributor => {
      if (!attributes.contributors.includes(contributor)) {
        attributes.contributors.push(contributor);
      }
    });

    console.log('filePath:', filePath, 'contributors:', attributes.contributors.length, 'lastUpdated:', lastUpdated);

  } catch (e) {
    console.log(e);
  }

  return parsedMarkdown;
}
