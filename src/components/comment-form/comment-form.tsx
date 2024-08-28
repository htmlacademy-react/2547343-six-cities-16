import React, { FormEvent, useRef } from 'react';
import { useState, ChangeEvent } from 'react';
import { useAppDispatch } from '../../hooks';
import { useParams } from 'react-router-dom';
import { postCommentAction } from '../../services/api-actions';

interface FormType {
  rating: number | null;
  comment: string;
}

const errorNoteStyle: React.CSSProperties = {
  position: 'absolute',
  left: '2px',
  marginTop: '-20px',
  color: '#b06758',
  fontSize: '12px',
};


const ratingArray = [5, 4, 3, 2, 1];

function CommentForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [form, setForm] = useState<FormType>({
    rating: null,
    comment: '',
  });
  const [submitIsValid, setSubmitValidation] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);

  const checkSubmitValidation = (text: string, rating: number | null) => {
    if (text.length >= 50 && text.length <= 300 && rating !== null) {
      setSubmitValidation(true);
    } else {
      setSubmitValidation(false);
    }
  };

  const ratingChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const rating = +e.target.value;

    setForm({
      ...form,
      rating: rating
    });

    checkSubmitValidation(form.comment, rating);
  };

  const handleCommentChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const value = evt.target.value;

    setForm({
      ...form,
      comment: value
    });

    checkSubmitValidation(value, form.rating);
    if (errorVisible) {
      setErrorVisible(false);
    }
  };

  const params = useParams();
  const offerId = params.id || '';
  const dispatch = useAppDispatch();

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      if (form.rating !== null
        && form.comment !== '') {
        await dispatch(
          postCommentAction({
            id: offerId,
            rating: form.rating,
            comment: form.comment
          })).unwrap();

        setForm({
          rating: null,
          comment: '',
        });
        formRef.current?.reset();
      }
    } catch {
      setErrorVisible(true);
    }
  };

  return (
    <form
      className="reviews__form form"
      action=""
      method="post"
      ref={formRef}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {
          ratingArray.map((rating) => (
            <React.Fragment key={rating}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                defaultValue={rating}
                id={`${rating}-stars`}
                type="radio"
                onChange={ratingChangeHandler}
              />
              <label
                htmlFor={`${rating}-stars`}
                className="reviews__rating-label form__rating-label"
                title="perfect"
              >
                <svg className="form__star-image" width={37} height={33}>
                  <use xlinkHref="#icon-star" />
                </svg>
              </label>
            </React.Fragment>))
        }
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        required
        maxLength={300}
        minLength={50}
        onChange={handleCommentChange}
      />
      {errorVisible && <div style={errorNoteStyle}>There was an error sending your comment</div>}
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!submitIsValid}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
