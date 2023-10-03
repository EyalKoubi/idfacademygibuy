import { GeneralTexts, editTexts } from "@/HebrewStrings/Texts";
import { ChapterData, SubjectData } from "../../courseCreation/types";
import { useState } from "react";
import axios from "axios";

interface ChapterProps {
  chapter: ChapterData;
}

const Chapter = ({ chapter }: ChapterProps) => {
  const [isUpdateChapter, setIsUpdateChapter] = useState(false);
  const [chapterName, setChapterName] = useState(chapter.name);
  const [chapterBrief, setChapterBrief] = useState(chapter.brief);
  const [selectedChapter, setSelectedChapter] = useState<ChapterData | null>(
    null
  );
  const [selectedSubject, setSelectedSubject] = useState<SubjectData | null>(
    null
  );

  const handleUpdateChapter = async () => {
    const formData = new FormData();
    // formData.append(
    //   "updateChapter",
    //   JSON.stringify({ id: course.id, name: courseName })
    // );
    await axios.post("/api/updateChapter", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setIsUpdateChapter(false);
  };

  return (
    <div>
      <span>{chapter.name}</span>
      {isUpdateChapter ? (
        <>
          <input
            type="text"
            placeholder={editTexts.chapterName}
            value={chapterName}
            onChange={(e) => {
              setChapterName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder={editTexts.chapterBrief}
            value={chapterBrief}
            onChange={(e) => {
              setChapterBrief(e.target.value);
            }}
          />
          <button onClick={handleUpdateChapter}>{GeneralTexts.submit}</button>
        </>
      ) : (
        <button
          onClick={() => {
            setIsUpdateChapter(true);
          }}
        >
          {editTexts.updateChapter}
        </button>
      )}
      <button onClick={() => setSelectedChapter(chapter)}>
        {editTexts.showSubjects}
      </button>

      {selectedChapter === chapter && (
        <div>
          <h3>{editTexts.subjects}</h3>
          {chapter.subjects &&
            chapter.subjects?.map((subject) => (
              <div key={subject.name}>
                <span>{subject.name}</span>
                <button onClick={() => setSelectedSubject(subject)}>
                  {editTexts.contents}
                </button>

                {selectedSubject === subject && (
                  <div>
                    <h4>{editTexts.contents}</h4>
                    {subject.contents.map((content) => (
                      <div key={content.name}>
                        <span>{content.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Chapter;
