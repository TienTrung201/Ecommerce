import { Editor } from '@tinymce/tinymce-react';

function TextEditor({ editorState, onChange, height }) {
    // const editorRef = useRef(null);
    // const [content, setContent] = useState('This is the initial content of the editor.');

    // const [text, setText] = useState();
    // const log = () => {
    //   if (editorRef.current) {
    //     console.log(editorRef.current.getContent());
    //   }
    // };
    // const onEditorChange = function (a, editor) {
    //   console.log(a);
    //   setContent(a);
    //   setText(editor.getContent({ format: 'text' }));
    //   //console.log(editor);
    // };

    return (
        <>
            <Editor
                onEditorChange={onChange}
                //initialValue={content}
                //outputFormat="text"

                value={editorState}
                // onInit={(evt, editor) => (editorRef.current = editor)}
                // initialValue="<p>This is the initial content of the editor.</p>"
                init={{
                    height: height || 400,
                    menubar: false,
                    plugins: [
                        'advlist',
                        'autolink',
                        'link',
                        'image',
                        'lists',
                        'charmap',
                        'preview',
                        'anchor',
                        'pagebreak',
                        'searchreplace',
                        'wordcount',
                        'visualblocks',
                        'visualchars',
                        'code',
                        'fullscreen',
                        'insertdatetime',
                        'media',
                        'table',
                        'emoticons',
                        'template',
                        'help',
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic underline | ' +
                        'alignleft aligncenter alignright alignjustify | ' +
                        'styles fontsize | bullist numlist outdent indent | ' +
                        'link image media | ' +
                        'forecolor backcolor emoticons| ' +
                        'print preview | ' +
                        'removeformat fullscreen | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    font_size_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
                }}
            />
        </>
    );
}
export default TextEditor;
