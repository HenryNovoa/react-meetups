import { useEffect, useState } from 'react'
import scrollObserver from '../utils/ScrollObserver'

function useScrollDirection() {
    const [scrollDirection, setScrollDirection] = useState('up')

    useEffect(() => {
        scrollObserver.subscribe(setScrollDirection)
        return () => scrollObserver.unsubscribe(setScrollDirection)
    }, [])

    return scrollDirection
}

export default useScrollDirection