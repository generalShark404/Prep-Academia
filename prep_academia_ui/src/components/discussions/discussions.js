import './discussions.css'

function Discussions(){
  <div className="mt-50" style={{marginTop:'600px', marginBottom:'600px'}}>
        <div className="container mt-150">
    <div className="mt-150">
        <div className="discussion-section">
            <h3 className="section-title">Discussion Forum</h3>

            <div className="discussion-card p-3 mb-4">
                <div className="d-flex align-items-center mb-2">
                    <img src="user1.jpg" alt="User" className="user-img mr-3" />
                    <div>
                        <h5 className="username">John Doe</h5>
                        <small className="text-muted">Posted on Oct 21, 2024</small>
                    </div>
                </div>
                <p className="comment-text">This is an example of a user comment. You can reply to this comment by tagging other users. Let's keep the conversation going!</p>

                <div className="d-flex justify-content-end">
                    <button className="btn btn-outline-primary btn-sm reply-btn">Reply</button>
                </div>

                <div className="replies mt-4">
                    <div className="reply-card p-2">
                        <div className="d-flex align-items-center mb-2">
                            <img src="user2.jpg" alt="User" className="user-img-reply mr-2" />
                            <div>
                                <h6 className="reply-username">Jane Smith</h6>
                                <small className="text-muted">Replied on Oct 21, 2024</small>
                            </div>
                        </div>
                        <p className="reply-text">@JohnDoe Thanks for the insights! I completely agree with your point.</p>
                    </div>
                </div>
                
            </div>
        </div>

        <div className="comment-form mt-4">
            <h5 className="mb-3">Leave a Comment</h5>
            <form>
                <div className="form-group">
                    <textarea className="form-control" rows="3" placeholder="Write your comment here..."></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Post Comment</button>
            </form>
        </div>
        </div>
    </div>
  </div>
};

export default Discussions;