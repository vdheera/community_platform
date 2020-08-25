import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";
import { getPostUser } from "../../actions/post";
import axios from "axios";
import CommentItem from "./CommentItem";

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  getPostUser,
  auth,
  post: { _id, topic, body, user, likes, comments, date },
}) => {
  return (
    <Fragment>
      <div class='card' style={{ width: "20rem" }}>
        {auth.isAuthenticated && !auth.loading && (
          <h4 class='card-header'>{user.name}</h4>
        )}
        <div class='card-body'>
          <Link to={`/posts/${_id}`}>
            <h4 class='card-title' style={{ color: "black" }}>
              {topic}
            </h4>
          </Link>
          <p className='post-date' class='card-subtitle'>
            Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
          </p>
          <p class='card-text'>{body}</p>

          <ul class='list-group list-group-flush'>
            {comments.map((comment) => (
              <li class='list-group-item'>
                <CommentItem key={comment._id} comment={comment} postID={_id} />
              </li>
            ))}
          </ul>
        </div>
        <div class='card-body'>
          <button
            class='card-link'
            onClick={(e) => addLike(_id)}
            type='button'
            className='btn btn-light'
          >
            <i className='fas fa-thumbs-up' />{" "}
            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
          </button>
          <button
            class='card-link'
            onClick={(e) => removeLike(_id)}
            type='button'
            className='btn btn-light'
          >
            <i className='fas fa-thumbs-down' />
          </button>

          {auth.isAuthenticated && !auth.loading && user === auth.user._id && (
            <button
              class='card-link'
              onClick={(e) => deletePost(_id)}
              type='button'
              className='btn btn-danger'
            >
              <i className='fas fa-times' />
            </button>
          )}
        </div>
      </div>
    </Fragment>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  getPostUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  deletePost,
  getPostUser,
})(PostItem);
