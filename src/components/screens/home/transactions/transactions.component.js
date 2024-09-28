import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import * as styles from './transactions.module.scss'
import template from './transactions.template.html'
import { Store } from '@/core/store/store'
import { TransactionService } from '@/api/transaction.service'
import { TRANSACTION_COMPLETED } from '@/constants/events.constants'
import { TransactionItem } from './transaction-item/transaction-item.component'
import { $R } from '@/core/rquery/rquery.lib'

export class Transactions extends ChildComponent {
	constructor() {
		super()
		this.store = Store.getInstance().state
		this.transactionService = new TransactionService()

		this.element = renderService.htmlToElement(template, [], styles)

		this.#addListeners()
	}

	#addListeners() {
		document.addEventListener(
			TRANSACTION_COMPLETED,
			this.#onTransactionCompleted
		)
	}

	#removeListeners() {
		document.removeEventListener(
			TRANSACTION_COMPLETED,
			() => this.#onTransactionCompleted
		)
	}

	#onTransactionCompleted = () => {
		this.fetchData()
	}

	destroy() {
		this.#removeListeners()
	}

	fetchData() {
		this.transactionService.getAll(data => {
			if (!data) return

			const transactionList = $R(this.element).find('#transactions-list')
			transactionList.text('')

			if (data.length) {
				for (const transaction of data.transactions) {
					transactionList.append(new TransactionItem(transaction).render())
				}
			} else {
				transactionList.text('Transactions not found!')
			}
		})
	}

	render() {
		if (this.store.user) {
			this.fetchData()
		}
		return this.element
	}
}
