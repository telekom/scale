# Scale Visual Tests

## Prerequisites
We use Jest to run tests on a headless Chrome driven by Puppeteer. As there might be visual differences - expecially around font rendering -  between operating systems, we run our tests in a Docker container to ensure the same results throughout different environments.

So in order to run the tests on your computer, your need Docker running on your system.
The easies way to do that is to install [Docker Desktop](https://www.docker.com/products/docker-desktop).

We take visual snapshots of the components rendered in our Storybook, so you are going to need to have Stories ready to work with.

## Adding new tests
- Take an existing test as an example 
- Change the title, story names in the `test.each` block and the url pointing to an iframe in Storybook.
- Read the [Jest Puppeteer Docs](https://github.com/smooth-code/jest-puppeteer) to learn details about writing tests with this setup. 
- Consult the [Puppeteer Docs](https://github.com/puppeteer/puppeteer/blob/v5.0.0/docs/api.md) for all the possibilities driving the test browser.
- You might want to interact with a specific element - having an instance of Storybook running and [using your Dev Tools to copy the JS Path](https://umaar.com/dev-tips/185-copy-js-path/) comes really hand in these cases - especially when Shadow DOM is involved.
- Run the tests: `yarn test` - it might take a while for the first run to build the Docker container. The upcoming runs will be faster.
- Verify the new images in `packages/visual-tests/src/__image_snapshots__` to see if they look as expected.
- Check in the new snapshot images and test file(s) to GIT.
- Profit

## Updating existing snapshots after a planned visual change
Just run the tests again with the `-u` flag: `yarn test -u`.

## Checking for failing tests
After a failed run, Jest will put the differences in a folder, so you can inspect: `packages/visual-tests/src/__image_snapshots__/__diff_output__/` 

For HTML report, check: `packages/visual-tests/report/`

## Checking the test results in CI:
Let's assume the `build-pr / visual-tests (pull_request)` check failed after you pushed to GitHub and you want to see what went wrong.

- Click on the `Show all checks` link close to the bottom of the Pull Request Page.
- Click the `Details` link of the `build-pr / visual-tests (pull_request)` item.
- Look for the `Artifacts (1)` button around the top right of your screen on the test run log page and click it.
- Download artifact `diff-output`.

