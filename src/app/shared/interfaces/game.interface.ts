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
  delayForPainting: number,
  delayForPlayer: number,
  delayBetweenPaintingAndPlayer: number,
  winScore: number,
}