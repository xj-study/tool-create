import ora from 'ora'
import download from 'download-git-repo'
import chalk from 'chalk'
export default (reop, name, opts) => {
  const downSpinner = ora('正在下载模板中...').start()
  return new Promise((resolve, reject) => {
    download(reop, name, opts, (err) => {
      if (err) {
        // 失败了
        downSpinner.fail()
        console.log('err', chalk.red(err))
        reject(err)
        return
      }
      downSpinner.succeed(chalk.green('模板下载成功'))
      resolve()
    })
  })
}
