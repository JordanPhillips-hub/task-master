/* eslint-disable react/prop-types */
import {
  BsArrowLeftShort,
  BsArrowRightShort,
  BsChevronDown,
  BsArrowUpShort,
  BsArrowsMove,
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
};

const Icon = ({ type, ...rest }) => {
  const IconType = icons[type];
  return <IconType {...rest} />;
};

export default Icon;
