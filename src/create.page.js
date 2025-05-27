import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "./useFetch";

const CreatePage = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState('');
    const [authorsArr, setAuthorsArr] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    const {data: blogs} = useFetch("http://localhost:8080/blogs");

    useEffect(() => {
        if (blogs) {
            const uniqueAuthors = [...new Set(blogs.map(blog => blog.author))];
            setAuthorsArr(uniqueAuthors);
            setAuthor(uniqueAuthors[0]);
        }
    }, [blogs]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = {title, body, author};
        setIsPending(true);
        setTimeout(() => {
            fetch("http://localhost:8080/blogs", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(blog)//outputs a string representation of the object in JSON format.
            }).then(() => {
                setIsPending(false);
                console.log("new blog added");
                navigate("/");
            })
        }, 2000);
    }

    return ( 
        <div className="content create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog Title:</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}/>
                <label>Blog Content:</label>
                <textarea type="text" required value={body} onChange={(e) => setBody(e.target.value)}/>
                <label>Author:</label>
                <select value={author} onChange={(e) => setAuthor(e.target.value)}>
                {
                    authorsArr && authorsArr.map(author => <option key={author} value={author}>{author}</option>)
                }
                </select>

                { !isPending && <button>Add Blog</button>}
                { isPending && <button disabled className="disable">Adding blog, please wait..</button>}
            </form>
        </div>
    );
}

export default CreatePage;