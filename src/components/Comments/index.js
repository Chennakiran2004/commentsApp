import {Component} from 'react'
import {v4} from 'uuid'

import './index.css'

import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// // Write your code here

class Comments extends Component {
  state = {nameInput: '', commentInput: '', commentsList: []}

  renderCommentsList = () => {
    const {commentsList} = this.state

    return commentsList.map(eachItem => (
      <CommentItem
        key={eachItem.id}
        commentDetails={eachItem}
        onClickDeleteComment={this.onClickDeleteComment}
        onClickToggleLiked={this.onClickToggleLiked}
      />
    ))
  }

  onClickToggleLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onClickDeleteComment = commentId => {
    const {commentsList} = this.state

    const updatedList = commentsList.filter(
      eachComment => eachComment.id !== commentId,
    )
    this.setState({commentsList: updatedList})
  }

  onChangeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeCommentInput = event => {
    this.setState({commentInput: event.target.value})
  }

  addComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: v4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  render() {
    const {nameInput, commentInput, commentsList} = this.state

    return (
      <div className="app-container">
        <div className="comments-container">
          <h1 className="app-heading">Comments</h1>
          <div className="comment-inputs">
            <form className="form">
              <p className="comment-heading">
                Say something about 4.0 Technologies
              </p>
              <input
                type="text"
                className="username-input"
                placeholder="Your Name"
                value={nameInput}
                onChange={this.onChangeNameInput}
              />
              <textarea
                placeholder="Your Comment"
                className="comment-input"
                rows="8"
                value={commentInput}
                onChange={this.onChangeCommentInput}
              />
              <button
                type="submit"
                className="add-button"
                onClick={this.addComment}
              >
                Add Comment
              </button>
            </form>
            <img
              className="image"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
            />
          </div>
          <hr className="line" />
          <p className="heading">
            <span className="comments-count">{commentsList.length}</span>
            Comments
          </p>
          <ul className="comments-list">{this.renderCommentsList()}</ul>
        </div>
      </div>
    )
  }
}

export default Comments
