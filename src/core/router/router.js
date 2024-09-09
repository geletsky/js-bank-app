import { NotFound } from '@/components/screens/not-found/not-found.component'

import { ROUTES } from './routes.data'
import { Layout } from '@/components/layout/layout.component'
import { $R } from '@/core/rquery/rquery.lib';

export class Router {
	#routes
	#currentRoute
	#layout

	constructor() {
		this.#routes = ROUTES
		this.#currentRoute = null
		this.#layout = null

		window.addEventListener('popstate', () => {
			this.#handleRouteChange()
		})

		this.#handleRouteChange()
		this.#handleLinks()
	}

	#handleLinks() {
		document.addEventListener('click', event => {
			const target = event.target.closest('a')

			if (target) {
				event.preventDefault()
				this.navigate(target.href)
			}
		})
	}

	getCurrentPath() {
		return window.location.pathname
	}

	navigate(path) {
		if (path !== this.getCurrentPath()) {
			window.history.pushState({}, '0', path)
			this.#handleRouteChange()
		}
	}

	#handleRouteChange() {
		const path = this.getCurrentPath() || '/'
		let route = this.#routes.find(route => route.path === path)

		if (!route) {
			route = {
				component: NotFound
			}
		}

		this.#currentRoute = route
		this.#render()
	}

	#render() {
		const component = new this.#currentRoute.component().render()

		if (!this.#layout) {
			this.#layout = new Layout({
				router: this,
				children: component
			}).render()

			$R('#app').append(this.#layout)
		} else {
			$('#content').html('').append(component)
		}
	}
}
