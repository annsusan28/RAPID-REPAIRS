import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay, Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import { getFeedback } from "../../api/service-provider";
import { useQuery } from "react-query";
import { FeedbackWithCustomerDetails } from "../../types/types";

SwiperCore.use([Autoplay, Pagination, Navigation, A11y]);

const FeedbackComp = () => {
  const { data } = useQuery(["getFeedback"], getFeedback);

  const testimonial = data?.data.map((item: FeedbackWithCustomerDetails) => {
    return {
      imgSrc: "https://cdn-icons-png.flaticon.com/512/4715/4715329.png",
      name: item.customer_name,
      role: "Customer",
      stars: item.star_rating,
      quote: item.feedback,
    };
  });

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <Swiper
          spaceBetween={30}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          data-aos="fade-up"
        >
          {testimonial?.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-item">
                <img
                  src={testimonial.imgSrc}
                  className="testimonial-img"
                  alt={testimonial.name}
                />
                <h3>{testimonial.name}</h3>
                <h4>{testimonial.role}</h4>
                <div className="stars">
                  {[...Array(testimonial.stars)].map((star, i) => (
                    <i className="bi bi-star-fill" key={i}></i>
                  ))}
                </div>
                <p>
                  <i className="bi bi-quote quote-icon-left"></i>
                  {testimonial.quote}
                  <i className="bi bi-quote quote-icon-right"></i>
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
export default FeedbackComp;
