export function formatAmount(amount) {
	const formattedAmount =
		'$' +
		amount
			.replace(/\d $/, '')
			.replace(/\D/g, '')
			.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')
	return formattedAmount
}
