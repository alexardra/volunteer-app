import { HTMLInputTypeAttribute } from 'react';

export type InputProps = {
  id?: string;
  name?: string;
  label?: string;

  type: HTMLInputTypeAttribute;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;

  error?: string;
};

export const Input: React.FC<InputProps> = (props: InputProps) => {
  return (
    <div className="flex flex-col items-start gap-y-1">
      {props.label && (
        <label
          htmlFor={props.name}
          className="block text-sm font-bold text-gray-700"
        >
          {props.label}
        </label>
      )}
      <input
        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        required={props.required}
        disabled={props.disabled}
      />
      {!!props.error && (
        <div
          role="alert"
          aria-label={props.error}
          className="text-sm font-semibold text-red-500"
        >
          {props.error}
        </div>
      )}
    </div>
  );
};
