import { query } from '@/core/query/query.lib'
import { NotificationService } from '@/core/services/notification.service'

export class AuthService {
	#BASE_URL = '/auth'

	constructor() {
		this.notificationService = new NotificationService()
	}

	main(type, body) {
		return query({
			path: `${this.#BASE_URL}/${type}`,
			method: 'POST',
			body,
			onSuccess: data => {
				this.notificationService.show(
					'success',
					'You have successfully logged in!'
				)
			}
		})
	}
}
