import styled from 'styled-components';
import Modal from 'elements/Modal';
import ModalHeader from '../common/ModalHeader';
import AddSingleItem from '../equipmentAdd/AddSingleItem';
import EquipmentDetail from './detail/EquipmentDetail';

export default function EquipmentModal({
  isAdmin,
  showDetailModal,
  showSingleModal,
  handleDetailModal,
  handleSingleModal,
  category,
  largeCategory,
}) {
  return (
    <>
      <Modal isOpen={showDetailModal.show} onClose={handleDetailModal}>
        <EquipmentDetailWrapper>
          <ModalHeader isClose={handleDetailModal} requestType={'비품 상세'} />
          <EquipmentDetail
            isAdmin={isAdmin}
            category={category}
            largeCategory={largeCategory}
            detailId={showDetailModal.id}
            isClose={handleDetailModal}
          />
        </EquipmentDetailWrapper>
      </Modal>
      <Modal isOpen={showSingleModal} onClose={handleSingleModal}>
        <EquipmentAddWrapper>
          <ModalHeader isClose={handleSingleModal} requestType={'단일 등록'} />
          <AddSingleItem category={category} largeCategory={largeCategory} />
        </EquipmentAddWrapper>
      </Modal>
    </>
  );
}

const EquipmentDetailWrapper = styled.div`
  ${props => props.theme.flexCol}
  height: 80vh;
`;
const EquipmentAddWrapper = styled.div`
  ${props => props.theme.flexCol}

  height: 80vh;
  section {
    width: 100%;
    padding: 3rem;
  }

  form {
    height: 100%;
    margin: 0;
    padding: 0;
  }
`;
