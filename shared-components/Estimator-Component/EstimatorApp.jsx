import React from "react";
import StandardDropdown from "./StandardDropdown";
import { useState, useEffect } from "react";

export default function EstimatorApp({ config }) {
  const { layout = [], pricing = [], design = [] } = config;
  const [results, setResults] = useState({});

  const pricingMap = React.useMemo(() => {
    return pricing.reduce((acc, item) => {
      acc[item.id] = item; // store unqiue pricing Items
      return acc;
    }, {});
  }, [pricing]);

  const designMap = React.useMemo(() => {
    return design.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {});
  }, [design]);


  useEffect(() => {
    const initialResults = layout.reduce((acc, row) => {
      acc[row.label] = {
              option: "",
      price: "",
      taskCount: 0
      };
      return acc;
    }, {});
    setResults(initialResults);
  }, [layout]);
  return (
    <table>
      <tbody>
        {
          layout.map((row) => {
            console.log(pricingMap);
            const pricingGroup = Object.values(pricingMap).find(
              (group) => group.groupName === row.pricingSet
            ) || {};
            console.log(pricingGroup);
            //const designGroup = designMap[row.designSet] || {};
            const options = (pricingGroup.items || []).reduce((acc, item) => {
              acc[item.label] = {
                label: item.label,
                value: item.value,
                isRange: item.isRange,
                lower: item.lower,
                upper: item.upper,
                taskCount: item.taskCount ?? 1, // include taskCount with a fallback
              };
              return acc;
            }, {});
            console.log(options);
            switch (row.type) {
              case "Standard":
                return (
                  <StandardDropdown
                    id={row.id}
                    label={row.label}
                    options={options}
                    onSelect={(selectedOption) => {
                      setResults((prev) => ({
                        ...prev,
                        [row.label]: selectedOption ?
                        {
                          option: selectedOption.label,
                          price: selectedOption.isRange
                            ? { lower: selectedOption.lower, upper: selectedOption.upper }
                            : selectedOption.value,
                          taskCount: selectedOption.taskCount ?? 1
                        }
                        : {
                            option: "",      // blank if not selected
                            price: "",       // blank price
                            taskCount: ""     // count as 0
                          }
                      }));
                    }}
                  />
                );
              default:
                return null;
            }
          })}
        <div>
          <label>Total Amount</label>
          <h3>{JSON.stringify(results, null, 2)}</h3>
        </div>
      </tbody>
    </table>
  );
}
