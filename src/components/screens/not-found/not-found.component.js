import { BaseScreen } from '@/core/components/base-screen.component'

export class NotFound extends BaseScreen {
	constructor() {
		super({ title: 'Not Found' })
	}
	render() {
		return '<p>Not Found</p>'
	}
}
