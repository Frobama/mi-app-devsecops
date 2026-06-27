'use client';
import { useState, FormEvent } from 'react';

interface TodoFormProps {
    onAdd: (title: string) => Promise<void>;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError('');
        const trimmed = title.trim();
        if (!trimmed) { setError('El título no puede estar vacio'); return; }
        if (trimmed.length > 200) { setError('Máximo 200 caracteres'); return; }

        setLoading(true);
        try {
            await onAdd(trimmed);
            setTitle('');
        } catch {
            setError('Error al agregar la tarea. Intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='mb-6'>
            <form onSubmit={handleSubmit} className='flex gap-2'>
                <input
                    type='text'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Escribe una nueva tarea aquí..."
                    disabled={loading}
                    aria-label="Nueva tarea"
                    className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <button
                    type='submit'
                    disabled={loading}
                    className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50'
                >
                    {loading ? 'Agregando...' : 'Agregar'}
                </button>
            </form>
            {error && <p role='alert' className='mt-2 text-sm text-red-600'>{error}</p>}
        </div>
    );
}