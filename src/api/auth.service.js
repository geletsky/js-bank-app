import { query } from '@/core/query/query.lib'
import { NotificationService } from '@/core/services/notification.service'
import { Store } from '@/core/store/store'

export class AuthService {
	#BASE_URL = '/auth'

	constructor() {
		this.store = Store.getInstance()
		this.notificationService = new NotificationService()
	}

	main(type, body) {
		return query({
			path: `${this.#BASE_URL}/${type}`,
			method: 'POST',
			body,
			onSuccess: data => {
				this.store.login(data.user, data.accessToken)
				this.notificationService.show(
					'success',
					'You have successfully logged in!'
				)
			}
		})
	}
}
