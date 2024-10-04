import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import * as styles from './contacts.module.scss'
import template from './contacts.template.html'
import { TransferField } from './transfer-field/transfer-field.component'
import { Store } from '@/core/store/store'
import { UserService } from '@/api/user.service'
import { $R } from '@/core/rquery/rquery.lib'
import { UserItem } from '@/components/ui/user-item/user-item.component'
import { formatCardNumberWithDashes } from '@/utils/format/format-card-number'
import { TRANSFER_FIELD_SELECTOR } from '@/constants/transfer.constants'
import { Heading } from '@/components/ui/heading/heading.component'

export class Contacts extends ChildComponent {
	constructor() {
		super()
		this.store = Store.getInstance().state
		this.userService = new UserService()
	}

	fetchData() {
		this.userService.getAll(null, data => {
			if (!data) return

			for (const user of data) {
				$R(this.element)
					.find('#contacts-list')
					.append(
						new UserItem(user, () => {
							$R(TRANSFER_FIELD_SELECTOR).value(
								formatCardNumberWithDashes(user.card.number)
							)
						}).render()
					)
			}
		})
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[new Heading('Quick Transactions'), TransferField],
			styles
		)

		if (this.store.user) {
			setTimeout(() => this.fetchData(), 500)
		}

		return this.element
	}
}
