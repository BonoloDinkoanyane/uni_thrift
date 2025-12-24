'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import clsx from 'clsx';

type CharacterCountFieldProps = {
  id: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  defaultValue?: string;
  maxLength: number;
  placeholder?: string;
  error?: string | string[];
  optional?: boolean;
  as?: 'input' | 'textarea';
  rows?: number;
};

export function CharacterCountField({
  id,
  name,
  defaultValue = '',
  maxLength,
  placeholder,
  error,
  optional,
  as = 'input',
  rows = 4,
}: CharacterCountFieldProps) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const remaining = maxLength - value.length;
  const isNearLimit = remaining <= 5;

  const sharedProps = {
    id,
    name,
    value,
    maxLength,
    placeholder,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValue(e.target.value),
    className:
      'transition-all duration-200 focus:scale-[1.01] resize-none',
      'aria-invalid': error ? true : undefined,
      'aria-describedby': error ? `${id}-error` : undefined,
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {optional && (
          <span className="text-muted-foreground font-normal ml-2">
            (Optional)
          </span>
        )}
      </Label>

      {as === 'textarea' ? (
        <Textarea {...sharedProps} rows={rows} />
      ) : (
        <Input {...sharedProps} />
      )}

      {error && (
        <p id={`${id}-error`} className="text-sm text-red-600">
          {error}
        </p>
      )}

      <p
        className={clsx(
          'text-xs text-muted-foreground text-right',
          isNearLimit && 'text-red-600 font-medium'
        )}
      >
        {value.length}/{maxLength} characters
      </p>
    </div>
  );
}