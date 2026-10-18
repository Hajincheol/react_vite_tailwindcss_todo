import React from 'react';

const Button = (props) => {

    const { name, onClick, select } = props;

    return (
        <button
            className={`rounded-t-lg p-2 cursor-pointer ${select? 'bg-blue-500 text-white' : 'hover:bg-gray-500'}`}
            onClick={onClick}
        >{name}</button>
    );
};

export default Button;