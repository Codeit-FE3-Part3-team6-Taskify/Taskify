/* eslint-disable react/no-array-index-key */
/* eslint-disable no-alert */
/* eslint-disable object-shorthand */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-shadow */
import { useEffect, useState } from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import Modal from '../Modal';
import Avatar from '../../Avatar/Avatar';
import TagItem from '../../Tag/TagItem';
import CommentBox from '../../CommentBox/CommentBox';
import {
  axiosGet,
  axiosPut,
  axiosPostJason,
  axiosDelete,
} from '@/features/axios';
import useUserGet from '@/hooks/useUserGet';
import { KebabIcon, CloseIcon } from '@/../public/images';
import PopupMenu from '../../PopupMenu/PopupMenu';
import StatusTag from '../../StatusTag/StatusTag';

export default function CardModal({ onClose, cardId, columnTitle, columnId }) {
  // TODO(조예진): updateTodo와 같은 코드는 나중에 따로 커스텀훅으로 분리할 것
  // 대시보드에서 카드클릭할 때, 컬럼 이름을 넘겨주는것으로 가정

  const userInfo = useUserGet();

  const [cardData, setCardData] = useState({
    assigneeUserId: 0,
    assigneeUserName: '',
    dashboardId: 0,
    columnId: 0,
    title: '',
    description: '',
    dueDate: '',
    tags: [],
  });

  // 댓글 관련 코드
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [editComment, setEditComment] = useState();
  const [isCommentBoxFocused, setIsCommentBoxFocused] = useState(false);
  const [isCommentFocused, setIsCommentFocused] = useState({});

  const getComments = async () => {
    try {
      const { comments } = await axiosGet(`/comments?cardId=${cardId}`);
      if (!comments.status) {
        setComments(comments);
      }
    } catch (e) {
      alert('댓글 불러올 수 없습니다. 다시 시도해주세요.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosGet(`/cards/${cardId}`);
        if (!res.status) {
          setCardData({
            assigneeUserId: res.assignee.id,
            assigneeUserName: res.assignee.nickname,
            profileImageUrl: res.assignee.profileImageUrl,
            dashboardId: res.dashboardId,
            columnId: res.columnId,
            title: res.title,
            description: res.description,
            dueDate: res.dueDate,
            tags: res.tags,
            imageUrl: res.imageUrl,
          });
        }

        // 댓글 가져오기
        await getComments();
      } catch (e) {
        alert('할일 데이터를 가져올 수 없습니다. 다시 시도해주세요.');
      }
    };

    fetchData();
  }, []);

  const handlePostComment = async () => {
    try {
      await axiosPostJason('/comments', {
        content: comment,
        cardId: cardId,
        columnId: cardData.columnId,
        dashboardId: cardData.dashboardId,
      });

      // 입력값 초기화
      setComment('');
      getComments();
      setIsCommentBoxFocused(false);
    } catch (e) {
      alert('댓글을 달 수 없습니다. 다시 시도해주세요.');
    }
  };

  // 팝업 메뉴
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const togglePopup = (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지-안되는데?
    setIsPopupOpen(!isPopupOpen);
  };

  const editCardOptions = ['수정하기', '삭제하기'];

  // 댓글삭제
  const handleDeleteComment = async (commentId) => {
    try {
      await axiosDelete(`/comments/${commentId}`);
      getComments();
    } catch (e) {
      alert('댓글을 삭제 할 수 없습니다. 다시 시도해주세요.');
    }
  };
  const [editCommentId, setEditCommentId] = useState(-1);

  const handleClickEditComment = (commentContent, commentId) => {
    setEditCommentId(commentId === editCommentId ? -1 : commentId);
    setEditComment(commentContent);
  };

  // 댓글 수정
  const handlePutComment = async (commentId) => {
    try {
      const res = await axiosPut(`/comments/${commentId}`, {
        content: editComment,
      });
      if (!res.status) {
        setEditCommentId(-1);
        getComments();
      }
    } catch (e) {
      alert('댓글을 수정 할 수 없습니다. 다시 시도해주세요.');
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className="relative flex flex-col px-5 md:px-7 pt-10 pb-7 py-8 gap-4 text-black_333236 ">
        <div className="absolute right-4 md:right-7 flex items-start gap-4 md:gap-6">
          <div className="flex flex-col items-end">
            <Image
              className="cursor-pointer"
              src={KebabIcon}
              alt="kebab"
              width={24}
              height={24}
              onClick={togglePopup}
            />
            {/* 팝업 메뉴 */}
            {isPopupOpen && (
              <div className="relative right-2">
                <PopupMenu
                  cardId={cardId}
                  onClose={onClose}
                  setIsPopupOpen={setIsPopupOpen}
                  columnId={columnId}
                  options={editCardOptions}
                />
              </div>
            )}
          </div>

          <Image
            className="cursor-pointer"
            src={CloseIcon}
            alt="close"
            onClick={onClose}
            width={20}
            height={20}
          />
        </div>

        <h1 className="text-xl font-bold md:text-2xl md:mb-2">
          {cardData.title}
        </h1>

        {/* 담당자 마감일 박스 */}
        <div className="flex items-start md:hidden pt-3 pl-4 pb-[10px] rounded-lg border border-gray_D9D9D9">
          <div className="w-full flex justify-between">
            <div className="flex flex-col gap-1 md:gap-1.5 w-1/2">
              <span className="text-[10px] md:text-xs font-semibold">
                담당자
              </span>
              <div className="flex gap-2 items-center">
                {cardData.profileImageUrl && (
                  <Avatar
                    size="mediumCard"
                    image={cardData.profileImageUrl}
                    text={cardData.assigneeUserName.charAt(0).toUpperCase()}
                  />
                )}

                <span className="text-xs md:text-sm">
                  {cardData.assigneeUserName}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-[10px] w-1/2">
              <span className="text-[10px] md:text-xs font-semibold">
                마감일
              </span>
              <span className="text-xs md:text-sm">
                {dayjs(cardData.dueDate).format('YYYY.MM.DD HH:mm')}
              </span>
            </div>
          </div>
        </div>
        {/* 담당자 마감일 박스 */}
        <div className="flex flex-row gap-6">
          <div className="flex flex-col gap-4 w-full md:w-2/3">
            {/* 태그박스 */}
            <div className="flex gap-3">
              <StatusTag>{columnTitle}</StatusTag>

              {cardData.tags.length > 0 && (
                <>
                  <span className="relative w-[1px]  bg-gray_D9D9D9" />
                  <div className="flex gap-[6px] ">
                    {cardData.tags.map((tag, index) => {
                      return <TagItem key={index} tag={tag} />;
                    })}
                  </div>
                </>
              )}
            </div>
            {/* 태그박스 */}

            <div className=" text-black_000000 text-xs leading-[22px] md:text-sm md:leading-6">
              {cardData.description}
            </div>

            {cardData.imageUrl && (
              // 원본이미지비율에 맞게 높이를 조정하고 싶은데 안됨..
              <div className="relative w-full h-[168px] md:h-[255px]">
                <Image
                  fill
                  objectFit="cover"
                  src={cardData.imageUrl}
                  alt="profile"
                  className="rounded-md"
                />
              </div>
            )}

            {/* 댓글박스 */}
            <div className="flex flex-col gap-2 mt-[3px] md:mt-2 md:mb-1">
              <span className="text-sm md:text-base font-medium">댓글</span>
              <CommentBox
                isFocused={isCommentBoxFocused}
                onClick={handlePostComment}
                comment={comment}
                setComment={setComment}
                onFocus={() => setIsCommentBoxFocused(true)}
                onBlur={() => setIsCommentBoxFocused(false)}
              />
            </div>
            {/* 댓글박스 */}

            {/* 달린댓글 */}
            {comments.length > 0 &&
              comments.map((comment, index) => (
                <div key={index} className="flex gap-2">
                  {comment.author.profileImageUrl && (
                    <Avatar
                      size="mediumCard"
                      image={comment.author.profileImageUrl}
                      text={comment.author.nickname.charAt(0).toUpperCase()}
                    />
                  )}
                  <div className="flex flex-col gap[6px] flex-grow">
                    <div className="flex items-center gap-[6px] md:gap-2 text-xs md:text-sm font-semibold">
                      <div>{comment.author.nickname}</div>

                      <div className="text-[10px] md:text-xs text-gray_9FA6B2">
                        {dayjs(comment.createdAt).format('YYYY.MM.DD HH:mm')}
                      </div>
                    </div>
                    {editCommentId === comment.id ? (
                      <CommentBox
                        isFocused={isCommentFocused[comment.id]}
                        onClick={() => handlePutComment(comment.id)}
                        comment={editComment}
                        setComment={setEditComment}
                        onFocus={() =>
                          setIsCommentFocused((prev) => ({
                            ...prev,
                            [comment.id]: true,
                          }))
                        }
                        onBlur={() =>
                          setIsCommentFocused((prev) => ({
                            ...prev,
                            [comment.id]: false,
                          }))
                        }
                      />
                    ) : (
                      <div className="text-xs md:text-sm ">
                        {comment.content}
                      </div>
                    )}

                    {userInfo.id === comment.author.id && (
                      <div className="flex gap-2 md:gap-3 mt-[2px] md:mt-[6px] text-[10px] md:text-xs text-gray_9FA6B2">
                        {editCommentId === comment.id ? (
                          <button
                            className="underline"
                            onClick={() => setEditCommentId(-1)}
                          >
                            취소
                          </button>
                        ) : (
                          <button
                            className="underline"
                            onClick={() =>
                              handleClickEditComment(
                                comment.content,
                                comment.id,
                              )
                            }
                          >
                            수정
                          </button>
                        )}
                        <button
                          className="underline"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          삭제
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            {/* 달린댓글 */}
          </div>

          {/* 담당자 마감일 박스 */}
          <div className="md:flex flex-col hidden gap-5 w-1/3 h-fit items-start pl-4 py-4 rounded-lg border border-gray_D9D9D9">
            <div className="flex flex-col gap-1 md:gap-1.5">
              <span className="text-[10px] md:text-xs font-semibold">
                담당자
              </span>
              <div className="flex gap-2 items-center">
                {cardData.profileImageUrl && (
                  <Avatar
                    size="mediumCard"
                    image={cardData.profileImageUrl}
                    text={cardData.assigneeUserName.charAt(0).toUpperCase()}
                  />
                )}

                <span className="text-xs md:text-sm">
                  {cardData.assigneeUserName}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-[10px] ">
              <span className="text-[10px]  md:text-xs font-semibold">
                마감일
              </span>
              <span className="text-xs md:text-sm">
                {dayjs(cardData.dueDate).format('YYYY.MM.DD HH:mm')}
              </span>
            </div>
          </div>
          {/* 담당자 마감일 박스 */}
        </div>
      </div>
    </Modal>
  );
}
