import { Todo } from '@/types/todo';
import TodoItem from './TodoItem';

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export default function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
    if (todos.length === 0) {
        return (
            <p data-testid="empty-state" className='text-center text-gray-500 py-8'>
                No hay tareas. Agrega una usando el formulario de arriba.
            </p>
        );
    }

    const pending = todos.filter(t => t.status === 'pending').length;
    const completed = todos.filter(t => t.status === 'completed').length;

    return (
        <div>
            <div className='flex gap-4 mb-4 text-sm text-gray-600'>
                <span>Total: <strong>{todos.length}</strong></span>
                <span>Pendientes: <strong className='text-yellow-600'>{pending}</strong></span>
                <span>Completadas: <strong className='text-green-600'>{completed}</strong></span>
            </div>
            <ul className='flex flex-col gap-2' data-testid="todo-list">
                {todos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
                ))}
            </ul>
        </div>
    );
}