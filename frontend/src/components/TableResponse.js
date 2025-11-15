// frontend/src/components/TableResponse.js
import React from 'react';

const TableResponse = ({ table }) => {
  if (!table || !table.columns || !table.rows) {
    return null;
  }

  return (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            {table.columns.map((column, index) => (
              <th
                key={index}
                className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-200"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              {table.columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300"
                >
                  {row[column] || '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableResponse;

