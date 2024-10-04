import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import * as styles from './actions.module.scss'
import template from './actions.template.html'
import { Store } from '@/core/store/store'
import { CardService } from '@/api/card.service'
import { NotificationService } from '@/core/services/notification.service'
import { Field } from '@/components/ui/field/field.component'
import { $R } from '@/core/rquery/rquery.lib'
import { Button } from '@/components/ui/button/button.component'
import validationService from '@/core/services/validation.service'
import { BALANCE_UPDATED } from '@/constants/events.constants'
import { formatAmount } from '@/utils/format/format-amount'
import { Heading } from '@/components/ui/heading/heading.component'

export class Actions extends ChildComponent {
	constructor() {
		super()

		this.store = Store.getInstance().state
		this.cardService = new CardService()
		this.notificationService = new NotificationService()
	}

	updateBalance(event, type) {
		event.preventDefault()

		if (!this.store.user) {
			this.notificationService.show('error', 'You need authorization')
			return
		}

		$R(event.target).text('Sending').attr('disabled, true')

		const inputElement = $R(this.element).find('input')
		const amount = inputElement.value().replace(/[\s$]/g, '')

		if (!amount) {
			this.notificationService.show('error', 'Enter the amount')
			validationService.showError($R(this.element).find('label'))
			return
		}

		this.cardService.updateBalance(amount, type, () => {
			inputElement.value('')

			const balanceUpdatedEvent = new Event(BALANCE_UPDATED)
			document.dispatchEvent(balanceUpdatedEvent)
		})

		$R(event.target).removeAttr('disabled').text(type)
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				new Heading('Balance management'),
				new Field({
					placeholder: 'Enter the amount',
					name: 'amount',
					type: 'text',
					isGray: 'gray'
				})
			],
			styles
		)

		$R(this.element)
			.find('#action-buttons')
			.append(
				new Button({
					children: 'Top-Up',
					onClick: event => this.updateBalance(event, 'top-up')
				}).render()
			)
			.append(
				new Button({
					children: 'Withdrawal',
					onClick: event => this.updateBalance(event, 'withdrawal')
				}).render()
			)

		$R(this.element)
			.find('input')
			.input({
				onInput: event => {
					const formattedAmount = formatAmount(event.target.value)
					event.target.value = formattedAmount
				}
			})

		return this.element
	}
}
