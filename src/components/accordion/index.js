import { useState } from "react";
import data from "./data";
import "./styles.css";
// Single Selection
// Multiple Selection
function Accordion() {
  const [selected, setSelected] = useState(null);
  const [enableMultiselection, setEnableMultiselection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  const handleSingleSelection = (id) => {
    setSelected(id);
  };

  const handleMultiSelection = (id) => {
    let copyMultiple = [...multiple];
    const getIndexOfCurrentId = copyMultiple.indexOf(id);
    if (getIndexOfCurrentId === -1) {
      copyMultiple.push(id);
    } else {
      copyMultiple.splice(getIndexOfCurrentId, 1);
    }

    setMultiple(copyMultiple);
  };
  return (
    <div className="wrapper">
      <button onClick={() => setEnableMultiselection(!enableMultiselection)}>
        {enableMultiselection ? "Disable" : "Enable"} Multiselection
      </button>
      <div className="accordion">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item">
              <div
                onClick={
                  enableMultiselection
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {enableMultiselection
                ? multiple.indexOf(dataItem.id) !== -1 && (
                    <div className="content">{dataItem.answer}</div>
                  )
                : selected === dataItem.id && (
                    <div className="content">{dataItem.answer}</div>
                  )}
            </div>
          ))
        ) : (
          <div>No data found</div>
        )}
      </div>
    </div>
  );
}

export default Accordion;
