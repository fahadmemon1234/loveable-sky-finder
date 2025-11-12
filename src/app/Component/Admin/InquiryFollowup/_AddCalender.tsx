import React from "react";
import CustomTimePicker from "../../utility/CustomTimePicker";

interface FollowUpFormProps {
  followUpDate: string;
  followUpTime: string;
  setFollowUpDate: (value: string) => void;
  setFollowUpTime: (value: string) => void;
  followUpDateRef: React.RefObject<HTMLInputElement>;
  followUpTimeRef: React.RefObject<HTMLInputElement>;
}

const AddCalander: React.FC<FollowUpFormProps> = ({
  followUpDate,
  followUpTime,
  setFollowUpDate,
  setFollowUpTime,
  followUpDateRef,
  followUpTimeRef,
}) => {
  return (
    <>
      <div className="row">
        <div className="col-md-6 col-lg-6 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="followUpDate">
              Follow-up Date: <span className="validate">*</span>
            </label>
            <input
              type="date"
              id="followUpDate"
              className="form-control"
              ref={followUpDateRef}
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-6 col-lg-6 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="followUpTime">
              Follow-up Time: <span className="validate">*</span>
            </label>
            <input
              type="time"
              id="followUpTime"
              ref={followUpTimeRef}
              className="form-control"
              value={followUpTime}
              onChange={(e) => setFollowUpTime(e.target.value)}
            />

            {/* <CustomTimePicker
              value={followUpTime}
              onChange={(e) => setFollowUpTime(e || "")}
              label="Follow-up Time"
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCalander;
