
function enhanceRectangle(json) {
	if (json.path) {
		const parsedBorderRadius = json.path.points.map(
			point => point.cornerRadius
		);
		enhanced = {
			...json,
			points: json.path.points
		};
		delete enhanced.path;
		return enhanced
	}
}

module.exports = {
	enhanceRectangle
}
