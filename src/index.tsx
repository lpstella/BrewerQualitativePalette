import React from "react";
import ReactDOM from "react-dom";
import tinycolor from "tinycolor2";
import "./styles.css";

function QualitativePaletteAlgorithm(
  seedColor: any,
  sampleSize: number,
  type = "set"
) {
  const palette = [];
  if (type === "paired") {
    for (let i = 0; i < sampleSize / 2; i++) {
      var color = tinycolor(seedColor).spin(
        (360 / sampleSize) * i + (i % 2 === 0 ? 0 : 180)
      );
      palette.push(color.lighten(70 - color.toHsl().l * 100).toRgbString());
      palette.push(
        color
          .darken(color.toHsl().l * 100 - 40)
          .saturate(100)
          .toRgbString()
      );
    }
  } else if (type === "set") {
    for (let i = 0; i < sampleSize; i++) {
      var color = tinycolor(seedColor).spin(
        (360 / sampleSize) * i + (i % 2 === 0 ? 0 : 720 / sampleSize)
      );

      palette.push(
        color
          .lighten(50 - (color.toHsl().l * 100 + color.toHsl().s * 80) / 2)
          .toRgbString()
      );
    }
  }
  return palette;
}

const ColorToDivArray = props => {
  const [color, setColor] = React.useState("");
  const [numSamples, setNumSamples] = React.useState();
  const [type, setType] = React.useState("set");

  let colorPalette = QualitativePaletteAlgorithm(
    props.seedColor === undefined ? color : props.seedColor,
    props.sampleSize === undefined
      ? numSamples === undefined
        ? 6
        : numSamples
      : props.sampleSize,
    props.type === undefined ? type : props.type
  );
  var colorArray = colorPalette.map(thisColor => {
    return (
      <div
        style={{
          backgroundColor: thisColor,
          width: "40px",
          height: "40px"
        }}
      />
    );
  });
  const getWidth = () => {
    var width = 0;
    if (props.seedColor === undefined) width += 140;
    if (props.sampleSize === undefined) width += 140;
    if (props.type === undefined) width += 140;
    return width;
  };
  return (
    <div>
      {(props.sampleSize === undefined ||
        props.seedColor === undefined ||
        props.type === undefined) && (
        <div
          style={{
            width: getWidth(),
            display: "flex",
            backgroundColor: "#addeff",
            borderRadius: "5px 5px 0px 0px",
            minHeight: "50px"
          }}
        >
          {props.sampleSize === undefined && (
            <div style={{ width: "8.5em" }}>
              <input
                style={{
                  marginTop: "10px",
                  marginLeft: "10px",
                  width: "8em",
                  border: "solid silver 2px"
                }}
                onInput={e =>
                  setNumSamples((e.target as HTMLInputElement).value)
                }
                value={numSamples}
                type="text"
                name="name"
              />
              <label
                style={{
                  marginLeft: "30px",
                  width: "100%",
                  fontWeight: "bold"
                }}
              >
                Samples
              </label>
            </div>
          )}
          {props.seedColor === undefined && (
            <div style={{ width: "8.5em" }}>
              <input
                style={{
                  marginTop: "10px",
                  marginLeft: "10px",
                  width: "8em",
                  border: "solid silver 2px"
                }}
                onInput={e => setColor((e.target as HTMLInputElement).value)}
                value={color}
                type="text"
                name="name"
              />
              <label
                style={{
                  marginLeft: "40px",
                  width: "100%",
                  fontWeight: "bold"
                }}
              >
                Color
              </label>
            </div>
          )}

          {props.type === undefined && (
            <div style={{ width: "8.5em" }}>
              <select
                style={{
                  marginTop: "10px",
                  marginLeft: "10px",
                  width: "8em",
                  border: "solid silver 2px"
                }}
                name="type"
                onChange={e => {
                  setType(e.target.value);
                }}
              >
                <option value="set">Set</option>
                <option value="paired">Paired</option>
              </select>
              <label
                style={{
                  marginLeft: "40px",
                  width: "100%",
                  fontWeight: "bold",
                  marginTop: "5px"
                }}
              >
                Type
              </label>
            </div>
          )}
        </div>
      )}
      <div style={{ marginBottom: "25px", display: "flex", flexWrap: "wrap" }}>
        {colorArray}
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <div style={{ margin: "25px" }}>
        {/* <ColorAlgorithm /> */}
        <h3>Color Sets</h3>
        <ColorToDivArray seedColor="#66c2a5" sampleSize="8" type="set" />
        <ColorToDivArray seedColor="#66a61e" sampleSize="8" />
        <ColorToDivArray />
        <h3>Pastels</h3>
        <ColorToDivArray seedColor="#fed9a6" sampleSize="8" />
        <ColorToDivArray seedColor="#80b1d3" sampleSize="8" />
        <h3>Paired</h3>
        <ColorToDivArray type="paired" seedColor="#f5a742" sampleSize="8" />
        <ColorToDivArray type="paired" seedColor="#80b1d3" sampleSize="8" />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
