// function Home() {
//   const [users, setUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [usersPerPage] = useState(7);

//   useEffect(() => {
//     loadUsers();
//   }, []);

//   const loadUsers = async () => {
//     try {
//       const response = await axios.get('https://dummyjson.com/users');
//       const userData = response.data.users; // Assuming the users are stored under 'users' key
//       setUsers(Object.values(userData)); 
//     //   setUsers(response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   // Pagination
//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

//   const paginate = pageNumber => setCurrentPage(pageNumber);

//   return (
//     <div className="container mt-4">
//       <h2>User Data</h2>
//       <input
//         type="text"
//         placeholder="Search by name..."
//         value={searchTerm}
//         onChange={e => setSearchTerm(e.target.value)}
//         className="form-control mb-4"
//       />
//       <div className="table-container">
//       <table className="table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>firstName</th>
//             <th>Username</th>
//             <th>Email</th>
//             <th>Height</th>
//             <th>Image</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentUsers.filter(user => user.firstName.toLowerCase().includes(searchTerm.toLowerCase())).map(user => (
//             <tr key={user.id}>
//               <td>{user.id}</td>
//               <td>{user.firstName}</td>
//               <td>{user.username}</td>
//               <td>{user.email}</td>
//               <td>{user.height}</td>
//               <td>
//                   {user.image && <img src={user.image} alt="User" style={{ width: '50px', height: '50px' }} />}
//                 </td>
//               {/* <td>{user.address.street}</td> */}
//             </tr>
//           ))}
//         </tbody> 
//       </table>
//       </div>
//       <nav>
//         <ul className="pagination">
//           {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => (
//             <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
//               <button onClick={() => paginate(i + 1)} className="page-link">{i + 1}</button>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </div>
//   );
// }

// export default Home;




// function Home() {
//   const [wardData, setWardData] = useState([]);
//   const [formData, setFormData] = useState({ patientId: '', action: 'A' });
//   const nurseId = "nur1"; 

//   const fetchEmptyWards = async () => {
//     try {
//       const response = await axios.get(`https://summary-gnu-equally.ngrok-free.app/his/nurse/getWard?id=${nurseId}`,{
//         headers : {
//             'ngrok-skip-browser-warning':'true'
//         }
//     }); 
//       const responseData = response.data.response;
//       console.log('Response data:', responseData);
//       setWardData(Object.values(responseData));
//     } catch (error) {
//       console.error('Error fetching empty wards:', error);
//     }
//   };
  

//   const handleButtonClick = () => {
//     fetchEmptyWards();
//   };


//   const handleFormSubmit = (wardNo) => {
//     const { patientId, action } = formData;
//     const requestBody = {
//       id: patientId,
//       wardNo,
//       action
//     };
//     console.log('Form data submitted:', requestBody);
//     // Call API to update ward
//     axios.post('http://localhost:8090/nurse/updateWard/nur1', requestBody)
//       .then(response => {
//         console.log('Ward updated successfully:', response.data);
//         // You can handle success actions here, such as resetting the form or updating the UI
//       })
//       .catch(error => {
//         console.error('Error updating ward:', error);
//         // You can handle error actions here, such as displaying an error message to the user
//       });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Available Wards</h2>
//       <button onClick={handleButtonClick} className="btn btn-primary mb-3">Fetch Empty Wards</button>
//       {wardData.length > 0 ? (
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Ward Number</th>
//               <th>Ward Type</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {wardData.map(ward => (
//               <tr key={ward.wardNo}>
//                 <td>{ward.wardNo}</td>
//                 <td>{ward.type}</td>
//                 <td><button className="btn btn-success">Update</button></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No empty wards available</p>
//       )}
//     </div>
//   );
// }

// export default Home;
