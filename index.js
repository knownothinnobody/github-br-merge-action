const core = require('@actions/core')
const github = require('@actions/github')

async function run() {
  try {
    // GET INPUTS
    const token = core.getInput('token')
    const branch = core.getInput('branch')
    const targetBranch = core.getInput('target_branch')
    const repo =  core.getInput('repository')
    const owner = repo.split('/')[0]

    // SET OCTOKIT
    const octokit = github.getOctokit(token)

    // GET GITHUB CONTEXT
    const title = `Merge ${branch} to ${targetBranch}`

    console.log('owner:' + owner)
    console.log('repo:' + repo)
    console.log('title:' + title)
    console.log('head:' + branch)
    console.log('base:' + targetBranch)

    // CREATE PR
    // octokit.pulls.create({

    // })


  } catch (error) {
    core.setFailed(error.message);
  }
}

run()