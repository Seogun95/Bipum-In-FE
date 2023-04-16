import styled from 'styled-components';
import { getEncryptionStorage } from 'utils/encryptionStorage';
import defaultLogo from 'styles/commonIcon/defaultLogo.svg';

export default function UserInfo({
  userImage,
  deptName,
  empName,
  username,
  phoneNum,
}) {
  const { isAdmin } = getEncryptionStorage();
  return (
    <UserInfoWrapper>
      <UserInfoTitle>{isAdmin ? '요청자 정보' : '관리자 정보'}</UserInfoTitle>
      <UserInfoContainer>
        {userImage ? (
          <Img src={userImage} alt="userImage" />
        ) : (
          <Img src={defaultLogo} nouser alt="userImage" />
        )}
        <UserInfoContent>
          <UserInfoDeptAndName>
            <DeptName>
              <span>부서</span>
              {deptName}
            </DeptName>
            <EmpName>
              <span>이름</span>
              {empName}
            </EmpName>
          </UserInfoDeptAndName>
          <UserName>
            {isAdmin ? (
              <>
                <span>이메일</span>
                {username}
              </>
            ) : (
              <>
                <span>전화번호</span>
                {phoneNum}
              </>
            )}
          </UserName>
        </UserInfoContent>
      </UserInfoContainer>
    </UserInfoWrapper>
  );
}

const UserInfoWrapper = styled.div`
  padding-bottom: 1.5rem;
  border-bottom: ${props =>
    props.isAdmin ? `1px solid ${props.theme.color.grey.brandColor2}` : 'none'};
`;

const UserInfoTitle = styled.div`
  margin-bottom: 1.25rem;
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 8.25rem;
`;

const UserInfoContent = styled.div`
  ${props => props.theme.FlexCol};
  justify-content: flex-start;
  width: 100%;
  height: 6rem;
  gap: 1rem;

  span {
    color: ${props => props.theme.color.grey.brandColor5};
    font-size: 0.8125rem;
  }
`;

const UserInfoDeptAndName = styled.div`
  ${props => props.theme.FlexRow};
  gap: 2rem;
`;

const DeptName = styled.div`
  ${props => props.theme.FlexCol};
  font-size: 0.9375rem;
  font-weight: 500;
  gap: 0.375rem;
`;

const EmpName = styled.div`
  ${props => props.theme.FlexCol};
  width: 10rem;
  font-size: 0.9375rem;
  font-weight: 500;
  gap: 0.375rem;
`;

const UserName = styled.div`
  ${props => props.theme.FlexCol};
  font-size: 0.9375rem;
  font-weight: 500;
  gap: 0.375rem;
`;

const Img = styled.img`
  max-width: 8.25rem;
  min-width: 8.25rem;
  min-height: 8.25rem;
  max-height: 8.25rem;
  border-radius: 50%;
  margin-right: 2.25rem;
  object-fit: ${props => (props.nouser ? 'scale-down' : 'cover')};
  background: ${props => props.nouser && props.theme.color.blue.brandColor2};
`;
