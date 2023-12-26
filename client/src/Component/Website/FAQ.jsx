import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const FAQ = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const [questions, setQuestions] = useState([]);


  const toggleAnswer = (faq_id) => {
    setQuestions((prevQuestions) => prevQuestions.map((q) => {
      if (q.faq_id === faq_id) {
        return { ...q, isOpen: !q.isOpen };
      }
      return q;
    }));
  };
  useEffect(() => {
    // Fetch all questions and answers using Axios
    const fetchQAFromDB = async () => {
      try {
        const response = await axios.get('http://localhost:3001/faqHome/'); // Replace 'your_all_qa_api_endpoint' with your actual API endpoint
        const data = response.data;
        console.log(data);

        // Update state with questions and answers
        setQuestions(data.map((item) => ({ ...item, isOpen: false })));
      } catch (error) {
        console.error('Error fetching questions and answers:', error);
      }
    };

    fetchQAFromDB();
  }, []);

  return (
    <section className="py-10 bg-gray-50 sm:py-16 lg:py-24 mb-60">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Explore Common Questions
          </h2>
        </div>
        <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
          {questions.map((q) => (
            <div
              key={q.faq_id}
              className={`transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50 ${q.isOpen ? 'bg-gray-50' : ''}`}
            >
              
              <button
                type="button"
                onClick={() => toggleAnswer(q.faq_id)}
                className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
              >
                <span className="flex text-lg font-semibold text-black">{q.question} </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor "
                  className={`w-6 h-6 text-[#219C90]  ${q.isOpen ? 'transform rotate-180' : 'transform rotate-0'}`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {q.isOpen && (
                <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                  <p>{q.answer}</p>
                </div>
              )}
            </div>
            
          ))}
        </div>
        <p className="text-center text-gray-600 textbase mt-9">
          Still have questions?
         <Link to={'/contact'}> <span className="cursor-pointer font-medium text-tertiary transition-all duration-200 hover:text-tertiary focus:text-tertiary hover-underline">
            Contact our support
          </span></Link>
        </p>
      </div>
    </section>
  );
};

export default FAQ;
