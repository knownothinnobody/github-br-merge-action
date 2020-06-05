const core = require('@actions/core')
const github = require('@actions/github')

async function run() {
  try {
    // GET INPUTS
    const token = core.getInput('token')
    const repo =  core.getInput('repository')
    const owner = repo.split('/')[0]
    const head =  `${owner}:${core.getInput('branch')}`
    const base = core.getInput('target_branch')

    // SET OCTOKIT
    const octokit = github.getOctokit(token)

    // GET GITHUB CONTEXT
    const title = `Merge ${head} to ${base}`

    console.log('owner:' + owner)
    console.log('repo:' + repo)
    console.log('title:' + title)
    console.log('head:' + head)
    console.log('base:' + base)

    // CREATE PR
    const result = await octokit.pulls.create({
      owner,
      repo,
      title,
      head,
      base,
    })

    console.log(result);

    // MERGE PR



  } catch (error) {
    core.setFailed(error);
  }
}

run()