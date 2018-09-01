import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getPostsQuery } from "../queries/queries";

// components
import PostDetails from "./PostDetails";

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }
  displayPosts() {
    var data = this.props.data;
    if (data.loading) {
      return <div>Loading Posts...</div>;
    } else {
      return data.posts.map(post => {
        return (
          <li key={post.id} onClick={e => this.setState({ selected: post.id })}>
            {post.title}
          </li>
        );
      });
    }
  }
  render() {
    return (
      <div>
        <ul id="post-list">{this.displayPosts()}</ul>
        <PostDetails postId={this.state.selected} />
      </div>
    );
  }
}

export default graphql(getPostsQuery)(PostList);
