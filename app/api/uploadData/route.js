// // import {Web3Storage, getFilesFromPath } from 'web3.storage';
// // const {ethers} = require('ethers');
// // import formidable from 'formidable';
// // import path from 'path';


// // export const config = {
// //     api: {
// //         bodyParser: false    // disable built-in body parser
// //     }
// // }


// // function moveFiletoServer(req) {
// //     return new Promise((resolve, reject) => {
// //         const options = {};
// //         options.uploadDir = path.join(process.cwd(), "/app/uploads");
// //         options.filename = (name, ext, path, form) => {
// //             return path.originalFilename;
// //         }
// //         const form = formidable(options);

// //         form.parse(req, (err, fields, files) => {
// //             if (err) {
// //                 console.error(err);
// //                 reject("Something went wrong");
// //                 return;
// //             }
// //             const uniqueFileName = fields.filename;
// //             const actualFileName = files.file.originalFilename;

// //             resolve({uniqueFileName, actualFileName});
// //         })
// //     })
// // }



// // async function handler (req,res) {
// //     try{
// //         const {uniqueFileName,actualFileName} = await moveFiletoServer(req)
// //         console.log('Files are stored in local server');
// //     }catch(err){
// //         console.log(err)
// //     }
// // }

// // export default handler ; 



// import { Web3Storage, getFilesFromPath } from 'web3.storage';
// import { ethers } from 'ethers';
// import formidable from 'formidable';
// import path from 'path';
// import fs from 'fs';

// export const config = {
//     api: {
//         bodyParser: false // disable built-in body parser
//     }
// };

// function moveFiletoServer(req) {
//     return new Promise((resolve, reject) => {
//         const uploadDir = path.join(process.cwd(), "/app/uploads");

//         // Ensure the upload directory exists
//         if (!fs.existsSync(uploadDir)){
//             fs.mkdirSync(uploadDir, { recursive: true });
//         }

//         const form = formidable({
//             uploadDir: uploadDir,
//             keepExtensions: true,
//             filename: (name, ext, part) => {
//                 return part.originalFilename || part.newFilename;
//             }
//         });

//         form.parse(req, (err, fields, files) => {
//             if (err) {
//                 console.error(err);
//                 reject("Something went wrong");
//                 return;
//             }

//             const uniqueFileName = fields.filename || files.file.newFilename;
//             const actualFileName = files.file.originalFilename;

//             resolve({ uniqueFileName, actualFileName });
//         });
//     });
// }

// async function handler(req, res) {
//     try {
//         const { uniqueFileName, actualFileName } = await moveFiletoServer(req);
//         console.log('Files are stored in local server');
//         res.status(200).json({ message: 'File uploaded successfully', uniqueFileName, actualFileName });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Something went wrong', error: err });
//     }
// }

// export default handler;





