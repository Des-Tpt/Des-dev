"use client";
import React, { useState, useEffect } from 'react';
import Audio from '../../QuestionType/AudioType/Audio';
import MultipleChoice from '../../QuestionType/SelectType/MultipleQuestion';
import Image from '../../QuestionType/ImageType/Image';
import styles from '@/components/Exams/ContainerSkill/Listening/styles.module.css';

const ContainerListen = ({ questions = [], handleAnswerChange, skill, part }) => {
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [answers, setAnswers] = useState({});
  const [answeredQuestionsCount, setAnsweredQuestionsCount] = useState(0);

  useEffect(() => {
    const savedAnswers = localStorage.getItem(`answered-${skill}-${part}`);
    if (savedAnswers) {
      try {
        const parsedAnswers = JSON.parse(savedAnswers);
        if (parsedAnswers) {
          setAnswers(parsedAnswers);
        }
      } catch (error) {
        console.error("Lỗi trong lúc parse file json:", error);
      }
    }
  }, [skill, part]);

  useEffect(() => {
    // Cập nhật số câu hỏi đã chọn khi answers thay đổi
    setAnsweredQuestionsCount(Object.keys(answers).length);
  }, [answers]);

  useEffect(() => {
    // Reset số câu hỏi trắc nghiệm khi `part` thay đổi
    setAnsweredQuestionsCount(0); // Reset câu đã chọn khi part thay đổi
  }, [part]);

  const handleAudioEnd = () => {
    setAudioPlayed(true);
  };

  const totalQuestionsCount = questions.length; // Tổng số câu hỏi từ dữ liệu

  return (
    <div className={styles["container-listen-wrapper"]}>
      <div className={styles["container-listen"]}>
        {/* Phần hiển thị số câu hỏi đã chọn */}
        <div className={styles["question-summary"]}>
          <p>Đã chọn: {answeredQuestionsCount} / {totalQuestionsCount} câu</p>
        </div>
        {questions.map((question, index) => {
          if (question.questionType === 'image') {
            return (
              <Image 
                key={question.questionId}
                question={question}
              />
            );
          }

          if (question.questionType === 'audio' && !audioPlayed) {
            return (
              <Audio
                key={question.questionId}
                question={question}
                onEnd={handleAudioEnd}
                saveAnswer={(answer) => handleAnswerChange(question.questionId, answer)}
              />
            );
          }

          if (question.questionType === 'select') {
            return (
              <MultipleChoice
                key={question.questionId}
                question={question}
                selectedAnswer={answers[question.questionId]} 
                saveAnswer={(answer) => {
                  handleAnswerChange(question.questionId, answer);
                  setAnswers(prevAnswers => ({ ...prevAnswers, [question.questionId]: answer }));
                }}
                questionNumber={index + 1} // Cập nhật số câu hỏi trắc nghiệm
              />
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

export default ContainerListen;
