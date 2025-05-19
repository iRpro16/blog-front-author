import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const Content = ({ formData, setFormData }) => {
    const editorRef = useRef(null);
    
    const handleChange = (content, editor) => {
        setFormData({ ...formData, 'content' : content });
    }
    return (
        <>
            <Editor
                apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
                onInit={(evt, editor) => editorRef.current = editor}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                value={formData.content}
                onEditorChange={handleChange}
            />
        </>
    )
}

export default Content;