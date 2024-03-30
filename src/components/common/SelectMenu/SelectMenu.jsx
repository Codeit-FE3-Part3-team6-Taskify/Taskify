/* eslint-disable react/no-unstable-nested-components */
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Select, { components } from 'react-select';
import Avatar from '../Avatar/Avatar';
import { DropDownArrow, CheckIcon } from '@/../public/images';

const SelectMenu = ({
  assigneeUserId,
  options,
  customStyles,
  getOptionLabel,
  getOptionValue,
  setFormValues,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const findOption = options.find(
      (option) => option.userId === assigneeUserId,
    );

    setSelectedOption(findOption || null);
  }, [assigneeUserId, options]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setFormValues((prev) => ({
      ...prev,
      assigneeUserId: option ? option.userId : 0,
    }));
  };

  const CustomOption = ({ data, isSelected, ...props }) => {
    return (
      <components.Option {...props}>
        <div
          className={`flex items-center gap-[6px] ${isSelected ? 'pl-0' : 'pl-[41px]'}`}
        >
          {isSelected && (
            <Image
              src={CheckIcon}
              style={{ marginLeft: 8, marginRight: 5 }}
              width={22}
              height={22}
              alt="selected"
            />
          )}
          <span className="">
            <Avatar
              userId={data.userId}
              image={data.profileImageUrl || null}
              text={data.nickname.charAt(0)}
            />
          </span>

          <span>{data.nickname}</span>
        </div>
      </components.Option>
    );
  };

  const CustomDropdownIndicator = (props) => (
    <components.DropdownIndicator {...props}>
      <Image src={DropDownArrow} alt="arrow" width={26} height={26} />
    </components.DropdownIndicator>
  );

  return (
    <Select
      value={selectedOption}
      onChange={handleOptionChange}
      options={options}
      placeholder="이름을 입력해 주세요"
      styles={customStyles}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      components={{
        Option: CustomOption,
        DropdownIndicator: CustomDropdownIndicator,
      }}
    />
  );
};

export default SelectMenu;
