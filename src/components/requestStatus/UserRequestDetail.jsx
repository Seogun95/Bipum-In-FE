import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Axios from '../../api/axios';

import ModalHeader from '../common/ModalHeader';
import Button from '../../elements/Button';

import { FormatKoreanTime } from '../../utils/formatDate';
import STRING from '../../constants/string';

import UserInfo from './detail/UserInfo';
import UserPutButton from './ userDetail/UserPutButton';
import RequestImgDetail from './detail/RequestImgDetail';
import UserRequestItem from './ userDetail/UserRequestItem';

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

export default function UserRequestDetail({ detail, isClose, isAdmin }) {
  const {
    requestId,
    requestType,
    acceptResult,
    categoryName,
    serialNum,
    content,
    imageList,
    allocatedModel,
    allocatedImage,
    adminName,
    adminDeptName,
    adminPhone,
    adminImage,
    createdAt,
    modifiedAt,
  } = detail;

  const [editMode, setEditMode] = useState(false);
  const [newContent, setNewContent] = useState(content);
  const [formImage, setFormformImage] = useState(null);
  const [serverImg, setServerImg] = useState(imageList);

  const data = {
    requestType: '',
    content: '',
    multipartFile: '',
    storedImageURLs: '',
  };

  const handleEditToggle = () => {
    if (editMode) putRequest();
    setEditMode(prev => !prev);
  };
  const deletRequest = () =>
    axios.delete(`/api/requests/${requestId}`).then(() => isClose());

  const handleChangeimg = e => {
    const img = [...e.target.files];
    setFormformImage(img);
    setPreviewImage(img);
  };

  const handleDeleteImage = imgIndex => {
    const updatedServerImg = serverImg.filter((_, index) => index !== imgIndex);
    setServerImg(updatedServerImg);
  };

  const setPreviewImage = images => {
    const previewArray = [];
    for (let i = 0; i < images.length; i++) {
      const reader = new FileReader();
      reader.onloadend = () => {
        previewArray.push(reader.result);

        if (previewArray.length === images.length) {
          setServerImg([...serverImg, ...previewArray]);
        }
      };
      reader.readAsDataURL(images[i]);
    }
  };

  const putRequest = () => {
    const formData = new FormData();
    const requestTypeEng = STRING.REQUEST_NAME_ENG[requestType];
    formData.append('requestType', requestTypeEng);
    formData.append('content', newContent);
    if (requestType !== STRING.REQUEST_NAME.SUPPLY) {
      serverImg.forEach(img => {
        formData.append('storedImageURLs', img);
      });
      if (formImage) {
        formImage.forEach(img => {
          formData.append('multipartFile', img);
        });
      }
    }

    axios
      .put(`/api/requests/${requestId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => isClose());
  };

  const handleContentChange = e => {
    setNewContent(e.target.value);
  };

  const editRequest = (e, requestType) => {
    e.preventDefault();
    data.requestType = requestType;
    data.content = newContent;
    putRequest(data);
  };
  const editSupply = e => editRequest(e, STRING.REQUEST_TYPES.SUPPLY);
  const editReturn = e => editRequest(e, STRING.REQUEST_TYPES.RETURN);
  const editRepair = e => editRequest(e, STRING.REQUEST_TYPES.REPAIR);
  const editReport = e => editRequest(e, STRING.REQUEST_TYPES.REPORT);

  return (
    <>
      <DetailContainer>
        <ModalHeader isClose={isClose} requestType={requestType} />
        <ContentContainer>
          <RequestContainer>
            <RequestTopWrapper>
              <DetailTitle>요청 정보</DetailTitle>
              <DeleteAndPutContainer>
                {!editMode && (
                  <Button mainBtn={'border'} onClick={deletRequest}>
                    삭제
                  </Button>
                )}
                <UserPutButton
                  requestType={requestType}
                  acceptResult={acceptResult}
                  editMode={editMode}
                  handleEditToggle={handleEditToggle}
                  editSupply={editSupply}
                  editReturn={editReturn}
                  editRepair={editRepair}
                  editReport={editReport}
                />
              </DeleteAndPutContainer>
            </RequestTopWrapper>

            {/* 부폼 관련 정보 */}
            <UserRequestItem
              editMode={editMode}
              categoryName={categoryName}
              content={content}
              handleContentChange={handleContentChange}
              requestType={requestType}
              serialNum={serialNum}
            />

            {/* 비품 반납 요청서 첨부사진  */}
            {requestType !== STRING.REQUEST_NAME.SUPPLY && (
              <>
                <Hr />
                <RequestImgDetail
                  text={'첨부 사진'}
                  image={serverImg}
                  editMode={editMode}
                  onDelete={handleDeleteImage}
                  onChangeimge={handleChangeimg}
                />
              </>
            )}

            {/* 비품 요청서 (승인) */}
            {acceptResult === STRING.REQUEST_STATUS.ACCEPT && (
              <>
                <Hr />
                <RequestTopWrapper>
                  <DetailTitle>관리자 답변 정보</DetailTitle>
                </RequestTopWrapper>
                {requestType === STRING.REQUEST_NAME.SUPPLY &&
                  acceptResult === STRING.REQUEST_STATUS.ACCEPT && (
                    <>
                      <RequestDetailWrapper>
                        <ItemContainer>
                          <TypeTitle>제공받은 비품</TypeTitle>
                          <TypeDetailTitle>{allocatedModel}</TypeDetailTitle>
                        </ItemContainer>
                      </RequestDetailWrapper>
                      <AllocatedImg src={allocatedImage} alt=""></AllocatedImg>
                      <Hr />
                    </>
                  )}

                <UserInfo
                  phoneNum={adminPhone}
                  userImage={adminImage}
                  deptName={adminDeptName}
                  empName={adminName}
                  isAdmin={isAdmin}
                />
                <RequestDate>
                  처리일: {FormatKoreanTime(modifiedAt)}
                </RequestDate>
              </>
            )}
            <RequestDate>요청일: {FormatKoreanTime(createdAt)}</RequestDate>
          </RequestContainer>
        </ContentContainer>
      </DetailContainer>
    </>
  );
}

const RequestTopWrapper = styled.div`
  ${props => props.theme.FlexRow};
  align-items: center;
  margin-bottom: 1.5rem;
`;

const RequestDetailWrapper = styled(RequestTopWrapper.withComponent('div'))`
  justify-content: flex-start;
  margin-bottom: 0rem;
`;

const ItemContainer = styled.div`
  ${props => props.theme.FlexCol};
  justify-content: flex-start;
  margin-right: 2.625rem;
`;
const TypeTitle = styled.span`
  color: ${props => props.theme.color.grey.brandColor5};
  font-size: 0.8125rem;
`;
const TypeDetailTitle = styled.span`
  font-size: 0.9375rem;
  line-height: 3;
`;

const DetailTitle = styled.span`
  color: ${props => props.theme.color.blue.brandColor6};
  font-size: 0.9375rem;
`;
const DeleteAndPutContainer = styled.div`
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};
  margin-left: auto;
  gap: 0.3125rem;
`;

const RequestDate = styled.div`
  ${props => props.theme.FlexRow};
  align-items: flex-start;
  color: ${props => props.theme.color.grey.brandColor4};
  font-size: 0.75rem;
  padding-top: 0.5rem;
`;
const Hr = styled.div`
  height: 0.0625rem;
  width: 100%;
  background-color: ${props => props.theme.color.grey.brandColor2};
  margin: 1rem 0 2rem 0;
`;

const AllocatedImg = styled.img`
  max-width: 8.25rem;
  min-width: 8.25rem;
  min-height: 8.25rem;
  max-height: 8.25rem;
`;
// TODO: AdminRequestDetail이랑 스타일 중복
const DetailContainer = styled.main`
  ${props => props.theme.FlexCol};
  ${props => props.theme.FlexCenter};
`;

const ContentContainer = styled.div`
  ${props => props.theme.FlexCol};
  ${props => props.theme.FlexCenter};
  width: 100%;
  height: 100%;
  padding: 1.875rem 3.9375rem;
`;

const RequestContainer = styled.div`
  ${props => props.theme.FlexCow};
  align-items: center;
  width: 100%;
  font-weight: 600;
`;
