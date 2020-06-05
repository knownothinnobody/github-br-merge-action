const core = require('@actions/core')
const github = require('@actions/github')

async function run() {
  try {
    // GET INPUTS
    const token = core.getInput('token')
    const [owner, repo] = core.getInput('repository').split('/')
    const head =  `${owner}:${core.getInput('branch')}`
    const base = core.getInput('target_branch')

    // SET OCTOKIT
    const octokit = github.getOctokit(token)

    // GET GITHUB CONTEXT
    const title = `Merge ${head} to ${base}`

    // CREATE PR
    const { number } = await octokit.pulls.create({
      owner,
      repo,
      title,
      head,
      base,
    })

    // MERGE PR
    await octokit.pulls.merge({
      owner,
      repo,
      pull_number: number,
    })
    
  } catch (error) {
    core.setFailed(error);
  }
}

run()