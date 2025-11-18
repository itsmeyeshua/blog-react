import React from 'react';

const Loading = ({ isPending, message }) => {
    return (
        <>
            {isPending && message === '' ? (
                <div className="loading-container">
                    <div className="loading"></div>
                </div>
            ) : (
                <div className="loading-container">{message}</div>
            )}
        </>
    );
};

export default Loading;