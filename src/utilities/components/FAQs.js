import React, { useCallback, useEffect, useState } from "react";
import Accordion from "./Accordion";
import { Errors } from "../constants/Errors";
import CustomToast from "./CustomToast";
import HttpClient from "../functions/HttpClient";
import ServerEndPoints from "../constants/ServerEndPoints";
import { EntitiesListResponseModel } from "../models/EntitiesListResponseModel";
import Modal from "./Modal";
import LocalizedModal from "./LocalizedModal";
import { DIGIT_REGEX } from "../constants/Regex";

const getFAQs = async (setFAQsData, params) => {
  await HttpClient.getAxiosClient()
    .get(`${ServerEndPoints.FAQS_ENDPOINT}`, { params })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then((data) => setFAQsData(data))
    .catch((err) => {
      switch (err.response.status) {
        case 503:
          CustomToast(Errors.SERVICE_UNAVALAIBLE_ERROR, "error");
          throw new Error(Errors.SERVICE_UNAVALAIBLE_ERROR);

        case 400:
          CustomToast("Please review your data and try again.", "error");
          break;

        default:
          CustomToast(Errors.API_ERROR, "error");
      }
    });
};

const FAQs = ({ columnLayout }) => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [inputValue, setInputValue] = useState("1");
  const [requestedPage, setRequestedPage] = useState(0);
  const [openAccordion, setOpenAccordion] = useState("");
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [params, setParams] = useState({ pageSize: 5, page: 0 });
  const [faqsData, setFAQsData] = useState(EntitiesListResponseModel);

  const handleInputChange = useCallback(
    (e) => {
      const val = e.target.value;
      if (DIGIT_REGEX.test(val)) {
        const providedPageNum = parseInt(val, 10);
        switch (providedPageNum) {
          case providedPageNum < 1:
            setInputValue("01");
            break;
          case providedPageNum > faqsData.totalPages:
            setInputValue(faqsData.totalPages);
            break;
          default:
            setInputValue(val);
            const newPageNum = val
              ? Math.max(1, Math.min(parseInt(val, 10), faqsData.totalPages)) -
                1
              : 0;
            setRequestedPage(newPageNum);
            break;
        }
      }
    },
    [faqsData.totalPages]
  );

  // Debouncing effect for updating params
  useEffect(() => {
    if (params.page !== requestedPage) {
      if (buttonClicked) {
        setButtonClicked(false);
        setParams({ ...params, page: requestedPage });
      } else {
        const handler = setTimeout(() => {
          setParams({ ...params, page: requestedPage });
        }, 500);

        return () => {
          clearTimeout(handler);
        };
      }
    }
  }, [requestedPage, params, buttonClicked]);

  useEffect(() => {
    getFAQs(setFAQsData, params);
  }, [params]);

  return (
    <div
      className={`grid grid-cols-1 gap-6 items-center px-2 md:px-6 md:gap-0 md:items-start ${
        columnLayout ? "" : "md:grid-cols-2"
      }`}
    >
      {/*FAQs*/}
      <div className="mb-6 mt-10 md:pr-6">
        <h2
          className={`text-4xl text-center mx-auto px-4 md:text-left ${
            columnLayout ? "md:text-4xl md:pl-2" : "md:text-5xl md:pl-16 pt-28"
          }`}
        >
          FREQUENTLY ASKED QUESTIONS
        </h2>
      </div>
      {/*Accordion*/}
      <div
        className={`w-full mx-auto my-4 md:mt-16 md:pl-2 ${
          columnLayout ? "" : "md:border-l-2 md:border-gray-200"
        }`}
      >
        {faqsData.content?.map((faq) => (
          <Accordion
            key={faq.id}
            title={faq.question}
            open={openAccordion}
            setOpen={setOpenAccordion}
          >
            <p className="font-light text-sm pl-1">{faq.answer}</p>
            {faq?.moreDetail && (
              <>
                <button
                  className="bg-blue-500 text-white text-sm text-center mt-4 pb-2 pt-1 w-2/5 md:w-1/5 rounded-full"
                  onClick={() => setShowLearnMore(true)}
                >
                  Learn more
                </button>
                {/*Learn more modal*/}
                <Modal isOpen={showLearnMore} onClose={setShowLearnMore}>
                  <LocalizedModal
                    setOpen={setShowLearnMore}
                    message={faq.moreDetail}
                    cancelText={"Close"}
                  />
                </Modal>
              </>
            )}
          </Accordion>
        ))}
        <div className="flex justify-between items-baseline">
          <button
            className={`bg-blue-500 text-white text-sm text-center mb-8 mt-4 pb-1 pt-1 w-[25%] rounded-full ml-8 mr-4 md:w-1/5 ${
              faqsData.number === 0 ? "opacity-40 cursor-not-allowed" : ""
            }`}
            onClick={() => {
              if (faqsData.number > 0) {
                setRequestedPage(faqsData.number - 1);
                setInputValue(faqsData.number); // Update the displayed page number
                setButtonClicked(true); // Bypass the waiting time
              }
            }}
            disabled={faqsData.number === 0}
          >
            Prev
          </button>

          <div className="flex items-center text-blue-600 text-sm">
            <span className="hidden mx-1 md:block">Page:</span>
            <input
              className="w-8 text-center font-semibold outline-none py-1"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              maxLength="2" // Limit to 2 characters
              pattern="\d*" // Numeric input pattern for mobile devices
              inputMode="numeric" // Numeric input mode for mobile devices
            />
            <span className="mr-1">{`of ${faqsData.totalPages}`}</span>
          </div>

          <button
            className={`bg-blue-500 text-white text-sm text-center mb-8 mt-4 pb-1 pt-1 w-[25%] rounded-full mr-8 ml-4 md:w-1/5 ${
              faqsData.number === faqsData.totalPages - 1
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={() => {
              if (faqsData.number < faqsData.totalPages - 1) {
                setRequestedPage(faqsData.number + 1);
                setInputValue(faqsData.number + 2); // Update the displayed page number
                setButtonClicked(true); // Bypass the waiting time
              }
            }}
            disabled={faqsData.number === faqsData.totalPages - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
