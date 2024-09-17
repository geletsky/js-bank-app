import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import * as styles from './header.module.scss'
import template from './header.template.html'

import { Search } from './search/search.component'
import { UserItem } from '@/components/ui/user-item/user-item.component'

export class Header extends ChildComponent {
	constructor() {
		super()
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

		return this.element
	}
}
