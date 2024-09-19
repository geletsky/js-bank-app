import { COLORS } from '@/config/colors.config'

export class ValidationService {
	constructor() {
		this.errorBorderTimeout = {}
	}

	showError(element, timeout = 2500) {
		element.style('border-color', COLORS.error)

		console.log(this.errorBorderTimeout);

		if (this.errorBorderTimeout[element]) {
			clearTimeout(this.errorBorderTimeout[element])
		}

		this.errorBorderTimeout[element] = setTimeout(() => {
			element.style('border-color', '')
		}, timeout)
	}
}

export default new ValidationService()
