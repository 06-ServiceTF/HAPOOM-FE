import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { Line } from '@/styles/signUp';
import { RightArrow } from './SVG';

type accordianProps = {
  $isOpen?: boolean;
};

const AccordianLayout = styled.div`
  width: 100%;
  margin-bottom: 32px;
`;

export const AccordianTab = styled.button<accordianProps>`
  width: 100%;
  padding: 20px 0 16px;
  color: ${(props) =>
    props.$isOpen ? 'var(--primary-second-color)' : 'var(--text-tab-gray)'};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: none;
  border: none;
  font-weight: 700;
`;

type DroptabProps = {
  tabText: string;
  children: ReactNode;
  hideLine?: boolean;
};

const AccordianMenu = ({ tabText, children }: DroptabProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClickDropTabHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <AccordianLayout>
        <AccordianTab onClick={onClickDropTabHandler} $isOpen={isOpen}>
          {tabText}
          <RightArrow
            rotation={isOpen}
            fillColor={isOpen ? '#0084FF' : '#8995a7'}
          />
        </AccordianTab>
        {isOpen ? children : null}
      </AccordianLayout>
      {isOpen ? (
        <Line
          width={'100%'}
          $borderColor={'var(--text-tab-gray)'}
          style={{ display: 'none' }}
        ></Line>
      ) : (
        <Line
          width={'100%'}
          $borderColor={'var(--text-tab-gray)'}
          style={{ marginTop: '-20px' }}
        ></Line>
      )}
    </>
  );
};

export default AccordianMenu;
