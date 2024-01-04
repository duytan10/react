import { addDoc, collection, onSnapshot, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebase-config";

const FirebaseApp = () => {
    const colRef = collection(db, "posts");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        // getDocs(colRef)
        //     .then((snapshot) => {
        //         let posts = [];
        //         snapshot.docs.forEach((doc) => {
        //             posts.push({
        //                 id: doc.id,
        //                 ...doc.data(),
        //             });
        //         });
        //         setPosts(posts);
        //     })
        //     .catch((err) => console.log(err));
        onSnapshot(colRef, (snapshot) => {
            let posts = [];
            snapshot.docs.forEach((doc) => {
                posts.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setPosts(posts);
        });
    }, []);
    const handleAddPost = (e) => {
        e.preventDefault();
        addDoc(colRef, { title, author, createdAt: serverTimestamp() })
            .then(() => {
                console.log("success");
            })
            .catch((err) => console.log(err));
    };
    return (
        <div className="p-10">
            <div className="w-full max-w-[500px] mx-auto bg-white shadow-lg p-5">
                <form onSubmit={handleAddPost}>
                    <input
                        type="text"
                        className="p-3 rounded border border-t-gray-200 w-full mb-5 outline-none focus:border-blue-500"
                        placeholder="Enter your title"
                        name="title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        className="p-3 rounded border border-t-gray-200 w-full mb-5 outline-none focus:border-blue-500"
                        placeholder="Enter your author"
                        name="author"
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                    <button type="submit" className="p-3 bg-blue-500 text-white text-sm font-semibold w-full rounded-lg">
                        Add post
                    </button>
                </form>
            </div>
            <div className="w-full max-w-[500px] mx-auto bg-white shadow-lg p-5">
                {posts.length > 0 && posts.map((post) => <div key={post.title}>{`${post.title} - ${post.author}`}</div>)}
            </div>
        </div>
    );
};

export default FirebaseApp;
