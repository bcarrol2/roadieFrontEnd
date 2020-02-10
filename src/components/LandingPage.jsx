import React from "react";
import styled from 'styled-components';
import BackDrop from '../img/Roadie-Web.jpg';

const StyledBody = styled.div`
  background: url('${BackDrop}');
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`;

export default function LandingPage () {
  return(
    <StyledBody>
      <a href="http://localhost:3001/reviews" id="review-link"> Reviews</a>
      <div className="centered">
        <div className="moving">
          <h1>Take the high roadie</h1>
        </div>
        <br />
      </div>
    </StyledBody>
  )
};