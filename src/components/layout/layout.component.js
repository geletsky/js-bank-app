export class Layout {
	constructor({ router, children }) {
		this.router = router
		this.children = children
	}

	render() {
		const headerElement = '<header>Header</header>'
		return `
		${headerElement}
		<main>
		${this.children}
		</main>
		`
	}
}
