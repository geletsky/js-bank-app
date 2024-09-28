import { formatCardNumberWithDashes } from '@/utils/format/format-card-number'

/**
 * Represents the RQuery class for working with DOM elements.
 */
class RQuery {
	/**
	 * Create a new RQuery instance.
	 * @param {string|HTMLElement} selector - A CSS selector string or an HTMLElement
	 */

	constructor(selector) {
		if (typeof selector === 'string') {
			this.element = document.querySelector(selector)

			if (!this.element) {
				throw new Error(`Element ${selector} not found!`)
			}
		} else if (selector instanceof HTMLElement) {
			this.element = selector
		} else {
			throw new Error('Invalid selector type!')
		}
	}

	// !FIND

	/**
	 * Find the first element that matches the specified selector within the selected element.
	 * @param {string} selector - A CSS selector string to search for within the selected element.
	 * @returns {RQuery} A new RQuery instance for the found element.
	 */
	find(selector) {
		const element = new RQuery(this.element.querySelector(selector))

		if (element) {
			return element
		} else {
			throw new Error(`Element ${selector} not found!`)
		}
	}

	/**
	 * Find all elements that match the specified selector within the selected element.
	 * @param {string} selector - A CSS selector string to search for within the selected element.
	 * @returns {RQuery[]} An array of new RQuery instances for the found elements.
	 */
	findAll(selector) {
		const elements = this.element.querySelectorAll(selector)
		return Array.from(elements).map(element => new RQuery(element))
	}

	// !INSERT
	/**
	 * Append a new element as a child of the selected element.
	 * @param {HTMLElement} childElement - The new child element to append.
	 * @returns {RQuery} The current RQuery instance for chaining.
	 */
	append(childElement) {
		this.element.appendChild(childElement)
		return this
	}

	before(newElement) {
		if (!(newElement instanceof HTMLElement)) {
			throw new Error('Element must be an HTMLElement')
		}

		const parentElement = this.element.parentElement

		if (parentElement) {
			parentElement.insertBefore(newElement, this.element)
			return this
		} else {
			throw new Error('Element does not have a parent element')
		}
	}

	addSVG(svgString) {
		const div = document.createElement('div')
		div.innerHTML = svgString
		const svgElement = div.firstChild
		this.append(svgElement)
	}

	/**
	 * Get or set the inner HTML of the selected element.
	 * @param {string} [htmlContent]  - Optional HTML content to set. If not provided, the current inner HTML will be returned.
	 * @returns {RQuery|string} The current RQuery instance for chaining when setting HTML content^ or the current inner HTML ehrn getting.
	 */
	html(htmlContent) {
		if (typeof htmlContent === 'undefined') {
			return this.element.innerHTML
		} else {
			this.element.innerHTML = htmlContent
			return this
		}
	}

	/**
	 * Get or set the text content of the selected element.
	 * @param {string} [htmlContent]  - Optional text content to set. If not provided, the current inner HTML will be returned.
	 * @returns {RQuery|string} The current RQuery instance for chaining when setting HTML content^ or the current inner HTML ehrn getting.
	 */
	text(textContent) {
		if (typeof textContent === 'undefined') {
			return this.element.textContent
		} else {
			this.element.textContent = textContent
			return this
		}
	}

	// !STYLES
	/**
	 * Set the CSS style of the selected element.
	 * @param {string} property - The CSS property to set.
	 * @param {string} value - The value to set for the CSS property.
	 * @returns {RQuery} The current RQuery instance for chaining.
	 */
	style(property, value) {
		if (typeof property !== 'string' || typeof value !== 'string') {
			throw new Error('Property and value must be strings!')
		}

		this.element.style[property] = value
		return this
	}

	/**
	 * Adds a class or a list of classes to the current element.
	 * @param {string| string[]} classNames - A single class name or an array of class names to add to the element.
	 * @returns {RQuery} The current RQuery instance for chaining.
	 */
	addClass(classNames) {
		if (Array.isArray(classNames)) {
			for (const className of classNames) {
				this.element.classList.add(className)
			}
		} else {
			this.element.classList.add(classNames)
		}
		return this
	}

	/**
	 * Removes a class or a list of classes from the current element.
	 * @param {string| string[]} classNames - A single class name or an array of class names to remove from the element.
	 * @returns {RQuery} The current RQuery instance for chaining.
	 */
	removeClass(classNames) {
		if (Array.isArray(classNames)) {
			for (const className of classNames) {
				this.element.classList.remove(className)
			}
		} else {
			this.element.classList.remove(classNames)
		}
		return this
	}

	/**
	 * Shows the selected element by removing the 'display' style property
	 * @returns {RQuery} The current RQuery instance for chaining
	 */
	show() {
		this.element.style.removeProperty('display')
		return this
	}

	/**
	 * Hides the selected element by setting its display style to 'none'
	 * @returns {RQuery} The current RQuery instance for chaining
	 */
	hide() {
		this.element.style.display = 'none'
		return this
	}

	// !EVENTS

