import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { ReactComponent as ArrowDown } from 'styles/commonIcon/arrowDown.svg';
import ModalImgCarousel from './ModalImgCarousel';
import { styles } from 'components/common/commonStyled';
import PLACEHOLDER from 'constants/placeholder';

export default function Provide({
  image,
  comment,
  stockList,
  requestType,
  acceptResult,
  requestStatus,
  declineComment,
  setDeclineComment,
  handleChangeSelect,
}) {
  return (
    <ProvideContainer>
      {!acceptResult && requestType === '비품 요청' ? (
        <ProvideEquipment>
          <span>제공할 비품</span>
          <SelectWrapper>
            <Select onChange={handleChangeSelect}>
              {stockList.length ? (
                <option value="">선택</option>
              ) : (
                <option value="">재고가 없습니다</option>
              )}
              {stockList.map(stock => (
                <option key={stock.supplyId} value={stock.supplyId}>
                  {`modelName:${stock.modelName} serialNum:${stock.serialNum}`}
                </option>
              ))}
            </Select>
            <SelectArrow>
              <ArrowDown />
            </SelectArrow>
          </SelectWrapper>
        </ProvideEquipment>
      ) : (
        requestType !== '비품 요청' && (
          <EquipmentImageContainer>
            <span>비품 사진</span>
            <ModalImgCarousel image={image} />
          </EquipmentImageContainer>
        )
      )}
      {requestStatus === '처리전' ? (
        <MessegeAndRefuse>
          <span>남길 메시지</span>
          <TextArea
            value={declineComment}
            onChange={e => setDeclineComment(e.target.value)}
            placeholder={PLACEHOLDER.lEAVE_TO_MESSAGE_LENGTH(100)}
            maxLength={100}
          />
          <styles.TextLength>{declineComment.length}/100</styles.TextLength>
        </MessegeAndRefuse>
      ) : (
        comment && (
          <SendMessegeContainer>
            <span>남긴 메시지</span>
            <SendMessege>{comment}</SendMessege>
          </SendMessegeContainer>
        )
      )}
    </ProvideContainer>
  );
}

const ProvideContainer = styled.div`
  ${props => props.theme.FlexCol};
  width: 100%;
  font-weight: 600;
  font-size: 1rem;
`;

const EquipmentImageContainer = styled.div`
  position: relative;
  ${props => props.theme.FlexCol};
  color: ${props => props.theme.color.blue.brandColor6};
  margin-top: 1rem;
  padding-bottom: 1rem;
  overflow: hidden;
  span {
    padding-bottom: 1rem;
  }
`;

const ProvideEquipment = styled.div`
  ${props => props.theme.FlexRow};
  align-items: center;
  color: ${props => props.theme.color.blue.brandColor6};
  padding: 1.5rem 0;
  border-bottom: 1px solid ${props => props.theme.color.grey.brandColor2};
  font-size: 0.9375rem;
  font-weight: 600;
`;

const MessegeAndRefuse = styled.div`
  position: relative;
  ${props => props.theme.FlexRow};
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${props => props.theme.color.blue.brandColor6};
  margin-top: 1.5rem;
  span {
    margin-right: 1.375rem;
  }
`;

const SendMessegeContainer = styled.div`
  ${props => props.theme.FlexCol};
  color: ${props => props.theme.color.blue.brandColor6};
  margin-top: 1.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  gap: 0.375rem;
`;

const SendMessege = styled.pre`
  color: black;
  font-size: 0.9375rem;
  font-weight: 500;
  white-space: pre-wrap;
`;

const TextArea = styled.textarea`
  width: 22.0625rem;
  height: 6rem;
  background-color: ${props => props.theme.color.grey.brandColor1};
  border: none;
  padding: 0.5rem;
  resize: none;
  white-space: pre-wrap;
`;

const Select = styled.select`
  position: relative;
  width: 100%;
  height: 2.125rem;
  color: ${props => props.theme.color.grey.brandColor7};
  background-color: ${props => props.theme.color.grey.brandColor1};
  border: 1px solid ${props => props.theme.color.grey.brandColor3};
  border-radius: 0.375rem;
  text-align-last: center;
  text-align: center;
  -ms-text-align-last: center;
  -moz-text-align-last: center;
  appearance: none;
  padding: 0.3125rem 0.625rem;
  padding-right: 1.5625rem;
`;

const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 8rem;
  height: 1.875rem;
  margin-left: 1.375rem;
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
      stroke: ${props => props.theme.color.grey.brandColor7};
    }
  }
`;
