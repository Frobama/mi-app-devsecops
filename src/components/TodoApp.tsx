'use client';
import { useState, useEffect } from 'react';
import { Todo } from '@/types/todo';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

export default function TodoApp() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/tasks')
            .then(res=> res.json())
            .then(data => setTodos(data.tasks))
            .catch(() => setError('Error al cargar las tareas'))
            .finally(() => setLoading(false));
    }, []);

    async function handleAdd(title: string) {
        const res = await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title }),
        });
        if (!res.ok) throw new Error('Error al crear tarea');
        const newTodo = await res.json();
        setTodos(prev => [...prev, newTodo]);
    }

    function handleToggle(id: string) {
        setTodos(prev => prev.map(t => t.id === id ? { ...t, status: t.status === 'pending' ? 'completed' : 'pending' } : t));
    }

    function handleDelete(id: string) {
        setTodos(prev => prev.filter(t => t.id !== id));
    }

    if (loading) return <p className='text-center py-8'>Cargando...</p>
    if (error) return <p className='text-center text-red-600 py-8'>{error}</p>

    return (
        <main className='max-w-2xl mx-auto p-6'>
            <h1 className='text-3xl font-bold text-gray-800 mb-2'>Mi Lista de Tareas</h1>
            <p className='text-gray-500 mb-6'>Proyecto DevSecOps - UCN</p>
            <TodoForm onAdd={handleAdd} />
            <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
        </main>
    );
}