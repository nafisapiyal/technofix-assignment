import { useMemo, useRef, useState } from "react";

import { ROWS, COLUMNS } from "./data/dummy-data";
import "./App.css";

function App() {
  const [rows, setRows] = useState(ROWS);
  const [columns, setColumns] = useState(COLUMNS);
  const dialogRef = useRef();
  const numberOfActiveColumns = useMemo(() => {
    return columns.filter((column) => column.active === true).length;
  }, [columns]);

  const onSettingsTableColumn = (event) => {
    const name = event.target.name;
    const value = event.target.checked;
    const selectedColumnIndex = columns.findIndex(
      (column) => column.identifier === name
    );
    const updatedColumns = [...columns];
    updatedColumns[selectedColumnIndex] = {
      ...updatedColumns[selectedColumnIndex],
      active: value,
    };
    setColumns([...updatedColumns]);
  };

  return (
    <div className="table">
      {/* -------- Table top section -------- */}
      <div className="table-top-section">
        <h3>Table Title</h3>
        <div
          className="settings-button"
          onClick={() => {
            dialogRef.current?.showModal();
          }}
        >
          Columns
        </div>

        {/* -------- Add or Remove Columns dialog (modal) -------- */}
        <dialog ref={dialogRef} className="dialog">
          <div className="column-setting-wrapper">
            <div className="dialog-header">
              <h4>Add or Remove Columns</h4>
              <button
                onClick={() => {
                  dialogRef.current?.close();
                }}
              >
                X
              </button>
            </div>
            {columns.map((column) => {
              return (
                <label key={column.identifier}>
                  <input
                    name={column.identifier}
                    type="checkbox"
                    checked={column.active}
                    onChange={onSettingsTableColumn}
                  />
                  {column.name}
                </label>
              );
            })}
          </div>
        </dialog>
      </div>

      {/* -------- Main table section -------- */}
      <div
        className="row"
        style={{ gridTemplateColumns: `repeat(${numberOfActiveColumns}, 1fr)` }}
      >
        {/* Table Header */}
        {columns.map((column) => {
          return <Header key={column.identifier} column={column} />;
        })}

        {/* Table Body */}
        {rows.map((row) => {
          return <Body key={row.id} row={row} columns={columns} />;
        })}
      </div>
    </div>
  );
}

function Cell({ children, show }) {
  return <div className={show ? "show-cell" : "hide-cell"}>{children}</div>;
}

function Header({ column }) {
  return (
    <Cell show={column.active}>
      <div className="title">{column.name}</div>
    </Cell>
  );
}

function Body({ row, columns }) {
  return (
    <>
      {columns.map((column) => {
        return (
          <Cell key={column.identifier} show={column.active}>
            <div key={row.id + column.identifier}>{row[column.identifier]}</div>
          </Cell>
        );
      })}
    </>
  );
}

export default App;
