import { ModalProps, ModalFooterProps } from './index';
import styled from '@emotion/styled';

export const Overlay = styled.div<Pick<ModalProps, 'isOpen'>>`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  background-color: #2d2d2d;
  opacity: 0.3;
  z-index: 10;
  width: 100%;
  height: 100%;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
`;

export const ModalFrame = styled.div<ModalProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 20;
  background-color: white;
  padding: 24px 32px;
`;

export const ModalHeader = styled.div``;

export const HeaderTitle = styled.span``;

export const ModalBody = styled.div``;

export const ModalFooter = styled.div<Pick<ModalFooterProps, 'flexDirection'>>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
`;
