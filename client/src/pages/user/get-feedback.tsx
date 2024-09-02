import { useParams } from "react-router-dom";
import { postFeedback } from "../../api/customer";
import { useGenericMutation } from "../../hooks/useMutation";
import "./get-feedback.css";
import React, { useState } from "react";
import { showToast } from "../../component/ui/toast";

const GetFeedBackPage = () => {
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const { serviceProviderId, token, jobId } = useParams();
  const [finished, setFinished] = useState(false);

  const { mutate } = useGenericMutation(postFeedback, {
    onSuccess: () => {
      showToast({
        variant: "success",
        message: "Feedback submitted successfully",
      });
      setFinished(true);
    },
    onError: () => {
      showToast({
        variant: "error",
        message: "Error submitting feedback",
      });
    },
  });

  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  const onSubmit = (rating: number, feedback: string) => {
    mutate({
      feedback,
      star_rating: rating,
      service_provider_id: serviceProviderId || "0",
      job_id: jobId || "0",
      token: token || "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(rating, feedback);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
      }}
      className="flex justify-center items-center"
    >
      {!finished ? (
        <form className="form-container" onSubmit={handleSubmit}>
          <label className="label">Feedback</label>
          <textarea
            className="textarea"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <div className="star-container">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`star ${index < rating ? "selected" : ""}`}
                onClick={() => handleStarClick(index)}
              >
                ★
              </span>
            ))}
          </div>
          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>
      ) : (
        <h1>Feedback submitted successfully</h1>
      )}
    </div>
  );
};

export default GetFeedBackPage;
