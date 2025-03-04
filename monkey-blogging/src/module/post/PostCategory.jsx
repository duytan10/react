/* eslint-disable react/prop-types */
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

const PostCategoryStyles = styled.div`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 10px;
  color: ${props => props.theme.gray6B};
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  a {
    display: block;
  }
  ${props =>
    props.type === 'primary' &&
    css`
      background-color: ${props => props.theme.grayF3};
    `};
  ${props =>
    props.type === 'secondary' &&
    css`
      background-color: white;
    `};
  @media screen and (max-width: 1023.98px) {
    font-size: 10px;
  }
`;

const PostCategory = ({
  children,
  type = 'primary',
  className = '',
  to = '',
}) => {
  return (
    <PostCategoryStyles type={type} className={`post-category ${className}`}>
      <NavLink to={`/category/${to}`}>{children}</NavLink>
    </PostCategoryStyles>
  );
};

export default PostCategory;
