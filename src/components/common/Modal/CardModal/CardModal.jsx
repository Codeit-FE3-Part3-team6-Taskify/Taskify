import { useEffect, useState } from 'react';
import Image from 'next/image';
import Modal from '../Modal';
import Avatar from '../../Avatar/Avatar';
import TagItem from '../../Tag/TagItem';
import CtaDefault from '../../Buttons/CtaDefault/CtaDefault';
import { axiosGet, axiosPostJason, axiosDelete } from '@/features/axios';
import { KebabIcon, CloseIcon } from '@/../public/images';

export default function CardModal({ onClose, cardId, columnTitle }) {
  // TODO(조예진): updateTodo와 같은 코드. 나중에 따로 커스텀훅으로 분리할 것
  // formValues.columnId로 컬럼목록조회->컬럼아이디가 같은 값을 찾아서 title 가져옴= 너무 복잡
  // 대시보드에서 카드클릭할 때, 컬럼 이름을 넘겨주는것으로 하는건 어떨지?
  // 해당 카드에 달린 댓글 불러오기
  // 이메일과id 일치하는 값 찾아서 아바타컴포넌트에 이메일 앞글자 보냄
  const [cardData, setCardData] = useState({
    assigneeUserId: 0,
    assigneeUserName: '',
    // dashboardId: 0,
    columnId: 0,
    title: '',
    description: '',
    dueDate: '',
    tags: [],
  });
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState([]);
  console.log(comments);

  useEffect(() => {
    const getTodoData = async () => {
      try {
        const res = await axiosGet(`/cards/${cardId}`);
        // console.log(res);
        if (!res.status) {
          setCardData({
            assigneeUserId: res.assignee.id,
            assigneeUserName: res.assignee.nickname,
            // dashboardId: res.dashboardId,
            columnId: res.columnId,
            title: res.title,
            description: res.description,
            dueDate: res.dueDate,
            tags: res.tags,
            imageUrl: res.imageUrl,
          });
        }
      } catch (e) {
        console.error('나의 정보를 가져오지 못했습니다.: ', e);
      }
    };
    getTodoData();

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
    getComments();
  }, []);

  const handlePostComment = () => {
    console.log('댓글 입력하기');
  };
  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col px-5 md:px-7">
        <div className="flex gap-4 md:gap-6">
          <Image src={KebabIcon} alt="kebab" width={24} height={24} />
          <Image src={CloseIcon} alt="close" width={20} height={20} />
        </div>
        <h1>{cardData.title}</h1>
        <div>
          <div>
            <span>담당자</span>
            <div>
              {cardData.assignee?.profileImageUrl ? (
                <div className="relative rounded-full w-[38px] h-[38px] border-2 border-white_FFFFFF">
                  <Image
                    fill
                    src={cardData.assignee?.profileImageUrl}
                    alt="profile"
                  />
                </div>
              ) : (
                // 이메일과id 일치하는 값 찾아서 이메일 앞글자 보냄
                <Avatar text={cardData.assigneeUserId} />
              )}

              <span>{cardData.assigneeUserName}</span>
            </div>
          </div>
          <div>
            <span>마감일</span>
            <span>{cardData.dueDate}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <span>{columnTitle}</span>
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
        <div>{cardData.description}</div>
        <div className="relative flex w-full">
          <Image fill src={cardData.imageUrl} alt="profile" />
        </div>
        <div className="flex flex-col gap-2">
          <span>댓글</span>

          <textarea
            className="sign-input-base"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="댓글 작성하기"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          />
          <CtaDefault color="white" size="xsmall" onClick={handlePostComment}>
            입력
          </CtaDefault>
        </div>
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
                <Avatar text={comment.author.id} />
              )}
              <div>
                <div className="flex gap-[6px]">
                  <div>{comment.author.nickname}</div>
                  <div>{comment.createdAt}</div>
                </div>
                <div>{comment.content}</div>
                <div className="flex gap-[6px]">
                  <div>수정</div>
                  <div>삭제</div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </Modal>
  );
}
