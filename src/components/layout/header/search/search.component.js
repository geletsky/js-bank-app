import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import * as styles from './search.module.scss'
import template from './search.template.html'
import { $R } from '@/core/rquery/rquery.lib'
import { UserService } from '@/api/user.service'
import { UserItem } from '@/components/ui/user-item/user-item.component'
import { debounce } from '@/utils/debounce.util'

export class Search extends ChildComponent {
	constructor() {
		super()
		this.userService = new UserService()
	}

	#handleSearch = async event => {
		const searchTerm = event.target.value
		const searchResultElement = $R(this.element).find('#search-results')

		if (!searchTerm) {
			searchResultElement.html('')
			return
		}

		await this.userService.getAll(searchTerm, users => {
			searchResultElement.html('')

			users.forEach((user, index) => {
				const userItem = new UserItem(user, () => {
					searchResultElement.html('')
          console.log('da');
				}).render()

				$R(userItem)
					.addClass(styles.item)
					.style('transition-delay', `${index * 0.1}s`)

				searchResultElement.append(userItem)

				setTimeout(() => {
					$R(userItem).addClass(styles.visible)
				}, 50)
			})
		})
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		const debounceHandleSearch = debounce(this.#handleSearch, 300)

		$R(this.element)
			.find('input')
			.input({
				type: 'search',
				name: 'search',
				placeholder: 'Search contacts...'
			})
			.on('input', debounceHandleSearch)

		return this.element
	}
}
