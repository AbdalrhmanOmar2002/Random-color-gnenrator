const handleB = async (setLoading, color) => {
  setLoading(true);
  const response = await fetch("http://colormind.io/api/", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(
      //   {
      //   model: "default",
      //   input: [[232, 236, 243], [126, 108, 202], "N", "N", "N"],
      // }
      color
        ? {
            model: "default",
            input: [color, "N", "N", "N", "N"],
          }
        : { model: "default" },
    ),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    })
    .finally(() => setLoading(false));

  const rgbToHex = (r, g, b) => {
    let red = r.toString(16);
    let green = g.toString(16);
    let blue = b.toString(16);

    if (red.length === 1) red = "0" + red;

    if (green.length === 1) green = "0" + green;

    if (blue.length === 1) blue = "0" + blue;

    return "#" + red + green + blue;
  };
  const codes = [];
  response?.result?.forEach((color) => {
    codes.push(rgbToHex(...color));
  });

  return codes;
};
export { handleB };
