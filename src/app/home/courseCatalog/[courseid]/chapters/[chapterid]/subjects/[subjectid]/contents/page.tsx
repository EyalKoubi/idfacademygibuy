// // import React from 'react';
// // import VideoPlayer from './_components/VideoPlayer';
// // import ImageGallery from './_components/gallery';

// // const videos = [
// //   {
// //     url: 'https://www.example.com/video1.mp4',
// //   },
// //   // Add more video objects as needed
// // ];

// // const images = [
// //   {
// //     original: 'https://www.example.com/image1.jpg',
// //     thumbnail: 'https://www.example.com/thumb1.jpg',
// //   },
// //   // Add more image objects as needed
// // ];

// // const HomePage: React.FC = () => {
// //   return (
// //     <div>
// //       <h1>Video Player</h1>
// //       <VideoPlayer videoUrl={videos[0].url} />
      
// //       <h1>Image Gallery</h1>
// //       <ImageGallery images={images} />
// //     </div>
// //   );
// // };

// // export default HomePage;
// import Nav from './Nav.js'
// import NavItem from './NavItem.js'
// import List from './List.js'
// import ListItem from './ListItem.js'

// export default function Movies({ movies }) {
//   return (
//     <div className="divide-y divide-slate-100">
//       <Nav>
//         <NavItem href="/new" isActive>New Releases</NavItem>
//         <NavItem href="/top">Top Rated</NavItem>
//         <NavItem href="/picks">Vincent’s Picks</NavItem>
//       </Nav>
//       <List>
//         {movies.map((movie) => (
//           <ListItem key={movie.id} movie={movie} />
//         ))}
//       </List>
//     </div>
//   )
// }