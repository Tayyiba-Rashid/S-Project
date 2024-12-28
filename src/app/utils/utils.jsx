// utils/parseCSV.js
import Papa from 'papaparse';

export const parseCSV = async () => {
  const response = await fetch('/events.csv');
  const csvText = await response.text();

  const { data } = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  return data;
};
