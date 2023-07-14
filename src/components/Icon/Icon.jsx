/* eslint-disable react/prop-types */
import {
  BsArrowLeftShort,
  BsArrowRightShort,
  BsChevronDown,
  BsArrowUpShort,
  BsArrowsMove,
  BsArrowRepeat,
} from "react-icons/bs";
import { CiSearch, CiEdit, CiCalendarDate } from "react-icons/ci";
import { AiOutlinePlus } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { BiCheck } from "react-icons/bi";

const icons = {
  arrowLeft: BsArrowLeftShort,
  arrowRight: BsArrowRightShort,
  arrowDown: BsChevronDown,
  arrowUp: BsArrowUpShort,
  arrowMove: BsArrowsMove,
  search: CiSearch,
  edit: CiEdit,
  calendar: CiCalendarDate,
  plus: AiOutlinePlus,
  cross: RxCross2,
  check: BiCheck,
  repeat: BsArrowRepeat,
};

const Icon = ({ type, fontSize, ...rest }) => {
  const IconType = icons[type];
  return (
    <IconType style={{ fontSize: fontSize ? fontSize : "1.5rem" }} {...rest} />
  );
};

export default Icon;
