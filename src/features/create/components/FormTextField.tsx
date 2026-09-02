import FormField from './FormField';
import FormTextInput from './FormTextInput';

type FormTextFieldProps = {
  label: string;
  required?: boolean;
  error?: string;
  value: string;
  placeholder: string;
  onChangeText: (value: string) => void;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  flex?: boolean;
};

export default function FormTextField({
  label,
  required = false,
  error,
  value,
  placeholder,
  onChangeText,
  keyboardType = 'default',
  flex = false,
}: FormTextFieldProps) {
  return (
    <FormField label={label} required={required} error={error} flex={flex}>
      <FormTextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        hasError={Boolean(error)}
        keyboardType={keyboardType}
      />
    </FormField>
  );
}
