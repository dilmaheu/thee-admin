import React, { useCallback, useEffect, useState } from "react";
import { flushSync } from "react-dom";

import axios from "axios";
import randomAlphaNumeric from "../utils/randomAlphaNumeric";

import Layout from "../components/Layout";
import SearchTable from "../components/SearchTable";
import ShortUrlTable from "../components/ShortUrlTable";
import TableRow from "../components/TableRow";
import Pagination from "../components/Pagination";
import EntriesDisplay from "../components/EntriesDisplay";
import ModalWidget from "../components/ModalWidget";
import AddButton from "../components/AddButton";

const Home = () => {
  const [fetchedUrls, setFetchedUrls] = useState([]);
  const [urls, setUrls] = useState([]);
  const [isSearchDisabled, setIsSearchDisabled] = useState(true);
  const [paginationNo, setPaginationNo] = useState(1);
  const [urlsDisplay, setUrlsDisplay] = useState(5);
  const [show, setShow] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const selectEntriesDisplay = (entriesNo) => {
    const paginationMaxNo =
      urls.length > entriesNo ? Math.ceil(urls.length / entriesNo) : entriesNo;
    if (paginationNo > paginationMaxNo) {
      setPaginationNo(paginationMaxNo);
    }
    setUrlsDisplay(entriesNo > 4 ? entriesNo : 5);
  };

  const selectUrlsDisplay = (pageNo) => {
    setPaginationNo(pageNo);
  };

  const handleSearch = (search) => {
    if (search) {
      search = search.replace(/\W/gi, (match) => `\\${match}`);
      const parsedUrls = fetchedUrls.filter((val) => {
        const searchRegex = RegExp(`${search}`);
        if (val?.key && val?.value)
          return searchRegex.test(val.key) || searchRegex.test(val.value);
      });
      setUrls(parsedUrls);
    } else {
      setUrls(fetchedUrls);
    }
  };

  const getUrls = useCallback(async () => {
    setIsSearchDisabled(true);
    let fetchedData = [];
    await axios
      .get("https://readshorturl.dilmah.workers.dev/")
      .then((res) => {
        fetchedData = res.data;
      })
      .catch((_) => console.error("Sorry something went wrong"));
    setFetchedUrls(fetchedData);
    setUrls(fetchedData);
    if (fetchedData.length > 0) setIsSearchDisabled(false);
  }, []);
  const currentUrls = () =>
    urls.reduce((acc, item) => {
      if (item?.key) acc.push(item.key);
      return acc;
    }, []);

  useEffect(() => {
    getUrls();
  }, []);

  const handleEdit = (keyValue) => {
    setShow(keyValue);
  };

  const handleAdd = () => {
    setShow(true);
  };

  const handleDelete = (item) => {
    flushSync(() => setIsDelete(item));
    setShow(true);
  };

  const renderUrls = useCallback(() => {
    if (urls.length > 0) {
      const newUrls = urls
        .filter(
          (_, index) =>
            index < paginationNo * urlsDisplay &&
            index >= paginationNo * urlsDisplay - urlsDisplay
        )
        .map((item) =>
          item?.key && item?.value ? (
            <TableRow
              key={randomAlphaNumeric(6)}
              shorturl={item.key}
              website={item.value}
              onEditClick={() => handleEdit(item)}
              onDeleteClick={() => handleDelete(item)}
            />
          ) : null
        );
      return newUrls;
    }
    return (
      <tr>
        <td>Sorry no short urls have been found</td>
      </tr>
    );
  }, [urls, paginationNo]);

  return (
    <Layout>
      <div className="flow-root">
        <SearchTable
          handleChange={handleSearch}
          searchDisabled={isSearchDisabled}
        />
        <AddButton handleClick={handleAdd} />
      </div>
      <ShortUrlTable>{renderUrls()}</ShortUrlTable>
      <EntriesDisplay handleChange={selectEntriesDisplay} />
      <Pagination
        selectNo={paginationNo}
        shortUrlTotal={urls.length}
        entriesToDisplay={urlsDisplay}
        handleClick={selectUrlsDisplay}
      />
      <ModalWidget
        show={show}
        setShow={setShow}
        isDelete={isDelete}
        setIsDelete={setIsDelete}
        refreshUrls={getUrls}
        allUrls={currentUrls}
      />
    </Layout>
  );
};

export default Home;
