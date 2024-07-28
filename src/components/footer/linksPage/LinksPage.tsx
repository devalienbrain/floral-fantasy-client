import { Link } from "react-router-dom";
import "./LinksPage.css";

const LinksPage = () => {
  const linksInfo = [
    {
      category: "Services",
      links: [
        {
          name: "Branding",
          description:
            "Our branding services help you create a strong, consistent brand identity that resonates with your audience.",
        },
        {
          name: "Design",
          description:
            "We offer professional design services, including graphic design, web design, and product design, to make your brand stand out.",
        },
        {
          name: "Marketing",
          description:
            "Our marketing services are tailored to help you reach your target audience and achieve your business goals.",
        },
        {
          name: "Advertisement",
          description:
            "We create impactful advertisements that capture attention and drive results for your business.",
        },
      ],
    },
    {
      category: "Company",
      links: [
        {
          name: "About us",
          description:
            "Learn more about Fatiha's Floral Fantasy, our mission, and our commitment to providing the best online nursery services.",
        },
        {
          name: "Contact",
          description:
            "Get in touch with us at Fatiha's Floral Fantasy. Address: Gulshan-1, Dhaka, Bangladesh. Contact number: +8801893070812.",
        },
        {
          name: "Jobs",
          description:
            "Join our team! Check out our current job openings and career opportunities at Fatiha's Floral Fantasy.",
        },
        {
          name: "Press kit",
          description:
            "Access our press kit for media resources, including logos, images, and company information.",
        },
      ],
    },
    {
      category: "Legal",
      links: [
        {
          name: "Terms of use",
          description:
            "Read our terms of use to understand the rules and guidelines for using our website and services.",
        },
        {
          name: "Privacy policy",
          description:
            "Our privacy policy outlines how we handle your personal information and protect your privacy.",
        },
        {
          name: "Cookie policy",
          description:
            "Learn about our cookie policy and how we use cookies to enhance your browsing experience.",
        },
      ],
    },
  ];

  return (
    <>
      <Link to="/">
        <div className="py-10 text-sm text-center underline text-red-600 hover:text-lime-600 font-semibold">
          Go <span className="font-bold">Homepage</span>
        </div>
      </Link>
      <div className="links-page">
        <h1>Fatiha's Floral Fantasy</h1>
        <h2>Owner: Dr. Fatiha Sultana</h2>
        <p>Address: Gulshan-1, Dhaka, Bangladesh</p>
        <p>Contact number: +8801893070812</p>
        <p>
          Github:{" "}
          <a href="https://github.com/devalienbrain">
            https://github.com/devalienbrain
          </a>
        </p>
        <p>
          Personal website:{" "}
          <a href="https://sabbir-hassan.netlify.app/">
            https://sabbir-hassan.netlify.app/
          </a>
        </p>
        <p>
          Email:{" "}
          <a href="mailto:hassansabbir0321@gmail.com">
            hassansabbir0321@gmail.com
          </a>
        </p>

        {linksInfo.map((category, index) => (
          <div key={index} className="category-section">
            <h3>{category.category}</h3>
            {category.links.map((link, index) => (
              <div key={index} className="link-box">
                <h4>{link.name}</h4>
                <p>{link.description}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default LinksPage;
