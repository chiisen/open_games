const clc = require("cli-color")

const { getExcel } = require("./excel")
const { processSQL } = require("./sql")

const hallListSheet_ = getExcel("./input/HALL_LIST.xlsx", false, "HALL_LIST")
const hallCidList_ = []
hallListSheet_.forEach((row_) => {
  const hallCid_ = row_[0]

  if (hallCid_ != "Cid") {
    hallCidList_.push(hallCid_)
  }
})

processSQL(hallCidList_)

console.log(clc.red("程式結束!"))