import React, { FormEvent } from "react";
import { GeneralTexts, editTexts } from "@/HebrewStrings/Texts";
import { ContentData } from "@/app/types";

interface AddContentFormProps {
  contentData: ContentData;
  setContentData: (data: ContentData) => void;
  submitFile: (event: FormEvent) => void;
  loading: boolean;
  setFile: (file: File | null) => void;
  addContentError: string | null;
}

const AddContentForm: React.FC<AddContentFormProps> = ({
  contentData,
  setContentData,
  submitFile,
  loading,
  setFile,
  addContentError,
}) => {
  return (
    <div>
      <input
        type="text"
        placeholder={editTexts.comments}
        value={contentData.comments}
        onChange={(e) =>
          setContentData({ ...contentData, comments: e.target.value })
        }
        className="p-2 w-full border rounded-md shadow-sm mb-4"
      />

      <form onSubmit={submitFile} className="flex flex-col space-y-4">
        <input
          type="file"
          name="file"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setFile(e.target.files[0]);
            }
          }}
          className="p-2 border rounded-md shadow-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className={`p-2 ${loading ? 'bg-gray-600' : 'bg-green-600'} text-white rounded-md hover:bg-green-800 shadow-sm`}
        >
          {loading ? 'Loading...' : GeneralTexts.submit}
        </button>
      </form>
      {addContentError && <div className="text-red-500">{addContentError}</div>}
    </div>
  );
};

export default AddContentForm;
