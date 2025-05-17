import type { ApiItem } from './api'

type DataCardProps = {
  item: ApiItem
}

type VirtualizedListProps = {
  items: ApiItem[]
  width: number
}

type CellProps = {
  columnIndex: number
  rowIndex: number
  style: React.CSSProperties
}

type HomeListProps = {
  loading: boolean
  error: string
  items: ApiItem[]
}

export type { DataCardProps, VirtualizedListProps, CellProps, HomeListProps }
