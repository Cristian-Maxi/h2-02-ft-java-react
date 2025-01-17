import InputField from '../atoms/InputField';
import IconButton from '../atoms/IconButton';
import { IoEyeOutline } from 'react-icons/io5';

export default function PasswordInput({ label }) {
  return (
    <div className="relative">
      <InputField type="password" label={label} />
      <IconButton
        icon={IoEyeOutline}
        className="absolute bottom-2 right-4 text-[#999999]"
      />
    </div>
  );
}
