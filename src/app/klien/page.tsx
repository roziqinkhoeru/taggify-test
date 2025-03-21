'use client';

import { getTags } from '@/services/tag.service';
import { useCallback, useEffect } from 'react';

function Klien() {
	const fetchData = useCallback(async () => {
		try {
			const response = await getTags({
				search: 'aa',
			});
		} catch (error) {}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<div>
			<div>Enter</div>
		</div>
	);
}

export default Klien;
