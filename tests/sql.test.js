import { describe, it, expect, vi, beforeEach } from "vitest"

vi.mock("58-toolkit", () => ({
  file: {
    writeAlter: vi.fn(),
  },
  excel: {
    getExcel: vi.fn(),
  },
  helpers: {
    isNumber: vi.fn(),
  },
}))

const { file, excel, helpers } = require("58-toolkit")
const { processSQL } = require("../src/sql")

const { getExcel } = excel
const { writeAlter } = file
const { isNumber } = helpers

describe("processSQL", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("應該產生正確的 SQL 語法", () => {
    const mockGameIdList = [1001, 1002]
    const mockHallCidList = ["CID001", "CID002"]

    getExcel.mockReturnValue(mockGameIdList)
    isNumber.mockReturnValue(true)
    writeAlter.mockReturnValue(undefined)

    processSQL(mockHallCidList)

    expect(writeAlter).toHaveBeenCalled()
    const callArgs = writeAlter.mock.calls[0]
    expect(callArgs[0]).toBe("./output/")
    expect(callArgs[1]).toContain("use game;")
    expect(callArgs[1]).toContain("INSERT INTO game_setting")
    expect(callArgs[1]).toContain("CID001")
    expect(callArgs[1]).toContain("CID002")
    expect(callArgs[2]).toBe("alter.sql")
  })

  it("應該跳過非數字的 gameId", () => {
    const mockGameIdList = [1001, "invalid", 1002]
    const mockHallCidList = ["CID001"]

    getExcel.mockReturnValue(mockGameIdList)
    isNumber.mockImplementation((val) => typeof val === "number")
    writeAlter.mockReturnValue(undefined)

    processSQL(mockHallCidList)

    expect(writeAlter).toHaveBeenCalled()
    const sqlContent = writeAlter.mock.calls[0][1]
    expect(sqlContent).not.toContain("invalid")
  })

  it("應該為每個 hallCid 和 gameId 組合產生 SQL", () => {
    const mockGameIdList = [1001, 1002]
    const mockHallCidList = ["CID001", "CID002"]

    getExcel.mockReturnValue(mockGameIdList)
    isNumber.mockReturnValue(true)
    writeAlter.mockReturnValue(undefined)

    processSQL(mockHallCidList)

    const sqlContent = writeAlter.mock.calls[0][1]
    const insertCount = (sqlContent.match(/INSERT INTO game_setting/g) || []).length
    expect(insertCount).toBe(4)
  })
})
