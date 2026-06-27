import { Todo } from '@/types/todo';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
    const isCompleted = todo.status === 'completed';

    return (
        <li data-testid="todo-item" className={`flex items-center gap-3 p-4 rounded-lg border ${isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}>
            <input
                type="checkbox"
                checked={isCompleted}
                onChange={ () => onToggle(todo.id) }
                aria-label={`Marcar ${todo.title}`}
                className='w-5 h-5 cursor-pointer'
            />
            <span className={`flex-1 text-sm ${isCompleted ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                {todo.title}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full ${isCompleted ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {isCompleted ? 'Completada' : 'Pendiente'}
            </span>
            <button
                onClick={ () => onDelete(todo.id) }
                aria-label={`Eliminar ${todo.title}`}
                className='text-red-400 hover:text-red-600 text-sm font-medium'
            >
                Eliminar
            </button>
        </li>
    );
}