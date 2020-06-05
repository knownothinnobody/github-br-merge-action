const core = require('@actions/core')
const github = require('@actions/github')

async function run() {
  try {
    // GET INPUTS
    const token = core.getInput('token')
    const branch = core.getInput('branch')
    const targetBranch = core.getInput('target_branch')

    // SET OCTOKIT
    const octokit = github.getOctokit(token)

    // GET GITHUB CONTEXT
    const context = github.context

    console.log(context);

    // CREATE PR
    // octokit.pulls.create({

    // })


  } catch (error) {
    core.setFailed(error.message);
  }
}

run()