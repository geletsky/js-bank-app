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
	}

	update() {
		this.user = this.store.state.user
		const rightSide = $R(this.element).find('#right-side')

		if (this.user) {
			rightSide.show()
			$R(this.element)
				.find('h2')
				.text(`Hello, ${formatUserName(this.user.name)} 👋`)
			this.router.navigate('/')
			console.log(this.user.name);
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
				new UserItem({
					avatarPath:
						'https://r2.erweima.ai/imgcompressed/img/compressed_95f6dc695351dbb5cf511ee473897718.webp'
				}),
				new LogoutButton({ router: this.router })
			],
			styles
		)

		this.update()

		return this.element
	}
}
