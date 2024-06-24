import Layout from "../layouts/Layout";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import OfferCard from "../components/OfferCard";
import Paginate from "../components/Paginate";
import { Spinner } from "@nextui-org/react";

function Offers() {
  const [loading, setLoading] = useState(true);
  const [jobOffers, setJobOffers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 12;

  const params = useMemo(() => {
    return {
      where: "Bordeaux",
      page: page,
      limit: limit,
    };
  }, [page]);

  const updateResults = useCallback(() => {
    axios
      .get("/ads/search", { params })
      .then((response) => {
        const result = response.data.data.ads ?? [];
        const total = response.data.data.total ?? 0;

        setJobOffers(result);
        setTotal(total);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params]);

  useEffect(() => {
    updateResults();
  }, [page]);

  const updatePage = (page) => {
    setPage(page);
  };

  return (
    <Layout>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex flex-wrap justify-center">
            {jobOffers.map((jobOffer, index) => (
              <OfferCard key={index} offer={jobOffer}></OfferCard>
            ))}
          </div>

          <div className="my-3 flex justify-center">
            <Paginate
              total={total}
              initialPage={1}
              perPage={limit}
              updatePage={updatePage}
            />
          </div>
        </>
      )}
    </Layout>
  );
}

export default Offers;
