// import { GeneralTexts, editTexts } from "@/HebrewStrings/Texts";
// import { ContentData, SubjectData } from "@/app/types/types";
// import { useState, FormEvent, Dispatch, SetStateAction } from "react";
// import { ChapterData } from "../../courseCreation/types";
// import { usePathname } from "next/navigation";
// import axios from "axios";

// interface NewContentProps {
//   courseName: string;
//   chapterData: ChapterData;
//   subjectData: SubjectData;
//   subjectName: string;
//   setSubjectData: Dispatch<SetStateAction<SubjectData>>;
//   setContentAdding: Dispatch<SetStateAction<boolean>>;
// }

// const NewContent = ({
//   chapterData,
//   courseName,
//   subjectData,
//   subjectName,
//   setSubjectData,
//   setContentAdding,
// }: NewContentProps) => {
//   const courseId =
//     usePathname().split("/")[usePathname().split("/").length - 1];
//   const [contentData, setContentData] = useState<ContentData>({
//     id: "",
//     file_name: "",
//     comments: "",
//   });
//   const [file, setFile] = useState<any | null>(null);
//   const submitFile = async (event: FormEvent) => {
//     event?.preventDefault();
//     if (!file) return;
//     const formData: any = new FormData();
//     formData.append("file", file, file.name);
//     formData.append("bucket", courseId);
//     formData.append("comments", contentData.comments);
//     console.log(formData);

//     try {
//       console.log(file);
//       const response = await axios.post("/api/addContent", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       const newCont = response.data;
//       console.log(
//         "🚀 ~ file: NewContent.tsx:48 ~ submitFile ~ newCont:",
//         newCont
//       );
//       let newContents = subjectData.contents;
//       newContents.push({
//         id: newCont.id,
//         name: contentData.name,
//         file_name: newCont.file_name,
//         comments: newCont.comments,
//       });

//       setSubjectData({
//         id: "",
//         name: subjectName,
//         contents: newContents,
//       });
//       setContentAdding(false);
//     } catch (error) {
//       console.log("🚀 ~ file: Subject.tsx:38 ~ submitFile ~ error:", error);
//     }
//   };
//   return (
//     <div className="bg-gray-50 p-6 rounded-xl shadow-lg max-w-lg mx-auto mt-10">
//       <h2 className="text-2xl text-gray-800 mb-4">
//         {editTexts.courseName} :{" "}
//         <span className="font-semibold">{courseName}</span>
//       </h2>
//       <h2 className="text-2xl text-gray-800 mb-4">
//         {editTexts.chapterName} :{" "}
//         <span className="font-semibold">{chapterData.name}</span>
//       </h2>
//       <h2 className="text-2xl text-gray-800 mb-4">
//         {editTexts.subjectName} :{" "}
//         <span className="font-semibold">{subjectName}</span>
//       </h2>
//       <input
//         type="text"
//         placeholder={editTexts.comments}
//         value={contentData.comments}
//         onChange={(e) =>
//           setContentData({ ...contentData, comments: e.target.value })
//         }
//         className="p-2 w-full border rounded-md shadow-sm mb-4"
//       />
//       <form onSubmit={submitFile} className="flex flex-col space-y-4">
//         <input
//           type="file"
//           name="file"
//           onChange={(e) => {
//             if (e.target.files && e.target.files.length > 0)
//               setFile(e.target.files[0]);
//           }}
//           className="p-2 border rounded-md shadow-sm"
//         />
//         <button
//           type="submit"
//           className="p-2 bg-green-600 text-white rounded-md hover:bg-green-800 shadow-sm"
//         >
//           {GeneralTexts.submit}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default NewContent;
