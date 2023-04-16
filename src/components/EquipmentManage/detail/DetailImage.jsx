import React, { useState } from 'react';
import styled from 'styled-components';
import ImageAdd from '../../equipmentAdd/single/ImageAdd';
import { ImgDetailModal } from 'elements/ImgModal';

export default function DetailImage({ detail, preview, onChangeImage }) {
  const { image } = detail.supplyDetail;
  const [showModal, setShowModal] = useState(false);
  const handleClick = () => setShowModal(prev => !prev);

  return (
    <>
      <ImgContainer>
        {image ? (
          <img src={image} alt="Img" onClick={handleClick} />
        ) : (
          <ImageAdd
            editMode={'true'}
            preview={preview}
            onChangeimge={onChangeImage}
          />
        )}
      </ImgContainer>
      <ImgDetailModal src={image} isOpen={showModal} onClose={handleClick} />
    </>
  );
}

const ImgContainer = styled.div`
  display: flex;
  cursor: pointer;
  img {
    width: 26.6875rem;
    height: 26.6875rem;
    border: 1px solid ${props => props.theme.color.grey.brandColor2};
    border-radius: 0.375rem;
  }
`;
