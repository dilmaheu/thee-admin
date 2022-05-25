import React, { useState, useCallback } from "react";
import axios from "axios";

import FailureDialogue from "./FailureDialogue";
import SuccessDialogue from "./SuccessDialogue";
import randomAlphaNumeric from "../utils/randomAlphaNumeric";

const AddEditShortUrl = ({ show, setShow, refreshUrls, allUrls }) => {
  const [state, setState] = useState({
    shorturl: show?.key || "",
    website: show?.value || "",
  });
  const [showDialogue, setShowDialogue] = useState("");
  const [failMsg, setFailMsg] = useState("");

  const handleChange = (change) => {
    setState(change);
  };

  const handleCancel = useCallback(() => {
    setShow(false);
  }, []);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    let autoShortUrl;
    let nameExists;
    const shortUrls = allUrls();
    if (!state?.shorturl && shortUrls.length > 0) {
      let uniqueKeyCheck = shortUrls.filter(
        (item) => item?.key == autoShortUrl
      );
      autoShortUrl = randomAlphaNumeric(3);
      while (uniqueKeyCheck.length > 0) {
        autoShortUrl = randomAlphaNumeric(3);
        uniqueKeyCheck = shortUrls.filter((item) => item?.key == autoShortUrl);
      }
      setState({ ...state, shorturl: autoShortUrl });
    } else if (!state?.shorturl) {
      autoShortUrl = randomAlphaNumeric(3);
    }

    nameExists = shortUrls.filter((val) => val == state.shorturl);
    if (nameExists.length > 0) {
      setShowDialogue("fail");
      setFailMsg("Sorry Short URL Name Already Exists");
      setTimeout(() => {
        setShowDialogue("");
        setFailMsg("");
      }, 5000);
    } else {
      await axios
        .post(
          "https://createshorturl.dilmah.workers.dev/",
          {
            uniqueKey: autoShortUrl || state.shorturl,
            website: state.website,
          },
          {
            headers: { "Access-Control-Allow-Origin": "*" },
          }
        )
        .then((_) => {
          setShowDialogue("success");
          setTimeout(() => {
            setShow(false);
            setShowDialogue("");
            refreshUrls();
          }, 5000);
        })
        .catch((_) => {
          setShowDialogue("fail");
          setTimeout(() => setShowDialogue(""), 5000);
        });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(`https://updateshorturl.dilmah.workers.dev/${show.key}`, {
        uniqueKey: state.shorturl,
        website: state.website,
      })
      .then((_) => {
        setShowDialogue("success");
        setTimeout(() => {
          setShow(false);
          setShowDialogue("");
          refreshUrls();
        }, 5000);
      })
      .catch((_) => {
        setShowDialogue("fail");
        setTimeout(() => setShowDialogue(""), 5000);
      });
  };

  const renderDialogue = useCallback(() => {
    if (showDialogue == "success") return <SuccessDialogue />;
    if (showDialogue == "fail") return <FailureDialogue failMsg={failMsg} />;
    return null;
  }, [showDialogue]);

  return (
    <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
      <div className="dialogue-wrapper bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="w-full">
            <div className="mt-3 text-center sm:mt-0 sm:mx-4 sm:text-left">
              <h3
                className="text-lg leading-6 font-medium text-gray-900 mb-3"
                id="modal-title"
              >
                {`${show?.key ? "EDIT" : "ADD"} Short URL`}
              </h3>
              <form
                onSubmit={
                  show?.key
                    ? (e) => handleEditSubmit(e)
                    : (e) => handleCreateSubmit(e)
                }
              >
                <div className="mb-6">
                  <label
                    htmlFor="destinationurl"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Destination URL
                  </label>
                  <input
                    type="text"
                    id="destinationurl"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="https://example.tld/path"
                    required
                    onChange={(e) =>
                      handleChange({ ...state, website: e.target.value })
                    }
                    value={state.website}
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="shorturl"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Short URL - Leave empty for an auto generated one
                  </label>
                  <input
                    type="text"
                    id="shorturl"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="helloworld"
                    pattern="\w+|-"
                    onChange={(e) =>
                      handleChange({ ...state, shorturl: e.target.value })
                    }
                    value={state.shorturl}
                  />
                </div>
                <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {renderDialogue()}
    </div>
  );
};

export default AddEditShortUrl;
