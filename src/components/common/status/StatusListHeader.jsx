import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Search } from '../../../styles/commonIcon/search.svg';
import { ReactComponent as ArrowDown } from '../../../styles/commonIcon/arrowDown.svg';
import Input from '../../../elements/Input';
import Button from '../../../elements/Button';

export default function StatusListHeader({
  setSelectName,
  selectBoxList,
  containerHeaderRef,
  status,
  setStatus,
  keyword,
  setKeyword,
  children,
}) {
  return (
    <RequestShowTitle ref={containerHeaderRef}>
      <Title>{setSelectName}</Title>
      <SearchSelect>
        {children}
        <SearchContainer>
          <SearchIconContainer>
            <Button>
              <Search />
            </Button>
          </SearchIconContainer>
          <Input
            value={keyword}
            setState={setKeyword}
            placeholder="검색어를 입력해주세요 (신청자,담당부서 등)"
          />
        </SearchContainer>
        <SelectWrapper>
          <Select value={status} onChange={setStatus}>
            {selectBoxList.name.map((value, index) => (
              <option key={value} value={selectBoxList.type[index]}>
                {value}
              </option>
            ))}
          </Select>
          <SelectArrow>
            <ArrowDown />
          </SelectArrow>
        </SelectWrapper>
      </SearchSelect>
    </RequestShowTitle>
  );
}

const RequestShowTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1.5rem;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 1.25rem;
  margin-top: 1.75rem;
  margin-left: 2.5rem;
`;

const SearchSelect = styled.div`
  ${props => props.theme.FlexRow}
  ${props => props.theme.FlexCenter}
  margin-top: 1.5rem;
`;

const SearchContainer = styled.div`
  ${props => props.theme.FlexRow}
  ${props => props.theme.FlexCenter}
  width: 28.375rem;
  height: 2.125rem;
  background-color: ${props => props.theme.color.grey.brandColor1};
  margin: 0;
  margin-right: 1rem;
  border-radius: 0.5rem;

  input {
    font-size: 1rem;
    padding: 0.5rem 0.5rem 0.5rem 0;
  }
`;

const SearchIconContainer = styled.div`
  padding: 0 1rem;
  button {
    padding: 0;
  }
`;

const Select = styled.select`
  position: relative;
  width: 100%;
  height: 2.125rem;
  color: ${props => props.theme.color.blue.brandColor6};
  background-color: ${props => props.theme.color.blue.brandColor1};
  border: 0.0625rem solid ${props => props.theme.color.blue.brandColor3};
  border-radius: 0.375rem;
  font-weight: 600;
  font-size: 0.875rem;
  text-align-last: center;
  text-align: center;
  appearance: none;
  padding: 0.3125rem 0.625rem;
  padding-right: 1.5625rem;
`;

const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 5.6rem;
  height: 2.5rem;
  margin-right: 1.9375rem;
`;

const SelectArrow = styled.div`
  position: absolute;
  top: 50%;
  right: 0.625rem;
  height: 0.9375rem;
  width: 0.9375rem;
  transform: translateY(-50%);
  pointer-events: none;
  svg {
    width: 0.9375rem;
    height: 0.9375rem;
    * {
      stroke: ${props => props.theme.color.blue.brandColor6};
    }
  }
`;
