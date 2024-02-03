import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import Comment from './comment';

const Comments = (props) => {
    const {comments} = props;

    return (
        <div>
          {comments.length > 0 && (
            <div className="mt-3 card py-1 px-2" style={{ backgroundColor: "#e6f0ef" }}>
              <p className="fw-bold">Comments:</p>
              {comments.map((comment, index) => (
                <Comment comment={comment}/>
                
              ))}
            </div>
          )}
        </div>
    )
}

export default Comments;