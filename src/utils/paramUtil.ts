export function parseIntParam(value?: string): number | undefined {
	if (!value) {
		return undefined;
	}

	const intValue = Number(value);

	if (isNaN(intValue)) {
		return undefined;
	}

	return intValue;
}
