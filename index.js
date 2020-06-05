const core = require('@actions/core')
const github = require('@actions/github')

async function run() {
  try {
    // GET INPUTS
    const token = core.getInput('token')
    const [owner, repo] = core.getInput('repository').split('/')
    const head =  `${owner}:${core.getInput('branch')}`
    const base = core.getInput('target_branch')
    const silentFail = core.getInput('silent_fail')

    // SET OCTOKIT
    const octokit = github.getOctokit(token)

    // GET GITHUB CONTEXT
    const title = `Merge ${head} to ${base}`

    // LIST PRS for HEAD to BASE
    const { data } = await octokit.pulls.list({
      owner,
      repo,
      state: 'open',
      head,
      base,
    })

    if (data.length !== 0) return

    // CREATE PR IF REQUIRED
    const result = await octokit.pulls.create({
      owner,
      repo,
      title,
      head,
      base,
    })

    console.log(result.data);
    console.log(result.data.number);
    const pull_number =  result.data.number

    // MERGE PR
    try {
      await octokit.pulls.merge({
        owner,
        repo,
        pull_number,
      })
    } catch {
      await octokit.pulls.update({
        owner,
        repo,
        pull_number,
        state: 'closed',
      })
      if (!silentFail) throw new Error('unable to merge')
    }
    
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()