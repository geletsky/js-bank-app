import { COLORS } from '@/config/colors.config'

class ValidationService {
	constructor() {
		this.errorBorderTimeout = {}
	}

	showError(element, timeout = 2500) {
		element.style('border-color', COLORS.error)

		if (this.errorBorderTimeout[element]) {
			clearTimeout(this.errorBorderTimeout[element])
		}

		this.errorBorderTimeout[element] = setTimeout(() => {
			element.style('border-color', '')
		}, timeout)
	}
}

export default new ValidationService()