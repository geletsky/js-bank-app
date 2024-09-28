import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import * as styles from './statistics-item.module.scss'
import template from './statistics-item.template.html'
import { $R } from '@/core/rquery/rquery.lib'
import { statisticsIcons } from '@/constants/icons.constants'

export class StatisticsItem extends ChildComponent {
	constructor(label, value) {
		super()

		if (!label || !value) {
			throw new Error('Label, value must be required!')
		}

		this.label = label
		this.value = value
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		const statisticsIconElement = $R(this.element).find('#statistics-icon')
		statisticsIconElement.addSVG(statisticsIcons[this.label])

		$R(this.element).find('#statistics-label').text(this.label)
		$R(this.element).find('#statistics-value').text(this.value)

		return this.element
	}
}
