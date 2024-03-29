import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { DetailFilter } from '@/store/detailFilter';
import { SYSTEM } from '@/assets/icons/System';
import { Situation } from '@/types/event';
import { convertToPriceFormat } from '@/utils/convertFormat';
import { USER } from '@/assets/icons/User';
import { AutoComplete } from './AutoComplete';
import * as Style from './styles';
import Toolbar from '../Toolbar';
import { SituationText } from '@/hooks/useSituationList';
import { useWithdrawalParticipantList } from '@/queries/Group/useWithdrawalParticipantList';
import { useParams } from 'react-router-dom';
import WithdrawBadge from '@/components/@common/WithdrawBadge';
import useCheckListState from '@/hooks/useCheckListState';

type Props = {
  detailFilter: DetailFilter;
  setDetailFilter: Dispatch<SetStateAction<DetailFilter>>;
  totalAmount: number;
};

export type SearchMode = 'search' | 'select';

const SITUATION_FILTER: { value: Situation; title: SituationText }[] = [
  { value: '미납', title: '납부 전' },
  { value: '완납', title: '납부완료' },
  { value: '확인중', title: '승인대기' },
];

const FilterController = ({ detailFilter, setDetailFilter, totalAmount }: Props) => {
  const [searchMode, setSearchMode] = useState<SearchMode>('search');
  const { groupId } = useParams();

  const {
    checkDetailFineValues,
    setCheckDetailFine: { setInitCheckDetailFine },
  } = useCheckListState();

  const TotalAmount = checkDetailFineValues?.reduce((prev, current) => prev + current.amount, 0);

  const { isWithdrawal } = useWithdrawalParticipantList(Number(groupId));

  const updateSituationFilter = (situation: Situation) => {
    const isSameSituationFilter = detailFilter.situation === situation;
    setDetailFilter((prev) => ({ ...prev, situation: isSameSituationFilter ? '' : situation }));
  };

  const toggleSearchMode = () => {
    setSearchMode((prev) => (prev === 'search' ? 'select' : 'search'));
  };

  const updateDetailFilterNickname = (nickname: string) => {
    setDetailFilter((prev) => ({ ...prev, nickname }));
    toggleSearchMode();
  };

  const cancelSearchNickname = () => {
    setDetailFilter((prev) => ({ ...prev, nickname: '' }));
    toggleSearchMode();
  };
  useEffect(() => {
    detailFilter.nickname !== '' ? setSearchMode('select') : setSearchMode('search');
  }, [detailFilter]);

  return (
    <>
      <Toolbar />
      <Style.FilterContainer>
        <Style.LeftContainer onClick={setInitCheckDetailFine}>
          <Style.FilterText>필터</Style.FilterText>
          <Style.ButtonContainer>
            {SITUATION_FILTER.map(({ value, title }) => {
              return (
                <Style.SituationButton
                  key={value}
                  onClick={() => updateSituationFilter(value)} //
                  isActive={detailFilter.situation === value}
                >
                  {title}
                </Style.SituationButton>
              );
            })}
          </Style.ButtonContainer>
          <Style.SearchContainer>
            <Style.Icon_LG>{SYSTEM.SEARCH_BLACK}</Style.Icon_LG>
            {searchMode === 'select' ? (
              <Style.SelectedMember>
                <Style.SelectedNickname onClick={toggleSearchMode}>
                  {USER.PERSON_SM}
                  {detailFilter.nickname}
                  {isWithdrawal(detailFilter.nickname) && <WithdrawBadge />}
                </Style.SelectedNickname>
                <Style.CancelButton onClick={cancelSearchNickname}>{SYSTEM.CLOSE_SM}</Style.CancelButton>
              </Style.SelectedMember>
            ) : (
              <AutoComplete updateDetailFilterNickname={updateDetailFilterNickname} initialNickname={detailFilter.nickname} />
            )}
          </Style.SearchContainer>
        </Style.LeftContainer>
        <Style.AmountContainer>
          <Style.AmountTitle>합계</Style.AmountTitle>
          <Style.Amount>
            {TotalAmount === 0 ? 0 : convertToPriceFormat(TotalAmount)} <Style.Amount_Unit> 원</Style.Amount_Unit>
          </Style.Amount>
        </Style.AmountContainer>
      </Style.FilterContainer>
    </>
  );
};

export default FilterController;
