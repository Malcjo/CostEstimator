import React from "react";
import StandardDropdown from "./StandardDropdown";

export default function EstimatorApp({ config }) {
  const { layout = [], pricing = [], design = [] } = config;

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
              acc[item.label] = item.isRange
                ? { type: "range", lower: item.lower, higher: item.upper }
                : { type: "fixed", value: item.value };
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
                  />
                );
              default:
                return null;
            }
          })}
      </tbody>
    </table>
  );
}
