import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { TAG_COLORS } from "@/constants";

export function ColorSelect({ handleColor }: Props) {
  return (
    <>
      <Select onValueChange={handleColor}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select tag color" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Tag colors</SelectLabel>
            {TAG_COLORS.map(({ label, value }) => {
              return (
                <SelectItem
                  key={label}
                  value={value}
                  style={{ backgroundColor: value }}
                >
                  {label}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}

interface Props {
  handleColor: (arg: string) => void;
}
