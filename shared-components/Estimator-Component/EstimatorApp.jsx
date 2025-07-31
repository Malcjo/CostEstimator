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

  const { total, totalLower, totalUpper, hasRange } = React.useMemo(() => {
    let total = 0;
    let totalLower = 0;
    let totalUpper = 0;
    let hasRange = false;

    Object.values(results).forEach((entry) => {
      if (!entry) return;

      if (entry.price && typeof entry.price === "object") {
        // Price is a range { lower, upper }
        hasRange = true;
        totalLower += parseFloat(entry.price.lower || 0);
        totalUpper += parseFloat(entry.price.upper || 0);
      } else if (entry.price) {
        // Price is fixed (number or string)
        total += parseFloat(entry.price || 0);
        totalLower += parseFloat(entry.price || 0); // just in case all fixed
        totalUpper += parseFloat(entry.price || 0);
      }
    });

    return { total, totalLower, totalUpper, hasRange };
  }, [results]);

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
            //console.log(pricingMap);
            const pricingGroup = Object.values(pricingMap).find(
              (group) => group.groupName === row.pricingSet
            ) || {};
            //console.log(pricingGroup);
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
            //console.log(options);
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
        <tr>
          <td colSpan="3">
            <label>Total Amount</label>
            <h3>{
              hasRange
                ? `$${totalLower} - $${totalUpper}`
                : `$${total}`
            }
            </h3>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
