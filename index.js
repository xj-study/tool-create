#!/usr/bin/env node

import prompts from 'prompts'
import remoteCode from './remoteCode.js'
import { getConf } from './repolist.js'

const repolist = getConf()
const choices = repolist.map((item, index) => {
  item.value = index
  return item
})
const promptsOptions = [
  {
    type: 'text',
    name: 'name',
    message: '请输入项目名称',
    initial: 'project',
  },
  {
    type: 'select', //单选
    name: 'template',
    message: '请选择项目模板',
    choices,
  },
  {
    type: 'text', //单选
    name: 'branch',
    message: '请输入项目模板分支',
    initial: 'main',
  },
]

const getUserInfo = async () => {
  const res = await prompts(promptsOptions)
  const branch = res.branch || 'main'
  const source = repolist[res.template].url
  const reop = `direct:${source}#${branch}`
  remoteCode(reop, res.name, { clone: true })
}

getUserInfo()
