// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import React, { useState, useEffect } from 'react';
// import { Input, List } from '@mantine/core';


// export default function UserTopResults() {

//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [type, setType] = useState('tracks');
//   const [range, setRange] = useState('short_term');
//   const { token } = useSelector((state) => state.login);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`http://localhost:3001/top`, {
//         params: {
//           token: token.accessToken,
//           type,
//           range,
//         }
//       });
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   };


//   useEffect(() => {
//     setLoading(true);

//     (async () => {
//       try {
//         const result = await fetchData();
//         setData(result);
//         setLoading(false);
//       } catch (error) {
//         setError(error);
//         setLoading(false);
//       }
//     })();
//   }, [type, range]);

//   console.log(data);

//   return (
//     <>
//       <div>UserTopResults</div>
//       <List type="ordered" withPadding>
//         {
//           data?.items.map(item => (
//             item.album ?
//               <List.Item key={item.id}>
//                 {item.name} - {item.album.artists[0].name}
//               </List.Item>
//               :
//               <List.Item key={item.id}>
//                 {item.name}
//               </List.Item>
//           ))}
//       </List>
//       <Input                     radius="xl" component="select" onChange={(event) => setType(event.target.value)}>
//         <option value="tracks">Tracks</option>
//         <option value="artists">Artists</option>
//       </Input>
//       <Input                     radius="xl" component="select" onChange={(event) => setRange(event.target.value)}>
//         <option value="short_term">Past Month</option>
//         <option value="medium_term">Past 6 Months</option>
//         <option value="long_term">All Time</option>
//       </Input>
//     </>
//   );
// };
