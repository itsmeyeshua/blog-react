import BlogList from "./blogList";
import Loading from "./Loading.component";
import useFetch from "./useFetch";

function Home() {

	const { data: blogs, isPending, error} = useFetch("http://localhost:8080/blogs");

	return ( 
		<div className={blogs ? "content" : ''}>
			<div className="home-container">
				{ isPending && <Loading isPending={isPending} message={error} />}
				{blogs && <BlogList blogs={blogs} title="All blogs" />}
				{blogs && <BlogList blogs={blogs.filter((blog) => blog.author ==="Eve")} title={"Blogs by Eve"} />}
			</div>
		</div>
	);
}

export default Home;