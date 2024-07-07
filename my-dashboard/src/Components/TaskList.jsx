import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const ToDoListWidget = () => {
    const [todos, setTodos] = useState([
        { id: 1, text: 'Proyecto 1', completed: false, priority: 'Alta', tag: 'Trabajo' },
        { id: 2, text: 'Proyecto 2', completed: false, priority: 'Media', tag: 'Personal' },
        { id: 3, text: 'Proyecto 3', completed: true, priority: 'Baja', tag: 'Trabajo' }
    ]);
    const [newTodo, setNewTodo] = useState('');

    const handleInputChange = (e) => {
        setNewTodo(e.target.value);
    };

    const handleAddTodo = () => {
        if (newTodo.trim() !== '') {
            setTodos([...todos, { id: Date.now(), text: newTodo, completed: false, priority: 'Media', tag: '' }]);
            setNewTodo('');
        }
    };

    const handleToggleComplete = (id) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const handleDeleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(todos);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setTodos(items);
    };

    return (
        <div className="bg-[#DACEE4] p-4 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-[#33415c] font-audiowide">Proyectos Pendientes</h2>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="todos">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {todos.map((todo, index) => (
                                <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                                    {(providedDrag) => (
                                        <div 
                                            {...providedDrag.draggableProps}
                                            {...providedDrag.dragHandleProps}
                                            ref={providedDrag.innerRef}
                                            className="flex items-center justify-between bg-[#CCDF9F] p-2 rounded shadow mb-2"
                                        >
                                            <span 
                                                onClick={() => handleToggleComplete(todo.id)} 
                                                className={`cursor-pointer ${todo.completed ? 'line-through text-gray-500' : 'text-[#33415c]'} font-audiowide`}
                                            >
                                                {todo.text}
                                            </span>
                                            <div>
                                                <button 
                                                    onClick={() => handleDeleteTodo(todo.id)} 
                                                    className="ml-2 text-red-500"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <div className="mt-4">
                <input 
                    type="text" 
                    value={newTodo} 
                    onChange={handleInputChange} 
                    placeholder="Agregar nuevo proyecto" 
                    className="w-full p-2 border rounded shadow text-[#33415c]"
                />
                <button 
                    onClick={handleAddTodo} 
                    className="mt-2 w-full bg-[#0ea5e9] text-white p-2 rounded"
                >
                    Agregar
                </button>
            </div>
        </div>
    );
}

export default ToDoListWidget;
