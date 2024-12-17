class ScrollObserver {
    constructor() {
        this.listeners = new Set()
        this.lastScrollY = window.scrollY
        this.ticking = false

        window.addEventListener('scroll', this.handleScroll.bind(this))
    }

    handleScroll() {
        if (!this.ticking) {
            window.requestAnimationFrame(() => {
                this.notifyListeners()
                this.ticking = false
            })
            this.ticking = true
        }
    }

    notifyListeners() {
        const currentScrollY = window.scrollY
        const direction = currentScrollY > this.lastScrollY ? 'down' : 'up'
        this.listeners.forEach(listener => listener(direction))
        this.lastScrollY = currentScrollY
    }

    subscribe(listener) {
        this.listeners.add(listener)
    }

    unsubscribe(listener) {
        this.listeners.delete(listener)
    }

}

const scrollObserver = new ScrollObserver()

export default scrollObserver