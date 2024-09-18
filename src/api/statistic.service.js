import { query } from '@/core/query/query.lib'

export class StatisticService {
	#BASE_URL = '/statistics'

	main(onSuccess) {
		return query({
			path: this.#BASE_URL,
			onSuccess
		})
	}
}