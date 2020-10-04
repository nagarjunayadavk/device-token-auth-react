import React, { Component } from 'react';
// import Post from './Post';
import { connect } from "react-redux";
import { postActions } from '../../actions/postActions';
// import { Link } from 'react-router-dom';

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.fetchAllPosts();
    }
    render() {
        const { posts } = this.props;
        return (
            <div className="posts-list">
                <h2 className="posts-title">
                    <i className="fa fa-thumb-tack post-pin" aria-hidden="true"></i>
                    <span>Posts</span>
                    {/* <Link to='/add-post'><i className="fa fa-plus post-add-icon" aria-hidden="true"></i></Link> */}
                </h2>
                {
                    posts.map((post) =>
                        <div className="card" key={post.id} >
                            <div>{post.title}</div>
                            <div>{post.content}</div>
                        </div>
                    )
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { postStore } = state;
    const { posts } = postStore;
    return { posts };
}
const mapDispatchToProps = {
    fetchAllPosts: () => postActions.fetchPosts(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);