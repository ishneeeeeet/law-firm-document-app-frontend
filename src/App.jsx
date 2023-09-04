import { useState } from "react";
import axios from "axios";
import InputPage from "./pages/InputPage";
import SelectFile from "./pages/SelectFile";

function App() {
    // const [titleText, setTitleText] = useState("");
    // const [taxText, setTaxText] = useState("");
    // const [contractText, setContractText] = useState("");
    // const [mortgageText, setMortgageText] = useState("");

    // const handleFileChange = async (e, setText) => {
    //     const formData = new FormData();
    //     formData.append("pdfFile", e.target.files[0]);

    //     try {
    //         const response = await axios.post("https://law-firm-backend-ju32.onrender.com/extract-text", formData);

    //         if (response.status === 200) {
    //             setText(response.data.text);
    //         } else {
    //             console.error("Failed to extract text from PDF.");
    //         }
    //     } catch (error) {
    //         console.error("An error occurred:", error);
    //     }
    // };

    return (
        <>
            {/* <h1 className="text-red-700">Sale File</h1>
            <form>
                <div>
                    <label>Title Document:</label>
                    <input
                        type="file"
                        className="file-input file-input-bordered w-full max-w-xs"
                        onChange={(e) => handleFileChange(e, setTitleText)}
                    />
                </div>
                <div>
                    <label>Tax Document:</label>
                    <input
                        type="file"
                        className="file-input file-input-bordered w-full max-w-xs"
                        onChange={(e) => handleFileChange(e, setTaxText)}
                    />
                </div>
                <div>
                    <label>Contract Document:</label>
                    <input
                        type="file"
                        className="file-input file-input-bordered w-full max-w-xs"
                        onChange={(e) => handleFileChange(e, setContractText)}
                    />
                </div>
                <div>
                    <label>Mortgage Document:</label>
                    <input
                        type="file"
                        className="file-input file-input-bordered w-full max-w-xs"
                        onChange={(e) => handleFileChange(e, setMortgageText)}
                    />
                </div>
            </form>
            <div>
                <h2>Extracted Text:</h2>
                <div>
                    <h3>Title Document:</h3>
                    <p>{titleText}</p>
                </div>
                <div>
                    <h3>Tax Document:</h3>
                    <p>{taxText}</p>
                </div>
                <div>
                    <h3>Contract Document:</h3>
                    <p>{contractText}</p>
                </div>
                <div>
                    <h3>Mortgage Document:</h3>
                    <p>{mortgageText}</p>
                </div>
            </div> */}
            <SelectFile/>
          
        </>
    );
}

export default App;
