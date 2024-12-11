import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import './DataDisplay.css';
import { Link } from 'react-router-dom';
import { FaBackward } from "react-icons/fa";

const DataDisplay = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true); // New state for loading

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "cardmoney"), orderBy("Date", 'desc'));
        const snapshot = await getDocs(q);
        const data = [];
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setTableData(data);
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchData();
  }, []);

  return (
    <div className="data-display-container">
      <h1 className="table-title">CARD MONEY DECEMBER 2024</h1>
      <div className="linktodata1">
        <Link to="/" className="linktodata">
          <FaBackward /> Back
        </Link>
      </div>
      {loading ? ( // Show loading spinner if data is still being fetched
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading data, please wait...</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                <th rowSpan="2">Date</th>
                <th colSpan="4" className="kashar-header">KASHAR</th>
                <th colSpan="9" className="karago-header">KARAGO</th>
              </tr>
              <tr>
                <th>KUBIRI</th>
                <th>KIRA ROAD</th>
                <th>STRETCHER</th>
                <th>TOTAL</th>
                <th className='sepalat'></th>
                <th>SONDE</th>
                <th>NANGABO</th>
                <th>KYENGERA</th>
                <th>MUNYONYO</th>
                <th>BWEYOGERE</th>
                <th>KYANJA</th>
                <th>TULA</th>
                <th>TOTAL2</th>
                <th>COMMENT</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                  <td>{row.Date?.toDate().toLocaleDateString() || '-'}</td>
                  <td>{row.shellKubili?.toLocaleString() || '-'}</td>
                  <td>{row.shellKiraRoad?.toLocaleString() || '-'}</td>
                  <td>{row.shellStretcher?.toLocaleString() || '-'}</td>
                  <td className='tdstrong'>{row.kasharSum?.toLocaleString() || '-'}</td>
                  <td className='sepalat'></td>
                  <td>{row.shellSonde?.toLocaleString() || '-'}</td>
                  <td>{row.shellNangabo?.toLocaleString() || '-'}</td>
                  <td>{row.shellKyengera?.toLocaleString() || '-'}</td>
                  <td>{row.shellMunyonyo?.toLocaleString() || '-'}</td>
                  <td>{row.shellBweyogerere?.toLocaleString() || '-'}</td>
                  <td>{row.shellKyanja?.toLocaleString() || '-'}</td>
                  <td>{row.shellTula?.toLocaleString() || '-'}</td>
                  <td className='tdstrong'>{row.karagoSum?.toLocaleString() || '-'}</td>
                  <td>{row.comment?.toLocaleString() || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DataDisplay;
