import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserTable({ userId }) {
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTableData = async () => {
            if (!userId) {
                setError('User ID is not provided');
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get(`http://localhost:3001/api/users/${userId}/table`);

                setTableData(response.data);
            } catch (error) {
                setError('Error fetching table data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchTableData();
    }, [userId]);

    if (loading) {
        return <div role="alert" aria-busy="true">Loading...</div>;
    }

    if (error) {
        return <div role="alert">Error: {error}</div>;
    }

    return (
        <div>
            <h2>User Table for User ID: {userId}</h2>
            <table aria-labelledby="tableCaption">
                <caption id="tableCaption" style={{ display: 'none' }}>Table displaying subjects, grades, attendance, and comments for user {userId}</caption>
                <thead>
                    <tr>
                        <th scope="col">Subject</th>
                        <th scope="col">Grade</th>
                        <th scope="col">Attendance</th>
                        <th scope="col">Comments</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, index) => (
                        <tr key={index}>
                            <td>{row.subject}</td>
                            <td>{row.grade}</td>
                            <td>{row.attendance}</td>
                            <td>{row.comments}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserTable;