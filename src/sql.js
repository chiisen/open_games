const { file, excel, helpers } = require("58-toolkit")
const { writeAlter } = file
const { getExcel } = excel
const { isNumber } = helpers

function processSQL(hallCidList) {
  const gameIdListSheet_ = getExcel("./input/gameIdList.xlsx", false, "gameIdList")

  let sql_ = "use game;"

  hallCidList.forEach((cid_) => {
    gameIdListSheet_.forEach((gameId_) => {
      if (isNumber(gameId_)) {
        sql_ += `
INSERT INTO game_setting (GameId,Cid,Upid,Hallid,RTPid,DenomsSetting,DenomsRunning,Amount,Sw,AutoSpinEnable,ExchangeEnable,JackpotEnable,AutoSpinJson,Denom_default,ExchangeJson) VALUES (${gameId_},'${cid_}','-1','-1',7,'13,14,15,16,17,18,19,20','13,14,15,16,17,18,19,20',0,1,1,1,1,'{\"showLimits\":[true,true,true,true,true],\"spins\":[10,50,100,500,999,-1],\"jackpot\":[80000000,1000000,500000,100000,50000,10000,5000,1000,500],\"single\":[80000000,1000000,500000,100000,50000,10000,5000,1000,500],\"loss\":[80000000,1000000,500000,100000,50000,10000,5000,1000,500],\"bet\":[80000000,1000000,500000,100000,50000,10000,5000,1000,500]}','1:1','{\"exCredit\":true,\"exDenom\":true}') ON DUPLICATE KEY UPDATE DenomsSetting = '13,14,15,16,17,18,19,20';`
      }
      else{
        //console.error(`cid_: ${cid_}, gameId_: ${gameId_} is not Number.`)
      }
    })
  })

  writeAlter("./output/", sql_, `alter.sql`)

  //console.log(sql_)
}

module.exports = { processSQL }
