import React, { FormEvent, useRef } from 'react';
import { useState, ChangeEvent } from 'react';
import { useAppDispatch } from '../../hooks';
import { useParams } from 'react-router-dom';
import { postCommentAction } from '../../services/api-actions';
import { ratingArray } from '../../constants';


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

function isValid({ comment, rating }: FormType) {
  return comment.length >= 50 && comment.length <= 300 && rating !== null;
}

function CommentForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [form, setForm] = useState<FormType>({
    rating: null,
    comment: '',
  });
  const [isDisabled, setIsDisabled] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);

  const isValidState = isValid(form);

  const ratingChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const rating = +e.target.value;

    setForm({
      ...form,
      rating: rating
    });
  };

  const handleCommentChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const value = evt.target.value;

    setForm({
      ...form,
      comment: value
    });

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
      setIsDisabled(true);
      await dispatch(
        postCommentAction({
          id: offerId,
          rating: form.rating!,
          comment: form.comment
        })).unwrap();

      setForm({
        rating: null,
        comment: '',
      });
      formRef.current?.reset();

    } catch {
      setErrorVisible(true);
    } finally {
      setIsDisabled(false);
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
            <React.Fragment key={rating.value}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                defaultValue={rating.value}
                id={`${rating.value}-stars`}
                type="radio"
                disabled={isDisabled}
                onChange={ratingChangeHandler}
              />
              <label
                htmlFor={`${rating.value}-stars`}
                className="reviews__rating-label form__rating-label"
                title={rating.title}
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
        disabled={isDisabled}
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
          disabled={!isValidState || isDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
