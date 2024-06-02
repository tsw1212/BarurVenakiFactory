import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import React, { useRef } from 'react';
// import 'primereact/resources/themes/lara-light-indigo/theme.css'; // תוכל לשנות את הנושא לפי הצורך
// import 'primereact/resources/primereact.min.css';
import '../../css/ImgChoose.css';

export default function ImgChoose({ handleFileChange }) {
    const toast = useRef(null);

    const onUpload = async (e) => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
        await handleFileChange(e); // שיניתי כאן ל-e.files[0]
    };

    const customUpload = ({ files }) => {
        onUpload({ files }); // שיניתי כאן ל-onUpload במקום onUpload(files)
    };

    return (
        <div className="card flex justify-content-center">
            <Toast ref={toast}></Toast>
            <FileUpload 
                mode="basic" 
                name="demo[]" 
                accept="image/*" 
                maxFileSize={1000000} 
                customUpload
                uploadHandler={customUpload} // שיניתי כאן ל-uploadHandler במקום onUpload
                chooseLabel="בחר תמונה"
                className="custom-file-upload" // הוספתי כאן className
            />
        </div>
    );
}
