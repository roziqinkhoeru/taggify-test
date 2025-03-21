'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

interface Toast {
	id: number;
	message: string;
	type: 'success' | 'error';
}

interface ToastContextType {
	makeToast: (message: string, type: Toast['type']) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
	const [toast, setToast] = useState<Toast[]>([]);

	const makeToast = (message: string, type: Toast['type']) => {
		const id = Date.now();
		setToast((prev) => [...prev, { id, message, type }]);

		setTimeout(() => {
			setToast((prev) => prev.filter((toast) => toast.id !== id));
		}, 6000);
	};

	return (
		<ToastContext.Provider value={{ makeToast }}>
			{children}
			<div className='fixed bottom-10 right-8 z-50 space-y-3'>
				{toast.map((toast) => (
					<div
						key={toast.id}
						className={`px-3 py-1.5 w-full max-w-md text-pretty ${
							toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
						} text-white rounded-md`}
					>
						{toast.message}
					</div>
				))}
			</div>
		</ToastContext.Provider>
	);
}

export function useToast() {
	const context = useContext(ToastContext);

	if (!context) {
		throw new Error('useToast must be used within a ToastProvider');
	}

	return context;
}
