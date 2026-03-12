import React from 'react';
import styled from 'styled-components';

const Switch = () => {
    return (
        <StyledWrapper>
            <div>
                <input id="checkbox" type="checkbox" />
                <label className="switch" htmlFor="checkbox">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="slider">
                        <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z" />
                    </svg>
                </label>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  #checkbox {
    display: none;
  }

  .switch {
    position: relative;
    width: 70px;
    height: 70px;
    background-color: rgba(121, 121, 121, 1);
    border-radius: 50%;
    z-index: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid rgb(126, 126, 126);
    box-shadow: 0px 0px 3px rgb(2, 2, 2) inset;
    transition: 0.5s;
  }
  .switch svg {
    width: 1.2em;
  }
  .switch svg path {
    fill: rgb(48, 48, 48);
  }
  #checkbox:checked + .switch {
    box-shadow:
      0px 0px 1px rgba(248, 254, 255, 1) inset,
      0px 0px 2px rgba(222, 251, 255, 1) inset,
      0px 0px 10px rgb(151, 243, 255) inset,
      0px 0px 40px rgba(195, 242, 255, 1),
      0px 0px 100px rgba(190, 247, 255, 1),
      0px 0px 5px rgba(246, 251, 252, 1);
    border: 2px solid rgb(255, 255, 255);
    background-color: rgba(154, 192, 244, 1);
  }
  #checkbox:checked + .switch svg {
    filter: drop-shadow(0px 0px 5px rgba(255, 255, 255, 1));
  }
  #checkbox:checked + .switch svg path {
    fill: rgb(255, 255, 255);
  }
  #checkbox:active + .switch {
    transform: translate(0em, 0.1em);
    box-shadow:
      0px 0px 0.1px rgb(151, 243, 255) inset,
      0px 0px 0.2px rgb(151, 243, 255) inset,
      0px 0px 1px rgb(151, 243, 255) inset,
      0px 0px 10px rgb(151, 243, 255),
      0px 0px 50px rgb(151, 243, 255);
    border: 2px solid rgb(255, 255, 255);
    background-color: rgb(146, 180, 184);
  }
  #checkbox:active + .switch svg path {
    box-shadow: 0.2em 0.2em 0.3em rgba(0, 0, 0, 0.3);
    transform: translate(0em, 0.1em);
  }`;

export default Switch;
