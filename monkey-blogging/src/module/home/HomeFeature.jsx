import styled from "styled-components";
import PostFeatureItem from "../post/PostFeatureItem";
import Heading from "../../components/layout/Heading";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { useEffect, useState } from "react";

const HomeFeatureStyles = styled.div``;
const HomeFeature = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        async function fetchPosts() {
            const q = query(collection(db, "posts"), where("status", "==", 1), where("hot", "!=", true), limit(3));
            const querySnapshot = await getDocs(q);
            const results = [];
            querySnapshot.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() });
            });
            setPosts(results);
        }
        fetchPosts();
    }, []);
    if (posts.length <= 0) return;
    return (
        <HomeFeatureStyles className="home-block">
            <div className="container">
                <Heading>Featured posts</Heading>
                <div className="grid-layout">
                    {posts.map((post) => (
                        <PostFeatureItem key={post.id} data={post}></PostFeatureItem>
                    ))}
                </div>
            </div>
        </HomeFeatureStyles>
    );
};

export default HomeFeature;
