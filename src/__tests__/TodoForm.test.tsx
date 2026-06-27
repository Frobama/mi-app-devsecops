import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodoForm from '@/components/TodoForm';
 
describe('TodoForm', () => {
  it('renderiza input y boton', () => {
    render(<TodoForm onAdd={jest.fn()} />);
    expect(screen.getByPlaceholderText(/nueva tarea/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /agregar/i })).toBeInTheDocument();
  });
 
  it('muestra error si se envia formulario vacio', async () => {
    render(<TodoForm onAdd={jest.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /agregar/i }));
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent(/vacio/i));
  });
 
  it('llama onAdd con el titulo ingresado', async () => {
    const onAdd = jest.fn().mockResolvedValue(undefined);
    render(<TodoForm onAdd={onAdd} />);
    fireEvent.change(screen.getByPlaceholderText(/nueva tarea/i),
      { target: { value: 'Nueva tarea CI/CD' } });
    fireEvent.click(screen.getByRole('button', { name: /agregar/i }));
    await waitFor(() => expect(onAdd).toHaveBeenCalledWith('Nueva tarea CI/CD'));
  });
 
  it('limpia el input tras exito', async () => {
    const onAdd = jest.fn().mockResolvedValue(undefined);
    render(<TodoForm onAdd={onAdd} />);
    const input = screen.getByPlaceholderText(/nueva tarea/i);
    fireEvent.change(input, { target: { value: 'Temporal' } });
    fireEvent.click(screen.getByRole('button', { name: /agregar/i }));
    await waitFor(() => expect(input).toHaveValue(''));
  });
});
