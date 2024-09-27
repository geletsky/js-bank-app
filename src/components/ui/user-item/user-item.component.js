import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import * as styles from './user-item.module.scss'
import template from './user-item.template.html'
import { $R } from '@/core/rquery/rquery.lib'
import { formatUserName } from '@/utils/format/format-user-name'

export class UserItem extends ChildComponent {
	constructor(user, onClick) {
		super()

		if (!user) throw new Error('User should be passed!')
		if (!user?.avatarPath) throw new Error('User must have a "avatarPath"!')

		this.user = user
		this.onClick = onClick
    
	}

	#preventDefault(event) {
		event.preventDefault()
	}

	update({ avatarPath, name }) {
		if (avatarPath && name) {
			$R(this.element).find('img').attr('src', 'https://masterpiecer-images.s3.yandex.net/f9f26f6e597f11ee9aafaaafe6635749:upscaled').attr('alt', name)

			$R(this.element).find('span').text(formatUserName(name))
		}
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		this.update(this.user)

		$R(this.element).click(this.onClick || this.#preventDefault.bind(this))

		if (!this.onClick) $R(this.element).attr('disabled', '')

		return this.element
	}
}
