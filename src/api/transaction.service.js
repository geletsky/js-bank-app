import { query } from '@/core/query/query.lib'

export class TransactionService {
	#BASE_URL = '/transactions'

	getAll(onSuccess) {
		return query({
			path: this.#BASE_URL + `?${new URLSearchParams({
				orderBy: 'desc'
			})}`,
			onSuccess
		})
	}
}