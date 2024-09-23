import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import * as styles from './header.module.scss'
import template from './header.template.html'

import { Search } from './search/search.component'
import { UserItem } from '@/components/ui/user-item/user-item.component'
import { Store } from '@/core/store/store'
import { $R } from '@/core/rquery/rquery.lib'
import { LogoutButton } from '@/components/ui/logout-button/logout-button.component'
import { formatUserName } from '@/utils/format/format-user-name'

export class Header extends ChildComponent {
	constructor({ router }) {
		super()

		this.store = Store.getInstance()
		this.store.addObserver(this)

		this.router = router

		this.userItem = new UserItem({
			avatarPath:
				'/'
		})
	}

	update() {
		this.user = this.store.state.user
		const rightSide = $R(this.element).find('#right-side')

		if (this.user) {
			rightSide.show()
			this.userItem.update(this.user)

			$R(this.element)
				.find('h2')
				.text(`Hello, ${formatUserName(this.user.name)} 👋`)

			$R(this.element).find('span').hide()

			this.router.navigate('/')
		} else {
			$R(this.element).find('h2').text('Bank.io')
			rightSide.hide()
		}
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				Search,
				new LogoutButton({ router: this.router }),
				this.userItem,
			],
			styles
		)

		this.update()

		return this.element
	}
}
