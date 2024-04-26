#!/usr/bin/env node

import prompts from 'prompts'
import remoteCode from './remoteCode.js'
import { getConf } from './repolist.js'

const repolist = getConf()
const choices = repolist.map((item, index) => {
  const { title } = item
  return { title, value: index }
})
const promptsOptions = [
  {
    type: 'text',
    name: 'name',
    message: '请输入项目名称',
  },
  {
    type: 'select', //单选
    name: 'template',
    message: '请选择项目模板',
    choices,
  },
]

const reopLKist = getConf()

const getUserInfo = async () => {
  const res = await prompts(promptsOptions)
  if (!res.template || !res.name) {
    return
  }
  const source = repolist[res.template].url
  const reop = `direct:${source}`
  remoteCode(reop, res.name, { clone: true })
}

getUserInfo()
