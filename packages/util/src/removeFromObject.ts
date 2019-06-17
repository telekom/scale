export const removeFromObject = (original: object, keysToRemove: object) => {
	const copy = {
		...original
	}
	Object.keys(original).forEach(key => {
		if (keysToRemove[key]) {
			delete copy[key]
		}
	})
	return copy
}
