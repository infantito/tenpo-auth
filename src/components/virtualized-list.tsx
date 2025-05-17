import { FixedSizeGrid } from 'react-window'
import type { ApiItem } from 'types'
import DataCard from './data-card'

interface VirtualizedListProps {
  items: ApiItem[]
  width: number
}

const VirtualizedList = ({ items, width }: VirtualizedListProps) => {
  // Calculate columns based on available width
  const getColumnCount = (width: number) => {
    if (width < 640) return 1 // Mobile
    if (width < 1024) return 2 // Tablet
    if (width < 1280) return 3 // Laptop
    return 4 // Desktop
  }

  const columnCount = getColumnCount(width)
  const rowCount = Math.ceil(items.length / columnCount)

  // Calculate best card width
  const cardWidth = width / columnCount
  const cardHeight = 200 // Fixed height for cards

  const Cell = ({
    columnIndex,
    rowIndex,
    style,
  }: {
    columnIndex: number
    rowIndex: number
    style: React.CSSProperties
  }) => {
    const itemIndex = rowIndex * columnCount + columnIndex

    if (itemIndex >= items.length) {
      return <div style={style} />
    }

    const item = items[itemIndex]

    return (
      <div
        style={{
          ...style,
          padding: '8px',
        }}
      >
        <DataCard item={item} />
      </div>
    )
  }

  return (
    <FixedSizeGrid
      columnCount={columnCount}
      columnWidth={cardWidth}
      height={800} // Fixed height or can be dynamic
      rowCount={rowCount}
      rowHeight={cardHeight}
      width={width}
    >
      {Cell}
    </FixedSizeGrid>
  )
}

export default VirtualizedList
