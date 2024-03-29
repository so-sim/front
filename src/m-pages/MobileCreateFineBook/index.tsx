import { ARROW } from '@/assets/icons/Arrow';
import { SYSTEM } from '@/assets/icons/System';
import { Button } from '@/components/@common';
import { initialSelectData } from '@/contexts/SelectedFineContext';
import useFinebook from '@/hooks/Group/useFinebook';
import ModalPageLayout from '@/layouts/Mobile/ModalPageLayout';
import MobileFineBookForm from '@/m-components/MobileFineBookForm';
import { dateState } from '@/store/dateState';
import { detailFineState } from '@/store/detailFineState';
import { pushDataLayer } from '@/utils/pushDataLayer';
import { checkFormIsValid } from '@/utils/validation';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

const MobileCreateFineBook = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();

  const goBack = () => {
    navigate(-1);
  };

  const [isOpen, setIsOpen] = useRecoilState(detailFineState);
  const [calendarDate, setCalendarDate] = useRecoilState(dateState);
  const { selectData, getFormFiledActions, convertSituationToText, createLoading } = useFinebook(initialSelectData);
  const { createDetail, onInitForm } = getFormFiledActions();

  const onSubmitCreateDetail = (type: 'continue' | 'save') => {
    pushDataLayer('add_list', { button: type === 'continue' ? 'keep' : 'add' });

    createDetail().then(() => {
      if (type === 'save') {
        setIsOpen(true);

        setCalendarDate({
          startDate: dayjs(selectData.date),
          endDate: dayjs(selectData.date),
          baseDate: dayjs(selectData.date),
          mode: 'day',
        });

        navigate(`/m-group/${groupId}/book`);
      } else {
        onInitForm();
      }
    });
  };

  return (
    <ModalPageLayout title="내역 추가하기" left={{ icon: ARROW.LEFT, onClick: goBack }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
        <MobileFineBookForm //
          selectData={selectData}
          action={getFormFiledActions}
          convertSituationToText={convertSituationToText}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '32px' }}>
          <Button //
            width="100%"
            height="42px"
            loading={createLoading}
            color={checkFormIsValid(selectData) ? 'black' : 'disabled'}
            onClick={() => onSubmitCreateDetail('save')}
          >
            추가하기
          </Button>
          <Button //
            width="100%"
            height="42px"
            leftIcon={SYSTEM.PLUS_BLACK_SM}
            color={checkFormIsValid(selectData) ? 'white' : 'white-disabled'}
            onClick={() => onSubmitCreateDetail('continue')}
          >
            계속해서 추가하기
          </Button>
        </div>
      </div>
    </ModalPageLayout>
  );
};

export default MobileCreateFineBook;
