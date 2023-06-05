import styled from 'styled-components';

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => theme.desktopBackground};

    .window-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .close-icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-left: -1px;
        margin-top: -1px;
        transform: rotateZ(45deg);
        position: relative;

        &:before,
        &:after {
            content: '';
            position: absolute;
            background: ${({ theme }) => theme.materialText};
        }

        &:before {
            height: 100%;
            width: 3px;
            left: 50%;
            transform: translateX(-50%);
        }

        &:after {
            height: 3px;
            width: 100%;
            left: 0px;
            top: 50%;
            transform: translateY(-50%);
        }
    }

    .window {
        width: 650px; 
        height: 600px; 
        min-height: 200px;
    }

    h1 {
        font-size: 1.2rem;
        margin-bottom: 10px;
        font-weight: bolder;
    }

    p {
        font-size: 1rem;
        line-height: 1.5;
        margin-bottom: 20px;
    }
`;


const PopupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

export default {
    Wrapper,
    PopupContainer
};
