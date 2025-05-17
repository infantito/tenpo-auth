enum ColumnCount {
  MOBILE = 1,
  TABLET = 2,
  LAPTOP = 3,
  DESKTOP = 4,
}

const CARD_DIMENSIONS = {
  /**
   * Fixed height for cards
   */
  HEIGHT: 260,
  /**
   * 8px padding on each side
   */
  PADDING: 16,
} as const

export { ColumnCount, CARD_DIMENSIONS }
