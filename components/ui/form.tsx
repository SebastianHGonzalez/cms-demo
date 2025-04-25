import { ComponentProps, ReactNode, useId } from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input, InputProps } from "./input";

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

function useFieldIds(id: string = useId()) {
  return {
    fieldId: id,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
  };
}

type WithIds = {
  ids: ReturnType<typeof useFieldIds>;
};

interface FormFieldProps {
  id?: string;
  label: string;
  description?: string;
  className?: string;
  children: ReactNode;
}

function FormField({
  id,
  label,
  description,
  children,
  className,
  ...props
}: FormFieldProps) {
  const ids = useFieldIds(id);

  return (
    <div
      data-slot="form-item"
      className={cn("grid gap-1", className)}
      {...props}
    >
      <FormLabel ids={ids}>{label}</FormLabel>
      {description && (
        <FormDescription ids={ids}>{description}</FormDescription>
      )}
      <FormControl ids={ids}>{children}</FormControl>
      <FormMessage ids={ids} />
    </div>
  );
}

function FormLabel({
  ids,
  className,
  ...props
}: ComponentProps<typeof LabelPrimitive.Root> & WithIds) {
  const field = useFieldContext();
  const error = field.state.meta.errors.length > 0;

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn("data-[error=true]:text-destructive", className)}
      htmlFor={ids.formItemId}
      {...props}
    />
  );
}

function FormControl({
  ids,
  ...props
}: ComponentProps<typeof Slot> & WithIds) {
  // const { error, formItemId, formDescriptionId, formMessageId } = useFieldContext();
  const field = useFieldContext();
  const error = field.state.meta.errors.length > 0;

  return (
    <Slot
      data-slot="form-control"
      id={ids.formItemId}
      aria-describedby={
        !error
          ? `${ids.formDescriptionId}`
          : `${ids.formDescriptionId} ${ids.formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
}

function FormDescription({
  ids,
  className,
  ...props
}: ComponentProps<"p"> & WithIds) {
  return (
    <p
      data-slot="form-description"
      id={ids.formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function FormMessage({
  ids,
  className,
  ...props
}: ComponentProps<"p"> & WithIds) {
  const field = useFieldContext();
  const errors = field.state.meta.errors;

  return errors.map((error, index) => {
    const message = getMessage(error);
    if (!message) {
      return null;
    }
    return (
      <p
        key={index}
        data-slot="form-message"
        id={ids.formMessageId}
        className={cn("text-destructive text-sm", className)}
        {...props}
      >
        {message}
      </p>
    );
  });
}

function getMessage(error: unknown): string | null {
  if (typeof error === "string") {
    return error;
  }
  if (typeof error === "object" && error !== null) {
    if ('message' in error && typeof error.message === "string") {
      return error.message;
    }
  }
  return null;
}

// Allow us to bind components to the form to keep type safety but reduce production boilerplate
// Define this once to have a generator of consistent form instances throughout your app
const { useAppForm } = createFormHook({
  fieldComponents: {
    FormField,
    Input: (props: InputProps) => {
      const field = useFieldContext();

      return (
        <Input
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          {...props}
        />
      );
    },
  },
  formComponents: {},
  fieldContext,
  formContext,
});

export { useAppForm };
