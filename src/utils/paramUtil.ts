export function parseIntParam(value?: string): number | null {
	if (!value) {
		return null;
	}

	const intValue = Number(value);

	if (isNaN(intValue)) {
		return null;
	}

	return intValue;
}
