import { useEffect, useState } from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import Modal from '../Modal';
import Avatar from '../../Avatar/Avatar';
import TagItem from '../../Tag/TagItem';
import CtaDefault from '../../Buttons/CtaDefault/CtaDefault';
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

export default function CardModal({ onClose, cardId, columnTitle }) {
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

  const getComments = async () => {
    try {
      const { comments } = await axiosGet(`/comments?cardId=${cardId}`);
      console.log(comments);
      if (!comments.status) {
        setComments(comments);
      }
    } catch (e) {
      console.error('나의 정보를 가져오지 못했습니다.: ', e);
    }
  };

  // TODO(조예진): 임시- 대시보드 멤버를 가져와서 담당자의 이메일을 찾도록 함
  const [dashboardMembers, setDashboardMembers] = useState([]);
  const findMemberEmailById = (userId) => {
    const member = dashboardMembers.find((m) => m.userId === userId);
    return member ? member.email : null;
  };
  // comments에서 작성자의 이메일 찾기
  const getCommentsWithEmail = () => {
    return comments.map((c) => {
      const authorEmail = findMemberEmailById(c.author.id);
      return {
        ...comment,
        author: {
          ...comment.author,
          email: authorEmail,
        },
      };
    });
  };
  const getMembers = async () => {
    try {
      const { members } = await axiosGet(`/members?dashboardId=4939`);
      setDashboardMembers(members);
      // console.log(comments);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 대시보드 멤버 가져오기
        await getMembers();

        // 할 일 데이터를 가져오기
        const res = await axiosGet(`/cards/${cardId}`);
        if (!res.status) {
          setCardData({
            assigneeUserId: res.assignee.id,
            // assigneeEmail: assigneeEmail,
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
          console.log(cardData);
          // console.log('id', res.assignee.id);
          // cardData.assigneeUserId에 해당하는 이메일 찾기
          const assigneeEmail = findMemberEmailById(res.assignee.id);
          // console.log('assigneeEmail', assigneeEmail);
          setCardData((prev) => ({ ...prev, assigneeEmail: assigneeEmail }));
        }

        // 댓글 가져오기
        getComments();
        // 댓글작성자의 이메일 찾아서 comments 배열에 넣기
        setComments(getCommentsWithEmail());
      } catch (e) {
        console.error('나의 정보를 가져오지 못했습니다.: ', e);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const getTodoData = async () => {
  //     try {
  //       const res = await axiosGet(`/cards/${cardId}`);
  //       // console.log(res.assignee.profileImageUrl);
  //       if (!res.status) {
  //         setCardData({
  //           assigneeUserId: res.assignee.id,
  //           assigneeUserName: res.assignee.nickname,
  //           profileImageUrl: res.assignee.profileImageUrl,
  //           dashboardId: res.dashboardId,
  //           columnId: res.columnId,
  //           title: res.title,
  //           description: res.description,
  //           dueDate: res.dueDate,
  //           tags: res.tags,
  //           imageUrl: res.imageUrl,
  //         });
  //       }
  //     } catch (e) {
  //       console.error('나의 정보를 가져오지 못했습니다.: ', e);
  //     }
  //   };
  //   getMembers();
  //   getTodoData();
  //   getComments();

  //   // cardData.assigneeUserId에 해당하는 이메일 찾기
  //   const assigneeEmail = findMemberEmailById(res.assignee.id);
  //   console.log('assigneeEmail', assigneeEmail);
  //   setCardData((prev) => ({ ...prev, assigneeEmail: assigneeEmail }));
  //   setComments(getCommentsWithEmail());

  // }, []);

  const handlePostComment = async () => {
    console.log('댓글 입력하기');
    try {
      const res = await axiosPostJason('/comments', {
        content: comment,
        cardId: cardId,
        columnId: cardData.columnId,
        dashboardId: cardData.dashboardId,
      });
      console.log('res', res);

      // 입력값 초기화
      setComment('');
      getComments();
    } catch (e) {
      console.error(e);
    }
  };

  // 팝업 메뉴
  const [isPopupOpen, setPopupOpen] = useState(false);
  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  // 댓글삭제
  const handleDeleteComment = async (commentId) => {
    try {
      await axiosDelete(`/comments/${commentId}`);
      console.log(commentId, '삭제합니당');
      getComments();
    } catch (e) {
      console.error(e);
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
        console.log(res, '수정합니당');

        setEditCommentId(-1);
        getComments();
      }
    } catch (e) {
      console.error(e);
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
                <PopupMenu cardId={cardId} onClose={onClose} />
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
                {cardData.profileImageUrl ? (
                  <div className="relative rounded-full w-[26px] h-[26px] border-2 border-white_FFFFFF">
                    <Image fill src={cardData.profileImageUrl} alt="profile" />
                  </div>
                ) : (
                  // 이메일과id 일치하는 값 찾아서 이메일 앞글자 보냄
                  <Avatar
                    text={cardData?.assigneeEmail?.charAt(0).toUpperCase()}
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
              <div className="relative flex flex-col sign-input-base">
                <textarea
                  className="text-xs md:text-sm resize-none max-h-[70px] md:max-h-[110px] overflow-y-auto focus:border-0 focus:outline-none cursor-text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="댓글 작성하기"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                />
                <span className="relative flex justify-end ">
                  <CtaDefault
                    color="white"
                    size="xsmall"
                    onClick={handlePostComment}
                    disabled={!comment.trim()}
                  >
                    입력
                  </CtaDefault>
                </span>
              </div>
            </div>

            {/* 댓글박스 */}

            {/* 달린댓글 */}
            {comments.length > 0 &&
              comments.map((comment, index) => (
                <div key={index} className="flex gap-2">
                  {comment.author.profileImageUrl ? (
                    <div className="relative rounded-full w-[38px] h-[38px] border-2 border-white_FFFFFF">
                      <Image
                        fill
                        src={comment.author.profileImageUrl}
                        alt="profile"
                      />
                    </div>
                  ) : (
                    // <Avatar text={comment.author.id} />
                    <Avatar
                      text={comment.author.email.charAt(0).toUpperCase()}
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
                      <div className="sign-input-base relative flex flex-col ">
                        <textarea
                          className="text-xs md:text-sm resize-none max-h-[70px] md:max-h-[110px] overflow-y-auto focus:border-0 focus:outline-none cursor-text"
                          value={editComment}
                          onChange={(e) => setEditComment(e.target.value)}
                          placeholder="댓글 작성하기"
                          style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                          }}
                        />
                        <span className="relative flex justify-end">
                          <CtaDefault
                            color="white"
                            size="xsmall"
                            onClick={() => handlePutComment(comment.id)}
                            disabled={!editComment.trim()}
                          >
                            입력
                          </CtaDefault>
                        </span>
                      </div>
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
                {cardData.profileImageUrl ? (
                  <div className="relative rounded-full w-[38px] h-[38px] border-2 border-white_FFFFFF">
                    <Image fill src={cardData.profileImageUrl} alt="profile" />
                  </div>
                ) : (
                  // 이메일과id 일치하는 값 찾아서 이메일 앞글자 보냄
                  <Avatar
                    text={cardData?.assigneeEmail?.charAt(0).toUpperCase()}
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
