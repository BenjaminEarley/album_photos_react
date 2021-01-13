import styled from "styled-components";

export const Page = styled.div`
  padding: 62px;
`;

export const Header = styled.h1`
  font-style: normal;
  font-weight: 500;
  font-size: 44px;
  line-height: 54px;
  text-align: center;
  color: #32343C;
  padding-top: 94px;
  padding-bottom: 94px;
`;

export const Card = styled.div`
  background: #F0F2F5;
  height: 150px;
  line-height: 150px;
  text-align: center;
  width: 150px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 150px);
  grid-row-gap: 80px;
  grid-column-gap: 60px;
  width: 100%;
  justify-content: center;
`;

export const TopBar = styled.div`
  height: 62px;
  width: 100%;
  position: relative;
  float: left;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.05);
`;

export const Logo = styled.img`
  position: absolute;
  padding-left: 30px;
  top: calc(50% - 24px / 2);
`;