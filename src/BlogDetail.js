import { useNavigate, useParams } from 'react-router-dom';
import useFetch from './useFetch';
import Loading from './Loading.component';
import { useEffect, useState } from 'react';
import BlogList from './blogList';

function BlogDetail() {
    const { id } = useParams();
    const { data: blog, isPending, error} = useFetch(`http://localhost:8080/blogs/${id}`);
    const { data: blogs } = useFetch(`http://localhost:8080/blogs`);
    const [ likedBlogs, setLikedBlogs ] = useState([]);
    const [ authorBlogs, setAuthorBlogs ] = useState([]);
    const navigate = useNavigate();

    const handleDelete = () => {
        fetch(`http://localhost:8080/blogs/${id}`, {
            method: "DELETE"
        }).then(() => {
            console.log(`blog id: ${id} deleted`);
            navigate("/");
        })
    }

    useEffect(() => {
        if (blogs) {
            const cat = blog;
            setLikedBlogs(blogs.filter(blog => {
                if (blog.category === cat.category && blog.id != cat.id)
                    return blog;
            }));
            console.log(likedBlogs);
            setAuthorBlogs(blogs.filter(blog => {
                if (blog.author === cat.author && blog.id != cat.id)
                    return blog;
            }));
            console.log(likedBlogs);
            console.log("author blogs: ", authorBlogs);
        }
    }, [blogs, blog])

    return (
        <div className={` ${blog ? "content" : ''}`}>
            <div className='blog-details'>
                { isPending && <Loading isPending={isPending} message={error} />}
                { error && <div>{error}</div>}
                { blog && (
                    <article>
                        <h2>{blog.title}</h2>
                        <p>Written by {blog.author}</p>
                        <div>{blog.body}</div>
                        <button onClick={handleDelete}>Delete</button>
                    </article>
                )}
                <div>
                    { likedBlogs.length > 0 && 
                        <BlogList blogs={likedBlogs} title={"Might also like"} />
                    }
                </div>
            </div>
            <div>
                { authorBlogs.length > 0 && 
                    <BlogList blogs={authorBlogs} title={"More from the Author"} flex="flex-column"/>
                }
            </div>
        </div>
    );
}

export default BlogDetail;