import Icon from "../icons/Icon";
import Button from "./Button";

interface SuccessModalProps {
  onClose: () => void;
}

const SuccessModal = ({ onClose }: SuccessModalProps) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="relative flex h-[36.25rem] w-[54.75rem] flex-col items-center justify-center rounded-xl bg-white text-center">
      <button className="absolute right-8 top-8" onClick={onClose}>
        <Icon type="CloseIcon" className="size-10 text-secondaryText" />
      </button>
      <img src="/success.png" alt="checkmark" className="mb-10" />
      <h2 className="mb-4 text-4xl font-semibold">Congrats!</h2>
      <p className="mb-20 text-sm text-secondaryText">
        Your order is placed successfully!
      </p>
      <Button onClick={onClose} className="w-52">
        Continue shopping
      </Button>
    </div>
  </div>
);

export default SuccessModal;
