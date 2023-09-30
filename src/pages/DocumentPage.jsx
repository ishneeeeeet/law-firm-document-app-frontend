import { useEffect, useState } from "react";
import axios from "axios";

const DocumentPage = () => {
  const [dealData, setDealData] = useState({});
  const url = "https://api.jsonbin.io/v3/qs/64f7dd8d8d92e126ae67a546";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setDealData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, [url]);

  return (
    <>
      {dealData.record && (
        <div>
          <h1>Property:</h1>
          <p>{dealData.record.property}</p>
        </div>
      )}
    </>
  );
};

export default DocumentPage;