	/**
	 * Set on event listener for the submit event of a form element.
	 * @param {function(Event): void} onSubmit - The event listener for the form's submit event
	 * @returns {RQuery} The current RQuery instance for chaining.
	 */
	submit(onSubmit) {
		if (this.element.tagName.toLocaleLowerCase() === 'form') {
			this.element.addEventListener('submit', event => {
				event.preventDefault()
				onSubmit(event)
			})
		} else {
			throw new Error('Element must be a form')
		}
	}

	/**
	 * Attach a click event listener to the selected element.
	 * @param {function(Event): void} callback - The event listener function to execute when the selected element is clicked. The function will receive the event object as its argument.
	 * @returns {RQuery} The current RQuery instance for chaining.
	 */
	click(callback) {
		this.element.addEventListener('click', callback)

		return this
	}

	/**
	 * Add an event listener to the selected element for the specified event type.
	 * @param {string} eventType - The type of event to listen for (e.g., 'click', 'input', etc.).
	 * @param {function(Event): void} callback - The event listener function to execute when the event is triggered. The function will receive the event object as its argument.
	 * @returns {RQuery} The current RQuery instance for chaining.
	 */
	on(eventType, callback) {
		if (typeof eventType !== 'string' || typeof callback !== 'function') {
			throw new Error(
				'EventType must be a string and callback must be a function'
			)
		}

		this.element.addEventListener(eventType, callback)

		return this
	}

	/**
	 * Set attributes and event listeners for an input element.
	 * @param {object} options - An object containing input options.
	 * @param {function(Event): void} [options.onInput] - The event listener for the input's input event.
	 * @param {object} [options.rest] - Optional attributes to set on the input element.
	 * @returns {RQuery} The current RQuery instance for chaining.
	 */
	input({ onInput, ...rest }) {
		if (this.element.tagName.toLowerCase() !== 'input') {
			throw new Error('Element must be an input!')
		}

		for (const [key, value] of Object.entries(rest)) {
			this.element.setAttribute(key, value)
		}

		if (onInput) {
			this.element.addEventListener('input', onInput)
		}

		return this
	}

	/**
	 * Set attributes and event listeners for a number input element.
	 * @param {number} [limit] - The maximum length of input value.
	 * @returns {RQuery} The current RQuery instance for chaining.
	 */
	numberInput(limit) {
		if (
			this.element.tagName.toLowerCase !== 'input' &&
			this.element.type !== 'number'
		)
			throw new Error('Element must be an input with type "number"')

		this.element.addEventListener('input', event => {
			let value = event.target.value.replace(/[^0-9]/g, '')
			if (limit) value = value.substring(0, limit)
			event.target.value = value
		})

		return this
	}

	/**
	 * Set attributes and event listeners for a credit card input element.
	 * @returns {RQuery} The current RQuery instance for chaining.
	 */
	creditCardInput() {
		const limit = 16

		if (
			this.element.tagName.toLowerCase() !== 'input' &&
			this.element.type !== 'text'
		)
			throw new Error('Element must be an input with type "text"')

		this.element.addEventListener('input', event => {
			let value = event.target.value.replace(/[^0-9]/g, '')
			if (limit) value = value.substring(0, limit)
			event.target.value = formatCardNumberWithDashes(value)
		})

		return this
	}

	/**
	 * Set or get value of an attribute on the selected element.
	 * @param {string} attributeName - The name of the attribute to set or get
	 * @param {string} value - The value to set for the attribute. If not provided, the current value of the attribute will be returned.
	 * @returns {RQuery|string} The current RQuery instance of chaining (if setting) or the attribute value (if getting)
	 */
	attr(attributeName, value) {
		if (typeof attributeName !== 'string') {
			throw new Error('Attribute name must be a string!')
		}

		if (typeof value === 'undefined') {
			return this.element.getAttribute(attributeName)
		} else {
			this.element.setAttribute(attributeName, value)
			return this
		}
	}

	/**
	 * Removes an attribute from the current element.
	 * @param {string} attrName - The name of the attribute to remove.
	 * @return {RQuery} - Returns the RQuery instance.
	 */
	removeAttr(attrName) {
		if (typeof attrName !== 'string') {
			throw new Error('attrName must be a string')
		}

		this.element.removeAttribute(attrName)
		return this
	}

	/**
	 * Gets or sets the value of an input element.
	 * @param {string} [newValue] - The new value to set for the input element. If not provided, the method returns the current value.
	 * @return {string|RQuery} - If newValue is provided, returns the RQuery instance. Otherwise, returns the current value of the input element.
	 */
	value(newValue) {
		if (typeof newValue === 'undefined') {
			return this.element.value
		}

		this.element.value = newValue
		return this
	}
}

/**
 * Create a new RQuery instance for the given selector.
 * @param {string|HTMLElement} selector - a CSS selector string or an HTMLElement.
 * @returns {RQuery} A new RQuery instance for the given selector.
 */
export function $R(selector) {
	return new RQuery(selector)
}
