const { writeAlter } = require("./helpers")

function processSQL(hallCidList) {
  let sql_ = ""

  hallCidList.forEach((cid_) => {
    //const gameIdList_ = [200531, 200532, 200533, 200534, 200535, 200536] // 魚機
    const gameIdList_ = [
      220101, 220102, 220103, 220104, 220105, 220106, 220107, 220108, 220109, 220110, 220111, 220112, 220113, 220114,
      220115, 220116, 220117, 220118, 220120, 220121, 220122, 220123, 220124,
    ] // 新增 23 款遊戲

    gameIdList_.forEach((gameId_) => {
      sql_ += `
INSERT INTO game_setting (GameId,Cid,Upid,Hallid,RTPid,DenomsSetting,DenomsRunning,Amount,Sw,AutoSpinEnable,ExchangeEnable,JackpotEnable,AutoSpinJson,Denom_default,ExchangeJson) VALUES (${gameId_},'${cid_}','-1','-1',7,'13,14,15,16,17,18,19,20','13,14,15,16,17,18,19,20',0,1,1,1,1,'{\"showLimits\":[true,true,true,true,true],\"spins\":[10,50,100,500,999,-1],\"jackpot\":[80000000,1000000,500000,100000,50000,10000,5000,1000,500],\"single\":[80000000,1000000,500000,100000,50000,10000,5000,1000,500],\"loss\":[80000000,1000000,500000,100000,50000,10000,5000,1000,500],\"bet\":[80000000,1000000,500000,100000,50000,10000,5000,1000,500]}','1:1','{\"exCredit\":true,\"exDenom\":true}') ON DUPLICATE KEY UPDATE DenomsSetting = '13,14,15,16,17,18,19,20';`
    })
  })

  writeAlter("./output/", sql_, `alter.sql`)

  //console.log(sql_)
}

module.exports = { processSQL }
