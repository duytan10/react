import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { LoadingSpinner } from '../loading';
import { NavLink } from 'react-router-dom';

const ButtonStyles = styled.button`
  cursor: pointer;
  padding: 0 25px;
  line-height: 1;
  border-radius: 8px;
  font-weight: 600;
  font-size: 18px;
  height: ${props => props.height || '66px'};
  display: flex;
  justify-content: center;
  align-items: center;
  ${props =>
    props.kind === 'secondary' &&
    css`
      color: ${props => props.theme.primary};
      background-color: white;
    `};
  ${props =>
    props.kind === 'primary' &&
    css`
      color: white;
      background-color: ${props => props.theme.primary};
    `};
  ${props =>
    props.kind === 'ghost' &&
    css`
      color: ${props => props.theme.primary};
      background-color: rgba(29, 192, 113, 0.1);
    `};
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const Button = ({
  type = 'button',
  onClick = () => {},
  children,
  kind = 'primary',
  isLoading,
  ...props
}) => {
  // eslint-disable-next-line react/prop-types
  const { to } = props;
  // eslint-disable-next-line no-extra-boolean-cast
  const child = !!isLoading ? <LoadingSpinner></LoadingSpinner> : children;
  if (to !== '' && typeof to === 'string') {
    return (
      <NavLink to={to} className="inline-block">
        <ButtonStyles type={type} kind={kind} {...props}>
          {child}
        </ButtonStyles>
      </NavLink>
    );
  }
  return (
    <ButtonStyles type={type} kind={kind} onClick={onClick} {...props}>
      {child}
    </ButtonStyles>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit']),
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  kind: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
};

export default Button;
