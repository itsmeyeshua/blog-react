import { useNavigate, useParams } from 'react-router-dom';
import useFetch from './useFetch';
import Loading from './Loading.component';

function BlogDetail() {
    const { id } = useParams();
    const { data: blog, isPending, error} = useFetch(`http://localhost:8080/blogs/${id}`);
    const navigate = useNavigate();

    const handleDelete = () => {
        fetch(`http://localhost:8080/blogs/${id}`, {
            method: "DELETE"
        }).then(() => {
            console.log(`blog id: ${id} deleted`);
            navigate("/");
        })
    }

    return (
        <div className={`blog-details ${blog ? "content" : ''}`}>
			{ isPending && <Loading isPending={isPending} message={error} />}
            {error && <div>{error}</div>}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by {blog.author}</p>
                    <div>{blog.body}</div>
                    <button onClick={handleDelete}>Delete</button>
                </article>
            )}
        </div>
    );
}

export default BlogDetail;