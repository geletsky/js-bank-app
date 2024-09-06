export class Layout {
	constructor({ router, children }) {
		this.router = router
		this.children = children
	}

	render() {
		const headerElement = `
		<header>
			<a href="/">Home</a>
			<a href="/auth">Auth</a>
		</header>
		`

		return `
		${headerElement}
		<main>
		${this.children}
		</main>
		`
	}
}
