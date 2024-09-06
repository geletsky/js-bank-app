import { NotFound } from '@/components/screens/not-found/not-found.component'

import { ROUTES } from './routes.data'
import { Layout } from '@/components/layout/layout.component'

export class Router {
	#routes
	#currentRoute

	constructor() {
		this.#routes = ROUTES
		this.#currentRoute = null
		this.layout = null

		this.#handleRouteChange()
	}

	getCurrentPath() {
		return window.location.pathname
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

		if (!this.layout) {
			this.layout = new Layout({
				router: this,
				children: component
			}).render()
			document.getElementById('app').innerHTML = this.layout
		} else {
			document.querySelector('main').innerHTML = component
		}
	}
}
