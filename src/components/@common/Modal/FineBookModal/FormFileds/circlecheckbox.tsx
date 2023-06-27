import styled from '@emotion/styled';

type Props = {
  id: any;
  isChecked: boolean;
  onChange: () => void;
};

const CirCleCheckBox = ({ id, isChecked, onChange }: Props) => {
  return (
    <CheckBoxContainer>
      <Input type="checkbox" id={id} checked={isChecked} onChange={onChange} />
      <CheckBoxWrapper>
        <CheckBox checked={isChecked} />
        <Text htmlFor={id}>{id}</Text>
      </CheckBoxWrapper>
    </CheckBoxContainer>
  );
};

export default CirCleCheckBox;

const CheckBoxContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;

  gap: 0.375rem;
`;

const CheckBox = styled.div<{ checked: boolean }>`
  position: relative;

  border-radius: 9999px;
  padding: 0.5rem;

  box-shadow: inset 0 0 0 1px #bdbdbd;
  background-color: #f1f2f3;

  &::after {
    content: '';
    position: absolute;
    top: 50;
    left: 50;

    border-radius: 9999px;
    padding: 0.25rem;

    background-color: #1c6ee9;

    transform: translate(-50%, -50%);
  }
`;

const Text = styled.label`
  color: #2d2d2d;

  font-weight: 500;
`;
