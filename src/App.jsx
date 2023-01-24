import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [preset, setPreset] = useState("london 18th centuary");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    "Search Bears with Paint Brushes the Starry Night, painted by Vincent Van Gogh.."
  );
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(configuration);

  const presetImage = async (presetValue) => {
    setPreset(presetValue);
    // await generateImage();
  }

  const generateImage = async () => {
    setPlaceholder(`Search ${prompt}..`);
    setLoading(true);
    const res = await openai.createImage({
      prompt: prompt + ' ' + preset,
      n: 1,
      size: "512x512",
    });
    setLoading(false);
    setResult(res.data.data[0].url);
  };
  return (
    <div className="app-main">
      {loading ? (
        <>
          <h2>Generating..Please Wait..</h2>
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </>
      ) : (
        <>
          {/* <div>
            <button onClick={() => presetImage('london 18th centuary')}>london 18th centuary</button>
            <button onClick={() => presetImage('london 19th centuary')}>london 19th centuary</button>
            <button onClick={() => presetImage('london 20th centuary')}>london 20th centuary</button>
          </div> */}
          <h2>Generate an Image using Open AI API</h2>

          <textarea
            className="app-input"
            placeholder={placeholder}
            onChange={(e) => setPrompt(e.target.value)}
            rows="10"
            cols="40"
          />
          <select name="size" id="size" defaultValue={'london 18th centuary'} onChange={(e)=>presetImage(e.target.value)}>
            <option value="london 18th centuary">london 18th centuary</option>
            <option value="london 19th centuary">london 19th centuary</option>
            <option value="london 20th centuary">london 20th centuary</option>
          </select>
          <button onClick={generateImage}>Generate an Image</button>
          {result.length > 0 ? (
            <img className="result-image" src={result} alt="result" />
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}

export default App;
