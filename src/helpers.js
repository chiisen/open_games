const clc = require("cli-color")
const fs = require("fs")

/**
 * 插入文字到 alter.sql
 *
 * @param {*} subPath
 * @param {*} insertText
 */
function appendAlterByFileName(subPath, fileName, insertText) {
  fs.appendFileSync(`${subPath}/${fileName}`, insertText, "utf8")
}

/**
 * 寫入 alter.sql
 *
 * @param {*} subPath
 * @param {*} insertText
 */
function writeAlter(subPath, insertText, fileName = undefined) {
  let alterName_ = "alter.sql"
  if (fileName) {
    alterName_ = fileName
  }
  fs.writeFileSync(`${subPath}/${alterName_}`, insertText, "utf8")
}

module.exports = { writeAlter, appendAlterByFileName }
