import * as core from '@actions/core'
import * as os from 'os'
import * as path from 'path'
import {copyFile} from './copy'

async function run(): Promise<void> {
  const [owner, repo] = core.getInput('source-repo').split('/')

  try {
    core.setOutput(
      'path',
      await copyFile({
        owner,
        repo,
        srcPath: core.getInput('source-path'),
        ref: core.getInput('source-ref'),
        dstPath:
          core.getInput('destination-path') ||
          path.join(os.homedir(), '.tflint.hcl'),
        token: core.getInput('token')
      })
    )
  } catch (err) {
    if (err instanceof Error || typeof err === 'string') {
      return core.setFailed(err)
    }

    throw err
  }
}

run()
