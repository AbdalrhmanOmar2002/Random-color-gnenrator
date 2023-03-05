import { useEffect, useState } from "react";
import GenerateColor from "./components/GenerateColor";
import InputColor from "react-input-color";

function App() {
  const [first, setFirst] = useState(null);
  const [inputCo, setInputCo] = useState("#5e72e4");
  const [color, setColor] = useState(null);
  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
        ]
      : null;
  }

  useEffect(() => {
    const rgb = hexToRgb(inputCo);
    setColor(rgb);
  }, [inputCo]);

  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center gap-8 bg-[#e8ecf3] overflow-hidden">
      <h1 className="text-2xl font-medium">Color palette generator</h1>
      <GenerateColor color={color} />
      <p className="mb-8">
        Or just press the{" "}
        <span className="text-lg text-slate-700 font-medium">"Spacebar"</span>{" "}
        to generate new palettes.
      </p>

      <div className="p-3 px-6 rounded-3xl bg-white">
        <p>Click to copy individual color • Press "C" to copy palette</p>
      </div>
      <div className="fixed top-16 left-10 flex items-center justify-center gap-12 p-4 bg-[#7c68cb77] rounded shadow-lg ">
        <input
          type="color"
          value={inputCo}
          className="bg-[#ffffff] p-1 shadow-sm w-16 h-10 rounded-lg text-white"
          onChange={(e) => setInputCo(e.target.value)}
        />

        {inputCo ? (
          <div className="font-medium pr-3">{inputCo}</div>
        ) : (
          <div className="font-medium pr-3">get a color</div>
        )}
      </div>
    </div>
  );
}

export default App;
