import React from 'react';
import { motion } from 'framer-motion';
const FAQ = () => {
  return (
    <section id='faq' className='faq'>
      <motion.div
        className='container'
        initial={{ opacity: 0, translateY: 100 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className='container' data-aos='fade-up'>
          <div className='section-header'>
            <span>Frequently Asked Questions</span>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div
            className='row justify-content-center'
            data-aos='fade-up'
            data-aos-delay='200'
          >
            <div className='col-lg-10'>
              <div className='accordion accordion-flush' id='faqlist'>
                <div className='accordion-item'>
                  <h3 className='accordion-header'>
                    <button
                      className='accordion-button collapsed'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#faq-content-1'
                    >
                      <i className='bi bi-question-circle question-icon'></i>I
                      don't have an account on Rapid Repairs, can I still
                      request a job?
                    </button>
                  </h3>
                  <div
                    id='faq-content-1'
                    className='accordion-collapse collapse'
                    data-bs-parent='#faqlist'
                  >
                    <div className='accordion-body'>
                      NO! You have to register first to request a job.
                    </div>
                  </div>
                </div>

                <div className='accordion-item'>
                  <h3 className='accordion-header'>
                    <button
                      className='accordion-button collapsed'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#faq-content-2'
                    >
                      <i className='bi bi-question-circle question-icon'></i>
                      What types of services do you offer?
                    </button>
                  </h3>
                  <div
                    id='faq-content-2'
                    className='accordion-collapse collapse'
                    data-bs-parent='#faqlist'
                  >
                    <div className='accordion-body'>
                      We provide 6 services such as plumbing, carpentry,
                      cleaning, home painting, electrical works, and roofing
                      repairs.
                    </div>
                  </div>
                </div>

                <div className='accordion-item'>
                  <h3 className='accordion-header'>
                    <button
                      className='accordion-button collapsed'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#faq-content-3'
                    >
                      <i className='bi bi-question-circle question-icon'></i>
                      How do I pay the service provider??
                    </button>
                  </h3>
                  <div
                    id='faq-content-3'
                    className='accordion-collapse collapse'
                    data-bs-parent='#faqlist'
                  >
                    <div className='accordion-body'>
                      The transactions are directly between the customer and
                      service provider.
                    </div>
                  </div>
                </div>

                <div className='accordion-item'>
                  <h3 className='accordion-header'>
                    <button
                      className='accordion-button collapsed'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#faq-content-4'
                    >
                      <i className='bi bi-question-circle question-icon'></i>
                      How do I provide feedback ?
                    </button>
                  </h3>
                  <div
                    id='faq-content-4'
                    className='accordion-collapse collapse'
                    data-bs-parent='#faqlist'
                  >
                    <div className='accordion-body'>
                      <i className='bi bi-question-circle question-icon'></i>
                      To provide feedback, you can use the "Leave Feedback" section in the email you receive after the job is completed.
                    </div>
                  </div>
                </div>

                <div className='accordion-item'>
                  <h3 className='accordion-header'>
                    <button
                      className='accordion-button collapsed'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#faq-content-5'
                    >
                      <i className='bi bi-question-circle question-icon'></i>
                      What’s the time limit for cancellation and rescheduling of
                      service request?
                    </button>
                  </h3>
                  <div
                    id='faq-content-5'
                    className='accordion-collapse collapse'
                    data-bs-parent='#faqlist'
                  >
                    <div className='accordion-body'>
                      You can contact the service provider.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FAQ;
