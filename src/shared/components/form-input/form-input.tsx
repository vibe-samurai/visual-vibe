import { Input, InputProps } from '@vibe-samurai/visual-ui-kit'
import { Control, FieldValues, useController, UseControllerProps } from 'react-hook-form'

type Props<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  'control' | 'defaultValue' | 'rules'
> &
  Omit<InputProps, 'value' | 'onChange'> & { control: Control<T> }

export const FormInput = <T extends FieldValues>({
  control,
  name,
  disabled,
  shouldUnregister,
  ...rest
}: Props<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
    disabled,
    shouldUnregister,
  })

  return <Input errorMessage={error?.message} {...field} {...rest} />
}
