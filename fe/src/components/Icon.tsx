import { ICONS } from "@/constants";

const Icon = ({ img, onClick }: Icon) => {
  return (
    <img
      className="hidden sm:block sm:pt-2 cursor-pointer"
      src={ICONS[img]}
      title={img}
      alt={img}
      width="25px"
      height="25px"
      onClick={onClick}
    />
  );
};

export default Icon;
