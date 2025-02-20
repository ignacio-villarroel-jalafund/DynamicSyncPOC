import React from 'react';

interface EditableTitleProps {
  value: string;
  onSave: (newValue: string) => void;
  onCancel: () => void; // Nueva prop para cancelar la edición
}

export const EditableTitle: React.FC<EditableTitleProps> = ({ value, onSave, onCancel }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSave((e.target as HTMLInputElement).value); // Guardar el valor actual
    } else if (e.key === 'Escape') {
      onCancel(); // Cancelar la edición
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onSave(e.target.value); // Guardar el valor cuando se pierde el foco
  };

  return (
    <input
      defaultValue={value}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      autoFocus // Autoenfocar el input al renderizar
      style={{
        width: '100%',
        padding: '0.25rem',
        fontWeight: 'bold',
        fontSize: '1rem',
        border: '1px solid #007bff',
        borderRadius: '4px',
        outline: 'none',
      }}
    />
  );
};