import React from "react";
import "./styles.css";

const barWeight = 45;
const weights = [
  { lbs: 45, qty: 2 },
  { lbs: 34, qty: 2 },
  { lbs: 25, qty: 2 },
  { lbs: 10, qty: 2 },
  { lbs: 5, qty: 3 },
  { lbs: 2.5, qty: 2 }
];
const warmupMultipliers = [0, 0.4, 0.6, 0.8, 1];

const calculatePlateWeight = (weight) => (weight - barWeight) / 2;

const calculateWeight = (weight, multiplier) => {
  const roundedWeight = Math.floor((weight * multiplier) / 5) * 5;

  return roundedWeight > 45 ? roundedWeight : 45;
};

const calculatePlates = (plateWeight, maxPlateWeight) => {};

export default function App() {
  const [workWeight, setWorkWeight] = React.useState(255);

  const workPlateWeight = calculatePlateWeight(workWeight);

  const handleWorkWeight = ({ target: { value } }) => {
    const calculatedValue = (function () {
      if (value <= barWeight) return barWeight;

      return Math.floor(value / 5) * 5;
    })();
    setWorkWeight(calculatedValue);
  };

  return (
    <div className="App">
      <input
        type="number"
        step="5"
        value={workWeight}
        onChange={handleWorkWeight}
      />
      <table style={{ padding: 10 }}>
        <thead>
          <th>Set</th>
          <th>Weight</th>
          <th>Weight per side</th>
          <th>Plates</th>
        </thead>
        {warmupMultipliers.map((multiplier, i) => {
          const weight = calculateWeight(workWeight, multiplier);
          const plateWeight = calculatePlateWeight(weight);

          return (
            <tr>
              <td>{i + 1}</td>
              <td>
                {weight} <span>lbs.</span>
              </td>
              <td>
                {plateWeight} <span>lbs.</span>
              </td>
              <td>{calculatePlateWeight(plateWeight, workPlateWeight)}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
