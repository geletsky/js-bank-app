import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import * as styles from './card-info.module.scss'
import template from './card-info.template.html'
import { CardService } from '@/api/card.service'
import { Store } from '@/core/store/store'
import { NotificationService } from '@/core/services/notification.service'
import { $R } from '@/core/rquery/rquery.lib'
import { formatCardNumber } from '@/utils/format/format-card-number'
import { formatToCurrency } from '@/utils/format/format-to-currency'
import { formatUserName } from '@/utils/format/format-user-name'
import { BALANCE_UPDATED } from '@/constants/events.constants'

export class CardInfo extends ChildComponent {
	constructor() {
		super()
		this.store = Store.getInstance()
		this.cardService = new CardService()
		this.notificationService = new NotificationService()

		this.element = renderService.htmlToElement(template, [], styles)
	}

	#addListeners() {
		document.addEventListener(BALANCE_UPDATED)
	}

	#copyCardNumber = event => {
		navigator.clipboard
			.writeText(event.target.innerText)
			.then(this.notificationService.show('success', 'Card number copied'))
	}

	fillElements() {
		// $R(this.element).html(
		// 	renderService.htmlToElement(template, [], styles).innerHTML
		// )

		console.log(this.card)

		$R(this.element)
			.find('#card-amount')
			.text(formatToCurrency(this.card.balance))

		$R(this.element)
			.find('#card-number')
			.text(formatCardNumber(this.card.number))
			.click(this.#copyCardNumber)

		$R(this.element)
			.find('#card-user-name')
			.text(formatUserName(this.store.state.user.name))

		$R(this.element).find('#card-expire-date').text(this.card.expireDate)
	}

	fetchData() {
		this.cardService.byUser(data => {
			if (data?.id) {
				this.card = data
				this.fillElements()
				this.store.updateCard(data)
			} else {
				this.store.updateCard(null)
			}
		})
	}

	render() {
		if (this.store.state.user) this.fetchData()

		return this.element
	}
}
