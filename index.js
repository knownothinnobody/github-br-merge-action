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

    // LIST PRS for HEAD to BASE
    const { data } = await octokit.pulls.list({
      owner,
      repo,
      state: 'open',
      head,
      base,
    })

    // CREATE PR IF REQUIRED
    if (data.length === 0) {
      const result = await octokit.pulls.create({
        owner,
        repo,
        title,
        head,
        base,
      })
      console.log(result);
    } else {
      // GRAB THE APPROPRIATE NUMBER FROM EXISTING PR
      const { number } = data[0]
    }

    // MERGE PR
    try {
      octokit.pulls.merge({
        owner,
        repo,
        pull_number: number,
      })
    } catch(reason) {
      if (reason.message !== "No commits between master and dev") {
        throw Error(reason)
      } else {
        console.log("There is nothing to merge at the moment.")
      }
    }
    
  } catch (error) {
    core.setFailed(error);
  }
}

run()