import React from "react";

type PostPropsType = {
    message: string
    likesCount: number
}

export const Post: React.FC<PostPropsType> = ({message, likesCount}) => {
    return (
        <div>
            <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxukAEfWgGFG2o--9YtkAS_kJjHN5PiIE7pQ&usqp=CAU'} />
            {message}
            <div>
                like: {likesCount}
            </div>
        </div>
    )
}