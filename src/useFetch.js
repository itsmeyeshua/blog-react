import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState();
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {

			fetch(url)
			.then(res => res.json())
			.then(json => {
				setData(json)
				setIsPending(false);
			})
			.catch((err) => {
				console.log(err.message);
				setError(err.message);
			});
	}, [url])

    return ({data, isPending, error});
}

export default useFetch;