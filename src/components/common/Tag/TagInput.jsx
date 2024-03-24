/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import TagItem from './TagItem';
import getRandomColorPair from '@/utils/getRandomColorPair';

export default function TagInput({ initialTag, setFormValues }) {
  const [tagList, setTagList] = useState([]);
  const [tagItem, setTagItem] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [prevColorIndex, setPrevColorIndex] = useState(-1); // 이전 색상 상태

  useEffect(() => {
    if (initialTag && initialTag.length > 0) {
      // 초기 태그가 있으면 태그 리스트에 설정
      setTagList(initialTag);
    }
  }, [initialTag]);

  const addTagItem = () => {
    const updatedTagList = [...tagList];
    const colorIndex = getRandomColorPair(prevColorIndex);
    const coloredTagItem = tagItem + colorIndex;

    updatedTagList.push(coloredTagItem);

    setTagList(updatedTagList);
    setTagItem('');
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      tags: updatedTagList,
    }));

    setPrevColorIndex(colorIndex);
  };

  const onKeyDown = (e) => {
    if (e.target.value.length !== 0 && e.key === 'Enter') {
      addTagItem();
    }
  };

  const deleteTagItem = (tagToDelete) => {
    const filteredTagList = tagList.filter((tag) => tag !== tagToDelete);
    setTagList(filteredTagList);
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      tags: filteredTagList,
    }));
  };

  return (
    <div
      className="px-4 py-[15px] outline-none border-solid border-[1px] rounded-lg bg-white w-full h-auto "
      style={{ borderColor: isFocused ? '#5534DA' : '#D9D9D9' }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <div className="flex gap-[6px] flex-wrap">
        {tagList &&
          tagList.map((tag, index) => {
            return (
              <TagItem
                hasDelete
                key={index}
                tag={tag}
                onDelete={() => deleteTagItem(tag)}
              />
            );
          })}
        <input
          type="text"
          placeholder={tagList.length > 0 ? '' : '입력 후 Enter'}
          className=" inline-flex  bg-transparent focus:border-0 focus:outline-none cursor-text"
          value={tagItem}
          onChange={(e) => setTagItem(e.target.value)}
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
  );
}
