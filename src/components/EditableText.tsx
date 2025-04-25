import { useRef, useState } from "react";
import { flushSync } from "react-dom";

export function EditableText({
  fieldName,
  value,
  inputLabel,
  buttonLabel,
  onChange,
  editState,
}: {
  fieldName: string;
  value: string;
  inputLabel: string;
  buttonLabel: string;
  onChange: (value: string) => void;
  editState?: [boolean, (value: boolean) => void];
}) {
  const localEditState = useState(false);
  const [edit, setEdit] = editState || localEditState;
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return edit ? (
    <form
      className="contents"
      onSubmit={(event) => {
        event.preventDefault();

        onChange(inputRef.current!.value);

        flushSync(() => {
          setEdit(false);
        });

        buttonRef.current?.focus();
      }}
    >
      <input
        required
        ref={inputRef}
        type="text"
        aria-label={inputLabel}
        name={fieldName}
        defaultValue={value}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            flushSync(() => {
              setEdit(false);
            });
            buttonRef.current?.focus();
          }
        }}
        onBlur={(event) => {
          if (
            inputRef.current?.value !== value &&
            inputRef.current?.value.trim() !== ""
          ) {
            onChange(inputRef.current!.value);
          }
          setEdit(false);
        }}
      />
    </form>
  ) : (
    <button
      aria-label={buttonLabel}
      type="button"
      ref={buttonRef}
      onClick={() => {
        flushSync(() => {
          setEdit(true);
        });
        inputRef.current?.select();
      }}
    >
      {value || <span className="italic text-slate-400">Edit</span>}
    </button>
  );
}
