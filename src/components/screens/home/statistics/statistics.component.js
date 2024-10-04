import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import * as styles from './statistics.module.scss'
import template from './statistics.template.html'
import { Store } from '@/core/store/store'
import { StatisticService } from '@/api/statistic.service'
import { StatisticsItem } from './statistics-item/statistics-item.component'
import { formatToCurrency } from '@/utils/format/format-to-currency'
import { TRANSACTION_COMPLETED } from '@/constants/events.constants'
import { $R } from '@/core/rquery/rquery.lib'
import { Heading } from '@/components/ui/heading/heading.component'

export class Statistics extends ChildComponent {
	constructor() {
		super()

		this.store = Store.getInstance().state
		this.statisticService = new StatisticService()

		this.element = renderService.htmlToElement(template, [new Heading('Analytics')], styles)

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
		this.statisticService.main(data => {
			if (!data) return
			const statisticsItemsElement = $R(this.element).find('#statistics-items')
			statisticsItemsElement.text('')

			statisticsItemsElement
				.append(
					new StatisticsItem(
            'Income', 
            formatToCurrency(data[0].value || 0)
          ).render()
				)
				.append(
					new StatisticsItem(
						'Expense',
						formatToCurrency(data[1].value || 0)
					).render()
				)
				.append(
					new StatisticsItem(
						'Total Money',
						formatToCurrency(this.store.user.card.balance)
					).render()
				)
				.append(
					new StatisticsItem(
						'You Saved',
						formatToCurrency(data[0].value - data[1].value)
					).render()
				)
		})
	}

	render() {
    if (this.store.user) this.fetchData()

		return this.element
	}
}
