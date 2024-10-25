import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import * as styles from './transaction-item.module.scss'
import template from './transaction-item.template.html'
import { $R } from '@/core/rquery/rquery.lib'
import { formatDate } from '@/utils/format/format-to-date'
import { formatToCurrency } from '@/utils/format/format-to-currency'

export class TransactionItem extends ChildComponent {
	constructor(transaction) {
		super()

		this.transaction = transaction
	}
	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		const isIncome = this.transaction.type === 'TOP_UP'
		const name = isIncome ? 'Income' : 'Expense'

		const iconElement = $R(this.element).find('#transaction-icon')

		if (isIncome) {
			iconElement.addClass(styles.income)
		}

		$R(this.element).find('#transaction-name').text(name)

		$R(this.element).find('#transaction-id').text('#' + this.transaction.id)

		$R(this.element)
			.find('#transaction-date')
			.text(formatDate(this.transaction.createdAt))
      
		$R(this.element)
			.find('#transaction-amount')
			.text(formatToCurrency(this.transaction.amount))

		return this.element
	}
}
