import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import * as styles from './transfer-field.module.scss'
import template from './transfer-field.template.html'
import { CardService } from '@/api/card.service'
import { NotificationService } from '@/core/services/notification.service'
import { $R } from '@/core/rquery/rquery.lib'
import { formatAmount } from '@/utils/format/format-amount'
import validationService from '@/core/services/validation.service'
import {
	BALANCE_UPDATED,
	TRANSACTION_COMPLETED
} from '@/constants/events.constants'
import { Field } from '@/components/ui/field/field.component'
import { Button } from '@/components/ui/button/button.component'
import { Store } from '@/core/store/store'

export class TransferField extends ChildComponent {
	constructor() {
		super()

		this.store = Store.getInstance().state
		this.cardService = new CardService()
		this.notificationService = new NotificationService()
	}

	#handleTransfer = event => {
		event.preventDefault()

		if (!this.store.user) {
			this.notificationService.show('error', 'You need Auth')
			return
		}

		$R(event.target).html('Sending...').attr('disabled', 'true')

		const inputCardElement = $R(this.element).find('input')
		const toCardNumber = inputCardElement.value().replaceAll('-', '')

		const reset = () => {
			$R(event.target).removeAttr('disabled').text('Send')
		}

		if (!toCardNumber) {
			this.notificationService.show('error', 'Enter the card number')
			validationService.showError($R(this.element).find('label'))
			reset()
			return
		}

		const inputAmountElement = $R(this.element).find('[type="number"]')
		let amount = inputAmountElement.value()

		this.cardService.transfer({ amount, toCardNumber }, () => {
			
			inputCardElement.value('')
			inputAmountElement.value('')
			amount = ''

			document.dispatchEvent(new Event(TRANSACTION_COMPLETED))
			document.dispatchEvent(new Event(BALANCE_UPDATED))
		})

		reset()
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				new Button({
					children: 'Send',
					onClick: this.#handleTransfer
				})
			],
			styles
		)

		$R(this.element)
			.find('#transfer-fields')
			.append(
				new Field({
					placeholder: 'xxxx-xxxx-xxxx-xxxx',
					name: 'card-number',
					variant: 'credit-card'
				}).render()
			)
			.append(
				new Field({
					placeholder: 'Enter amount',
					type: 'number',
					name: 'card-amount'
				}).render()
			)

		// $R(this.element)
		// 	.find('input')
		// 	.input({
		// 		onInput: event => {
		// 			const formattedAmount = formatAmount(event.target.value)
		// 			event.target.value = formattedAmount
		// 		}
		// 	})

		return this.element
	}
}
