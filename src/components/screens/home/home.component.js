import { BaseScreen } from '@/core/component/base-screen.component'
import renderService from '@/core/services/render.service'

import template from './home.template.html'
import * as styles from './home.module.scss'
import { CardInfo } from './card-info/card-info.component'
import { Actions } from './actions/actions.component'
import { Contacts } from './contacts/contacts.component'
import { Transactions } from './transactions/transactions.component'
import { Statistics } from './statistics/statistics.component'

export class Home extends BaseScreen {
	constructor() {
		super({ title: 'Home' })
	}
	render() {
		const element = renderService.htmlToElement(
			template,
			[CardInfo, Actions, Contacts, Transactions, Statistics],
			styles
		)

		return element
	}
}
