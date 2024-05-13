type Props = {
  disabled: boolean;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput: React.FC<Props> = ({ disabled, label, onChange }) => {
  return (
    <input
      disabled={disabled}
      type="text"
      maxLength={3}
      placeholder={label}
      onChange={(e) => onChange(e)}
      className={`h-12 px-4 rounded`}
    />
  );
};

export default TextInput;
