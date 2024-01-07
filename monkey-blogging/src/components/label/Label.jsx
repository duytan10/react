import PropTypes from "prop-types";
import styled from "styled-components";

const LabelStyles = styled.label`
    color: ${(props) => props.theme.gray4b};
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
`;
const Label = ({ htmlFor = "", children, ...props }) => {
    return (
        <LabelStyles htmlFor={htmlFor} {...props}>
            {children}
        </LabelStyles>
    );
};

Label.propTypes = {
    htmlFor: PropTypes.string,
    children: PropTypes.any,
};

export default Label;
