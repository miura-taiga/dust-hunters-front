import styled from '@emotion/styled';

export const GameContainerWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <GameContainer>{children}</GameContainer>;
};

const GameContainer = styled.div`
  background-image: url('/images/layouts/basic_background.jpg');
  background-repeat: repeat;
  background-size: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export default GameContainerWrapper;
