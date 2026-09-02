import type { ReactNode } from 'react';
import { View } from 'react-native';

import FieldError from '@/components/ui/FieldError';
import FormLabel from '@/components/ui/FormLabel';
import { RTL_CONTAINER_STYLE } from '@/localization/direction';

type FormFieldProps = {
  label: string;
  required?: boolean;
  optionalHint?: string;
  error?: string;
  flex?: boolean;
  children: ReactNode;
};

export default function FormField({
  label,
  required = false,
  optionalHint,
  error,
  flex = false,
  children,
}: FormFieldProps) {
  return (
    <View
      className={`items-start gap-2 ${flex ? 'min-w-0 flex-1' : 'w-full'}`}
      style={RTL_CONTAINER_STYLE}>
      <FormLabel required={required} optionalHint={optionalHint}>
        {label}
      </FormLabel>
      {children}
      {error ? <FieldError message={error} /> : null}
    </View>
  );
}
