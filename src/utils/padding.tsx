import { ColumnCount } from 'constants'

const getContainerPaddingX = (width: number) => {
  if (width <= 640) {
    return 32
  }

  if (width <= 1024) {
    return 48
  }

  return 64
}

/**
 * Calculate the number of columns based on the width of the window.
 */
const getColumnCount = (width: number) => {
  const isMobile = width < 640

  if (isMobile) {
    return ColumnCount.MOBILE
  }

  const isTablet = width < 1024

  if (isTablet) {
    return ColumnCount.TABLET
  }

  const isLaptop = width < 1280

  if (isLaptop) {
    return ColumnCount.LAPTOP
  }

  return ColumnCount.DESKTOP
}

export { getContainerPaddingX, getColumnCount }
