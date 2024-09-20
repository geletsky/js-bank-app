import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import * as styles from './header.module.scss'
import template from './header.template.html'

import { Search } from './search/search.component'
import { UserItem } from '@/components/ui/user-item/user-item.component'
import { Store } from '@/core/store/store'
import { $R } from '@/core/rquery/rquery.lib'

export class Header extends ChildComponent {
	constructor({ router }) {
		super()

		this.store = Store.getInstance()
    this.store.addObserver(this)

		this.router = router

		console.log(router);
	}

	update() {
		this.user = this.store.state.user

		const rightSide = $R(this.element).find('#side')

		console.log(this.user);

		if (this.user) {
			rightSide.show()
			this.router.navigate('/')
		} else {
			rightSide.hide()
		}
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				Search,
				new UserItem({
					avatarPath:
						'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png',
					name: 'Nikita Arnautovich'
				})
			],
			styles
		)

		this.update()

		return this.element
	}
}
