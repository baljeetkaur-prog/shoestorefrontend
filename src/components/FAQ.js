import { useState } from "react"
import { Link } from "react-router-dom";

function FAQ() {
    const faqsdata = [{
        que: "How do I track my order?",
        ans: "Once logged in, go to 'Track Your Order' or 'Order History' in your account dashboard to see current status.",
    },
    {
        que: "What is your return policy?",
        ans: "We offer a 7-day return policy on unworn shoes with original packaging.",
    },
    {
        que: "Can I exchange my shoes for a different size?",
        ans: "Yes, you can request an exchange within 7 days of receiving your order.",
    },
    {
        que: "Do you ship internationally?",
        ans: "Currently, we only ship within India. International shipping will be available soon.",
    },
    {
        que: "How can I contact customer support?",
        ans: "You can contact us via the 'Contact Us' form or email us at support@freestyleshoes.in",
    }]
    const [activeindex, setactiveindex] = useState(null);
    const togglefaqs = (i) => {
        setactiveindex(i === activeindex ? null : i);
    }
    return (
        <>
        <div className="breadcrumbs">
        <div className="container">
          <div className="breadcrumbs-main">
            <ol className="breadcrumb">
              <li>
                <Link to="/homepage">Home</Link>
              </li>
              <li className="active">FAQs</li>
            </ol>
          </div>
        </div>
      </div>
      <div className="ckeckout">
                <div className="container">
        <div className="faqcontainer">
            <h2 className="faqhead">Frequently Asked Questions</h2>
            <div className="faqlist">
                {faqsdata.map((faq, i) => (
                    <div key={i} className="faqitem">
                        <div className="faqques" onClick={() => togglefaqs(i)}>
                            <h4>{faq.que}</h4>
                            <span>{activeindex === i ? '-' : '+'}</span>
                        </div>
                        <div className={`faqanswrapper ${activeindex === i ? "open" : ""}`}>
                            <div className="faqans">
                                <p>{faq.ans}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
        </div>
        </>
    )
}
export default FAQ