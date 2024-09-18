import { query } from '@/core/query/query.lib'

export class UserService {
	#BASE_URL = '/users'

	getAll(searchTerm, onSuccess) {
		return query({
			path: `${this.#BASE_URL}${
				searchTerm
					? `?${new URLSearchParams({
							searchTerm
					  })}`
					: ''
			}`,
			onSuccess
		})
	}
}
