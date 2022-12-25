export interface ICellData {
  id: number,
  status: string,
}

export interface ICellStatuses {
  default: string,
  availableCell: string,
  playerCell: string,
  computerCell: string,
}

export interface ISettingsGame {
  countCells: number,
  delayMs: number,
  winScore: number,
}