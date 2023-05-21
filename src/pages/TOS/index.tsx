import { Button } from '@/components/@common';
import { KAKAO_URL } from '@/constants/Auth';
import { TOS_LINK } from '@/constants/ServiceLink';
import React, { useState } from 'react';
import { ARROW } from '../../assets/icons/Arrow';
import { LOGO } from '../../assets/icons/Logo';
import * as Style from './styles';

interface TOS {
  id: number;
  title: string;
  href: string;
  required: boolean;
}

const TOSList: TOS[] = [
  { id: 1, title: '개인정보수집 동의', href: TOS_LINK.PRIVACY, required: true },
  { id: 2, title: '이용약관 동의', href: TOS_LINK.TERMS, required: true },
];

const TOS = () => {
  const [checkedList, setCheckedList] = useState<number[]>([]);
  const requiredTos = TOSList.filter((list) => list.required).map((list) => list.id);

  const checkedItemHandler = (tos: TOS, isChecked: boolean) => {
    if (isChecked) {
      return setCheckedList((prev) => [...prev, tos.id]);
    }
    setCheckedList(checkedList.filter((checked) => checked !== tos.id));
  };

  const checkHandler = (e: React.ChangeEvent<HTMLInputElement>, tos: TOS) => {
    checkedItemHandler(tos, e.target.checked);
  };

  const allCheckHandler = () => {
    if (isAllChecked) {
      setCheckedList([]);
    } else {
      setCheckedList([...requiredTos]);
    }
  };

  const onSubmit = () => {
    window.location.href = KAKAO_URL.SIGNUP;
  };

  const isAllChecked = checkedList.length === requiredTos.length;

  return (
    <>
      <Style.Layout>
        {LOGO.LG}
        <Style.TOSContainer>
          <Style.TOSTitle>약관 동의</Style.TOSTitle>
          <span>아래의 내용 확인 후 동의해 주세요.</span>
          <Style.TOSList>
            <Style.TOSWhole>
              <label>
                <input type="checkbox" checked={isAllChecked} onClick={allCheckHandler} />
                <span>전체 약관 모두 동의</span>
              </label>
            </Style.TOSWhole>
            {TOSList.map((list) => (
              <Style.TOS key={list.id}>
                <label>
                  <input type="checkbox" checked={checkedList.includes(list.id)} onChange={(event) => checkHandler(event, list)} />
                  <span>
                    {list.required ? '(필수)' : '(선택)'}
                    {list.title}
                  </span>
                </label>
                <Style.TOSLink href={list.href} target="_blank" rel="noopnner noreferrer">
                  {ARROW.RIGHT}
                </Style.TOSLink>
              </Style.TOS>
            ))}
          </Style.TOSList>
          <Style.TOSFooter>
            <Button color={isAllChecked ? 'primary' : 'disabled'} onClick={onSubmit}>
              가입
            </Button>
          </Style.TOSFooter>
        </Style.TOSContainer>
      </Style.Layout>
    </>
  );
};

export default TOS;