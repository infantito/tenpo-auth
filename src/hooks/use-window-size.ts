import * as React from 'react'
import type { WindowSize } from 'types'

const useWindowSize = () => {
  const [windowSize, setWindowSize] = React.useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  React.useEffect(() => {
    /**
     * Update the window size state on resize
     */
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

export default useWindowSize
