import React from "react";

interface AddCommentProps {
  comment: string;
  setComment: (value: string) => void;
  commentRef?: React.RefObject<HTMLTextAreaElement>;
}

const AddComment: React.FC<AddCommentProps> = ({
  comment,
  setComment,
  commentRef,
}) => {
  return (
    <>
      <div className="row">
        <div className="col-md-12 col-lg-12 col-sm-12">
          <div className="mb-6">
            <label className="form-label" htmlFor="Commnet">
              Commnet: <span className="validate"> * </span>
            </label>
            <textarea
              id="Class"
              className="form-control"
              placeholder="Add Comment..."
              ref={commentRef}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            />
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default AddComment;
