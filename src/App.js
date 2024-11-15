import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);  // 사용자 정보를 저장할 상태
  const [loading, setLoading] = useState(true);  // 로딩 상태 관리

  useEffect(() => {
    // Spring Boot API에서 사용자 목록을 가져옵니다.
    fetch('http://localhost:8080/api/users')  // 수정된 API URL
      .then((response) => response.json())  // JSON 응답을 파싱
      .then((data) => {
        setUsers(data);  // 데이터 상태 업데이트
        setLoading(false);  // 로딩 완료
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>User List</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Created At: {new Date(user.createAt).toLocaleString()}</p> {/* Date 객체로 변환하여 표시 */}
                <hr />
              </li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
}

export default App;