import { Link } from "react-router-dom";

function BlogList({ blogs, title, flex }) {
    return ( 
        <div className={`blog-list`}>
            <h3>{title}</h3>
            <div className={`${flex}`}>
                {blogs.map(blog => (
                    <Link to={`/blog/${blog.id}`} key={blog.id}>
                        <div className="blog-preview">
                            <h3 className="blog-title">{blog.title}</h3>
                            <p className="blog-author">Written by {blog.author}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default BlogList;