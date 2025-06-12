// ============================== componants types ===========================

declare type AlertDialogComponantProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  title: string;
  description: string;
  buttonText: React.ReactNode;
  buttonClassName?: React.HTMLAttributes<HTMLDivElement>["className"];
  onSubmit: () => void;
  isLoading?: boolean;
  closeOnClickOutside?: boolean;
  closeOnEsc?: boolean;
};

declare type AvatarProps = {
  imageURL?: string;
  placeholder?: string;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  placeholderClassName?: React.HTMLAttributes<HTMLDivElement>["className"];
};

declare type CardFormProps = {
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  contentClassName?: React.HTMLAttributes<HTMLDivElement>["className"];
  footerButtons?: {
    text: string;
    variant?: "default" | "outline";
    onClick?: () => void;
  }[];
};

declare type CheckboxProps = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  disabled?: boolean;
  label?: string;
  value: boolean;
  onChange: (value: boolean) => void;
  ref?: React.RefObject;
};

declare type DialogComponentProps = {
  triggerText?: string;
  triggerVariant?: ButtonProps["variant"];
  triggerIcon?: ReactNode;
  triggerSize?: ButtonProps["size"];
  title?: string;
  description?: string;
  children: ReactNode;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  triggerClassName?: string;
  triggerFunction?: () => void;
  className?: string;
  buttonText?: string;
  onSubmit?: () => void;
  onClose?: () => void;
  buttonDisabled?: boolean;
  buttonIcon?: ReactNode;
  isNested?: boolean;
  position?: "default" | "bottom" | "top" | "left" | "right";
  draggable?: boolean;
  innerTriggerText?: string;
  innerTriggerVariant?: ButtonProps["variant"];
  innerTriggerIcon?: ReactNode;
  innerTriggerSize?: ButtonProps["size"];
  innerTitle?: string;
  innerDescription?: string;
  innerChildren?: ReactNode;
  innerTriggerClassName?: string;
  innerClassName?: string;
  innerButtonText?: string;
  innerOnSubmit?: () => void;
  innerOnClose?: () => void;
  innerButtonDisabled?: boolean;
  innerButtonIcon?: ReactNode;
  TooltipText?: string;
};

declare type InputComponentProps = {
  label?: string;
  placeholder?: string;
  type?: "text" | "number" | "email" | "password" | "file";
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  inputClassName?: React.HTMLAttributes<HTMLDivElement>["className"];
  value?: string | number;
  defaultValue?: string | number;
  onBlur?: (value: string | number) => void;
  onChange?: (value: string | number) => void;
  icon?: ReactNode;
  name?: string;
};

declare type RadioGroupProps = {
  radioItems: {
    value: string;
    lable: string;
  }[];
  onChange: (value: string) => void;
  value: string;
};

declare type TabsComponentProps = {
  defaultValue?: string;
  tabs: Tab[];
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  numberOfTabs?: number;
};

declare type TextareaProps = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  onBlur?: (value: string) => void;
  value: string;
};

declare type TooltipProps = {
  content?: string;
  children: React.ReactNode;
  duration?: number;
  side?: "bottom" | "right" | "left" | "top";
  align?: "center" | "start" | "end";
  alignOffset?: number;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
};

declare type UploadImageProps = {
  imageWidth: number;
  imageHeight: number;
  image: File | null;
  setImage: (image: File | null) => void;
  ref?: React.RefObject;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
};

declare type SelectComponentProps = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  selectItems: { label: string; value: string }[];
  placeholder?: string;
  value: string | undefined;
  onChange?: (value: string) => void;
  ref?: React.RefObject;
  onSelect?: (value: string | number) => void;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  disabled?: boolean;
};

declare type DatePickerProps = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  date?: DateRange;
  setDate: (date: DateRange | undefined) => void;
  ref?: React.RefObject;
  modal?: boolean;
  disabled?: boolean;
};

declare type BaseField = {
  name: string;
  field_key: string;
  label?: string;
  placeholder?: string;
  description?: string;
  editable?: boolean;
};

declare type TextField = BaseField & {
  type: "text";
};

declare type TextareaField = BaseField & {
  type: "memo";
};

declare type SelectField = BaseField & {
  type: "select";
  data: { label: string; value: string }[];
};

declare type DateRangeField = BaseField & {
  type: "date_range";
};
declare type DateRangeField = BaseField & {
  type: "date";
};

declare type BooleanField = BaseField & {
  type: "boolean";
};

declare type ImageField = BaseField & {
  type: "image";
};

declare type FieldItem =
  | TextField
  | TextareaField
  | SelectField
  | DateRangeField
  | BooleanField
  | DateField
  | ImageField;

declare type DynamicFormFieldProps<T extends FieldValues = FieldValues> = {
  form: UseFormReturn<T>;
  item: FieldItem;
  index?: number;
  withLabel?: boolean;
  disabled?: boolean;
  className?: sting;
  mode?: "update" | "create";
};

declare type FormComponentProps<T> = {
  schema: z.ZodSchema<T>;
  defaultValues: DefaultValues<T>;
  onSubmit: (values: T) => void;
  showDialog?: boolean;
  dialogTitle?: string;
  children: React.ReactNode;
  dialogChildren?: React.ReactNode;
  DialogButtonText?: string;
  dialogTriggerText?: string;
  isDialogOpen?: boolean;
  setIsDialogOpen?: (isOpen: boolean) => void;
  dialogClassName?: React.HTMLAttributes<HTMLDivElement>["className"];
  dialogDiscription?: string;
  dialogTriggerClassName?: React.HTMLAttributes<HTMLDivElement>["className"];
  dialogTriggerIcon?: React.ReactNode;
  dialogTriggerSize?: "default" | "sm" | "lg" | "icon" | null;
  dialogTriggerVariant?: "default" | "outline" | "destructive" | "ghost";
  dialogOnClose?: () => void;
  dialogButtonDisabled?: boolean;
  dialogOnSubmit?: () => void;
  dialogTooltipText?: string;
};
