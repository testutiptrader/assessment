import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default () => {
    const [data, setData] = useState([]);

    async function myAsyncEffect() {
        const result = await axios(
            'http://gitlab.utip.org/api/v4/projects?private_token=m-EL3tbszLk4khxEGmeS',
        );
        setData(result.data);

    }

    useEffect(() => {
        myAsyncEffect();
    }, []);

    if(data.length !== 0) {
        return(
            <>
                {
                    data.map(item => (
                        <span key={item.id}>
                            <p>ID: {item.id}
                            <br />URL: {item.http_url_to_repo}
                            <br />Name: {item.name}</p>
                        </span>
                    ))
                }
            </>
        );
    } else {
        return null;
    }
}
