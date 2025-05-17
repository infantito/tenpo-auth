import { FixedSizeGrid } from 'react-window'

import DataCard from './data-card'
import type { CellProps, VirtualizedListProps } from 'types'
import { CARD_DIMENSIONS } from 'constants'
import { getColumnCount } from 'utils'

const VirtualizedList = (props: VirtualizedListProps) => {
  const { items, width } = props

  const columnCount = getColumnCount(width)

  const rowCount = Math.ceil(items.length / columnCount)

  /**
   * Calculate card width accounting for padding
   */
  const availableWidth = width

  const cardWidth = Math.floor(availableWidth / columnCount)

  const Cell = (cellProps: CellProps) => {
    const { columnIndex, rowIndex, style } = cellProps

    const itemIndex = rowIndex * columnCount + columnIndex

    if (itemIndex >= items.length) {
      return <div style={style} />
    }

    const item = items[itemIndex]

    return (
      <div
        style={{
          ...style,
          padding: CARD_DIMENSIONS.PADDING / 2,
          width: cardWidth,
          height: CARD_DIMENSIONS.HEIGHT,
        }}
      >
        <DataCard item={item} />
      </div>
    )
  }

  return (
    <div className="w-full overflow-hidden mx-auto">
      <FixedSizeGrid
        columnCount={columnCount}
        columnWidth={cardWidth}
        height={800}
        rowCount={rowCount}
        rowHeight={CARD_DIMENSIONS.HEIGHT}
        width={width}
        className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
      >
        {Cell}
      </FixedSizeGrid>
    </div>
  )
}

export default VirtualizedList
