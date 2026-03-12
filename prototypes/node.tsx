import React from 'react';
import styled from 'styled-components';

const Card = () => {
    return (
        <StyledWrapper>
            <div className="card">
                <div className="card2">
                </div>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .card {
    width: 190px;
    height: 254px;
    background-image: linear-gradient(163deg, #ffffffff 0%, #ffffffff 100%);
    border-radius: 20px;
    transition: all .3s;
  }

  .card2 {
    width: 190px;
    height: 254px;
    background-color: #878686ff;
    border-radius: 10px;
    transition: all .2s;
  }

  .card2:hover {
    transform: scale(0.98);
    border-radius: 20px;
  }

  .card:hover {
    box-shadow: 0px 0px 30px 1px rgba(255, 253, 253, 1);
  }`;

export default Card;
