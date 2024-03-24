import { useDispatch } from 'react-redux';
import { changeCard, deleteCard, plusCount } from '@/features/columnsSlice';
import { axiosPut } from '@/features/axios';
import useModal from './useModal';

export default function useDashboardUtilityFunctions(dashboardId, columns) {
  const { openModal } = useModal();
  const dispatch = useDispatch();
  const handleOpenAddColumnsModal = () => {
    openModal({
      type: 'createColumn',
      props: {
        dashboardId,
      },
    });
  };
  const handleOpenInvitation = () => {
    openModal({
      type: 'inviteDashboard',
      props: {
        dashboardId,
      },
    });
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    const dragColumnIndex = columns.findIndex(
      (column) => column.id === +source.droppableId,
    );
    const findCard = columns[dragColumnIndex].cardList.find(
      (card) => card.id === +draggableId,
    );
    dispatch(
      deleteCard({
        columnId: +source.droppableId,
        id: findCard.id,
      }),
    );
    dispatch(
      plusCount({
        count: -1,
        columnId: +source.droppableId,
      }),
    );
    const body = {
      ...findCard,
      columnId: +destination.droppableId,
    };
    dispatch(
      changeCard({
        data: body,
        columnId: +source.droppableId,
        id: findCard.id,
        index: destination.index,
      }),
    );

    dispatch(
      plusCount({
        count: 1,
        columnId: +destination.droppableId,
      }),
    );
    await axiosPut(`cards/${findCard.id}`, body);
  };

  return {
    onDragEnd,
    handleOpenInvitation,
    handleOpenAddColumnsModal,
    openModal,
  };
}
