/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const PostMetaStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 600;

  .post {
    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 100rem;
    }
  }
  @media screen and (max-width: 1023.98px) {
    font-size: 10px;
    gap: 6px;
  }
`;

const PostMeta = ({
  date = 'Mar 23',
  authorName = 'Andiez Le',
  className = '',
  to = '/',
}) => {
  return (
    <PostMetaStyles className={`post-meta ${className}`}>
      <span className="post-time">{date}</span>
      <span className="post-dot"></span>
      <NavLink to={to}>
        <span className="post-author">{authorName}</span>
      </NavLink>
    </PostMetaStyles>
  );
};

export default PostMeta;
