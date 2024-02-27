/* eslint-disable react/prop-types */
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";

const PostFeatureItemStyles = styled.div`
    width: 100%;
    border-radius: 16px;
    position: relative;
    height: 169px;
    .post {
        &-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 16px;
        }
        &-overlay {
            position: absolute;
            inset: 0;
            border-radius: 16px;
            background-color: rgba(0, 0, 0, 0.75);
            mix-blend-mode: multiply;
            opacity: 0.6;
        }
        &-content {
            position: absolute;
            inset: 0;
            z-index: 10;
            padding: 20px;
            color: white;
        }
        &-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
        }
    }

    @media screen and (min-width: 1024px) {
        height: 272px;
    }
    @media screen and (max-width: 1023.98px) {
        .post {
            &-content {
                padding: 15px;
            }
        }
    }
`;

const PostFeatureItem = ({ data }) => {
    if (!data || !data.id) return;

    return (
        <PostFeatureItemStyles>
            <PostImage url={data.image} alt="unsplash"></PostImage>
            <div className="post-overlay"></div>
            <div className="post-content">
                <div className="post-top">
                    <PostCategory>Kiến thức</PostCategory>
                    <PostMeta></PostMeta>
                </div>
                <PostTitle size="big">{data.title}</PostTitle>
            </div>
        </PostFeatureItemStyles>
    );
};

export default PostFeatureItem;
